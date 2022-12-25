const dummy = 0,
  ALPHA = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
  SUPERSCRIPT = n =>
    String.fromCodePoint(
      ...[...('' + n)].map(i =>
        i > 0 && i < 4 ? [185, 178, 179][+i - 1] : +i + 8304
      )
    );
var tagBlacklist = [
    'atom',
    'css',
    'html',
    'json',
    'git',
    'github',
    'google_docs',
    'markdown',
    'microsoft_word',
    'notepad++',
    'paint.net',
    'visual_studio_code',
    'yaml',
  ],
  zeroPad = (num, length) =>
    `${'0'.repeat(Math.max(0, length - `${num}`.length))}${num}`,
  newElement = (tag, contents = '', attributes = {}) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    return el;
  },
  render = (links, container) => {
    let [out, notes] = Object.keys(links)
      .reverse()
      .reduce(
        ([acc, notes], year) => {
          Object.keys(links[year])
            .reverse()
            .forEach((month, i) => {
              let monthPadded = zeroPad(month, 2);
              Object.keys(links[year][month])
                .reverse()
                .forEach((day, j) => {
                  let dayPadded = zeroPad(day, 2),
                    dayEntries = links[year][month][day];
                  Array.isArray(dayEntries) || (dayEntries = [dayEntries]);
                  dayEntries.forEach((v, k) => {
                    let entryDiv = newElement('tr', '', {
                        id: `${year}.${monthPadded}.${dayPadded}${
                          k == 0 ? '' : ALPHA[k]
                        }`,
                      }),
                      entryDate = newElement('td', '', { class: 'date' });
                    i + j + k == 0 &&
                      entryDate.appendChild(
                        newElement('a', year, { href: `#${year}` })
                      ) &&
                      (entryDate.innerHTML += '.');
                    j + k == 0 &&
                      entryDate.appendChild(
                        newElement('a', monthPadded, {
                          href: `#${year}.${monthPadded}`,
                        })
                      ) &&
                      (entryDate.innerHTML += '.');
                    entryDate.appendChild(
                      newElement('a', k == 0 ? dayPadded : '..', {
                        href: Array.isArray(v.link)
                          ? v.link[0].url || v.link[0]
                          : v.link.url || v.link,
                        target: '_blank',
                      })
                    );
                    entryDate.innerHTML += ': ';
                    entryDiv.appendChild(entryDate);
                    let entryTags = newElement('td', '', { class: 'tags' });
                    v.tags &&
                      (Array.isArray(v.tags) ? v.tags : [v.tags]).forEach(
                        tag =>
                          icons[tag] && !tagBlacklist.includes(tag) &&
                          entryTags.appendChild(
                            newElement('img', '', {
                              class: 'tag-icon',
                              src: iconsPath + icons[tag],
                              alt: tag,
                              title: tag.replace('_', ' '),
                            })
                          )
                      );
                    entryDiv.appendChild(entryTags);
                    let entryText = newElement('td', v.title, {
                      class: 'title',
                    });
                    v.note &&
                      notes.push(v.note) &&
                      (entryText.innerHTML += `<a href="#${
                        notes.length
                      }" title="${v.note}">${SUPERSCRIPT(notes.length)}</a>`);
                    v.media &&
                      (entryText.innerHTML += ` [<a href="#${year}.${monthPadded}.${dayPadded}${
                        k == 0 ? '' : ALPHA[k]
                      }" onclick=\'embed(this, ${JSON.stringify(
                        v.media
                      )} )'>embed</a>]`);
                    acc.appendChild(entryDiv);
                    entryDiv.appendChild(entryText);
                    let entryLinks = newElement('td', '', { class: 'links' });
                    Array.isArray(v.link) &&
                      (entryLinks.innerHTML += v.link
                        .map((l, m) =>
                          m > 0 || l.title
                            ? `<a href="${l.title ? l.url : l}" ${
                                l.title &&
                                `title="${l.title.replace('_', ' ')}"`
                              } target="_blank">${
                                l.title && icons[l.title]
                                  ? `<img src="${
                                      iconsPath + icons[l.title]
                                    }" alt="${l.title}" class="link-icon" />`
                                  : l.title || m + 1
                              }</a>`
                            : ''
                        )
                        .join(' '));
                    entryDiv.appendChild(entryLinks);
                  });
                });
            });
          return [acc, notes];
        },
        [container, []]
      );
    let noteBlock = newElement('div');
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
