var tagBlacklist = [
    //'atom',
    'css',
    'html',
    //'json',
    //'git',
    //'github',
    //'google_docs',
    //'markdown',
    //'microsoft_word',
    //'notepad++',
    //'paint.net',
    //'visual_studio_code',
    //'yaml',
  ],
  ALPHA = [...'abcdefghijklmnopqrstuvwxyz'],
  SUPERSCRIPT = n =>
    String.fromCodePoint(
      ...[...('' + n)].map(i =>
        i > 0 && i < 4 ? [185, 178, 179][+i - 1] : +i + 8304
      )
    ),
  zeroPad = (num, length) =>
    `${'0'.repeat(Math.max(0, length - `${num}`.length))}${num}`,
  newElement = (tag, contents = '', attributes = {}, children = []) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    children.forEach(child => el.appendChild(child));
    return el;
  },
  render = async (links, container) => {
    var icons = {},
      iconsPath,
      projects,
      projectIconsPath,
      projectsParsed = new Set(),
      lastYear = '',
      lastMonth = '',
      lastDay = '';
    await fetch('/log/icons.json')
      .then(response => response.json())
      .then(json => {
        for (let i in json.icons) icons = { ...icons, ...json.icons[i] };
        iconsPath = json.iconsPath;
        console.log(icons);
      });
    await fetch('/log/projects.json')
      .then(response => response.json())
      .then(json => {
        projects = json;
        projectIconsPath = json.iconsPath;
      });
    var [out, notes] = Object.keys(links)
      .reverse()
      .reduce(
        ([acc, notes], year) => {
          Object.keys(links[year])
            .reverse()
            .forEach((month, i) => {
              let monthPadded = zeroPad(month, 2);
              lastDay = '';
              Object.keys(links[year][month])
                .reverse()
                .forEach((day, j) => {
                  let dayPadded = zeroPad(day, 2),
                    dayEntries = links[year][month][day];
                  Array.isArray(dayEntries) || (dayEntries = [dayEntries]);
                  dayEntries.reverse().forEach((v, k) => {
                    /*--- PROJECTS -------------------------------------------*/
                    if (
                      v.project &&
                      projects[v.project] &&
                      !projectsParsed.has(v.project)
                    ) {
                      let project = projects[v.project],
                        projectDiv = newElement(
                          'tr',
                          '',
                          {
                            class: 'project',
                          },
                          [
                            newElement('td', '', {
                              colspan: 2,
                            }),
                            newElement(
                              'td',
                              '',
                              {
                                class: 'title',
                              },
                              [
                                newElement('img', '', {
                                  class: 'project-icon',
                                  src: projectIconsPath + project.icon,
                                  alt: v.project,
                                  title: v.project,
                                }),
                                newElement(
                                  'div',
                                  '',
                                  {
                                    class: 'project-title',
                                  },
                                  [
                                    newElement('a', project.title, {
                                      href: project.url,
                                      target: '_blank',
                                      class: 'project-link',
                                    }),
                                  ]
                                ),
                                newElement('div', project.blurb, {
                                  class: 'project-blurb',
                                }),
                              ]
                            ),
                            newElement('td'),
                          ]
                        );
                      projectsParsed.add(v.project);
                      acc.appendChild(projectDiv);
                    }
                    let entryDiv = newElement('tr');
                    /*--- DATE -----------------------------------------------*/
                    entryDiv.appendChild(
                      newElement(
                        'td',
                        `${year == lastYear ? '' : year + '.'}${
                          month == lastMonth ? '' : monthPadded + '.'
                        }${day == lastDay ? '..' : dayPadded}: `,
                        { class: 'date' }
                      )
                    );
                    [lastYear, lastMonth, lastDay] = [year, month, day];
                    /*--- TAGS -----------------------------------------------*/
                    let tags = Array.from(v.tags);
                    entryTags = newElement(
                      'td',
                      '',
                      {
                        class: 'tags',
                      },
                      []
                        .concat(tags.shift(), tags.sort())
                        .reduce((acc, tag) => {
                          icons[tag] &&
                            !tagBlacklist.includes(tag) &&
                            acc.push(
                              newElement('img', '', {
                                class: 'tag-icon',
                                src: iconsPath + icons[tag],
                                alt: tag,
                                title: tag.replaceAll('_', ' '),
                              })
                            );
                          return acc;
                        }, [])
                    );
                    entryDiv.appendChild(entryTags);
                    /*--- TITLE ----------------------------------------------*/
                    let entryText = newElement(
                      'td',
                      '',
                      {
                        class: 'title',
                      },
                      [
                        newElement('a', v.title, {
                          href: Array.isArray(v.link)
                            ? v.link[0].url || v.link[0]
                            : v.link.url || v.link,
                          target: '_blank',
                          class: `link-${
                            v.tags && Array.isArray(v.tags) ? v.tags[0] : 'none'
                          }`,
                        }),
                      ]
                    );
                    v.note &&
                      notes.push(v.note) &&
                      (entryText.innerHTML += `<a class="note" href="#${
                        notes.length
                      }" title="${v.note}">${SUPERSCRIPT(notes.length)}</a>`);
                    v.media &&
                      (entryText.innerHTML += `<span class="embed-button"> 
                      [<a href="#${year}.${monthPadded}.${dayPadded}${
                        k == 0 ? '' : ALPHA[k]
                      }" onclick=\'embed(this, ${JSON.stringify(
                        v.media
                      )} )'>embed</a>]</span>`);
                    entryDiv.appendChild(entryText);
                    /*--- LINKS ----------------------------------------------*/
                    let entryLinks = newElement('td', '', {
                      class: 'links',
                    });
                    entryLinks.innerHTML += (
                      Array.isArray(v.link) ? v.link : [v.link]
                    )
                      .map((l, m) =>
                        m > 0 || l.title
                          ? `<a href="${l.title ? l.url : l}" ${
                              l.title && `title="${l.title.replace('_', ' ')}"`
                            } target="_blank" class="tag-link">${
                              l.title && icons[l.title]
                                ? `<img src="${
                                    iconsPath + icons[l.title]
                                  }" alt="${l.title}" class="link-icon" />`
                                : l.title || m + 1
                            }</a>`
                          : ''
                      )
                      .join(' ');
                    entryDiv.appendChild(entryLinks);
                    acc.appendChild(entryDiv);
                  });
                });
            });
          return [acc, notes];
        },
        [container, []]
      );
    let noteBlock = newElement('div', '', { class: 'notes' });
    noteBlock.innerHTML += '<br>notes:<br>';
    for (var i = 0; i < notes.length; )
      noteBlock.innerHTML +=
        '<div id="' +
        ++i +
        '">' +
        SUPERSCRIPT(i) +
        ' ' +
        notes[i - 1] +
        '</div>';
    document.body.appendChild(noteBlock);
  };

/*--- THIS IS STUFF THAT NEEDS TO BE REWRITTEN ---*/
function embed(e, o) {
  e.innerHTML = 'remove';
  e.setAttribute('onclick', 'debed(this,' + JSON.stringify(o) + ')');
  var p = e.parentElement,
    out = '';
  if (o.type == 'youtube')
    out =
      '<iframe class="embedee" src="https://www.youtube.com/embed/' +
      o.src +
      '" frameborder="0" allowfullscreen></iframe>';
  if (o.type == 'bandcamp')
    out = `<iframe class="embedee" style="border:0;width:100%;height:120px;" src="https://bandcamp.com/EmbeddedPlayer/album=${
      o.src
    }/size=large/bgcol=111111/linkcol=a2c9cb/tracklist=false/artwork=small${
      o.track ? '/track=' + o.track : ''
    }/transparent=true/" seamless></iframe>`;
  if (o.type == 'bandcamp-single')
    out = `<iframe class="embedee" style="border:0;width:100%;height:120px;" src="https://bandcamp.com/EmbeddedPlayer/track=${o.src}/size=large/bgcol=111111/linkcol=a2c9cb/tracklist=false/artwork=small/transparent=true/" seamless></iframe>`;
  if (o.type == 'bandcamp-album')
    out = `<iframe class="embedee" style="border:0;width:100%;height:373px;" src="https://bandcamp.com/EmbeddedPlayer/album=${o.src}/size=large/bgcol=111111/linkcol=a2c9cb/artwork=small/transparent=true/" seamless></iframe>`;
  if (o.type == 'podbean')
    out = `<iframe class="embedee" allowtransparency="true" style="border:0;height:150px;min-width:430px;width:100%;" scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?from=embed&i=${o.src}-pb&share=1&download=1&fonts=Arial&skin=1&font-color=&rtl=0&logo_link=&btn-skin=7&size=150"></iframe>`;
  if (o.type == 'anchor')
    out = `<iframe class="embedee" style="border:0;height:98px;max-width:700px;width:100%;" src="https://anchor.fm/-/embed/episodes/${o.src}" frameborder="0" scrolling="no"></iframe>`;
  if (o.type == 'soundcloud')
    out = `<iframe class="embedee" style="height:166px;" scrolling="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${o.src}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`;
  p.insertAdjacentHTML('beforeend', out);
}
function debed(e, o) {
  e.innerHTML = 'embed';
  e.setAttribute('onclick', 'embed(this,' + JSON.stringify(o) + ')');
  var p = e.parentElement;
  p.removeChild(p.getElementsByClassName('embedee')[0]);
}
