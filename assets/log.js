const alpha = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
  icons = {
    ableton_live: 'live.png',
    adobe_color: 'adobe_color.png',
    adobe_fonts: 'adobe_fonts.png',
    adobe_illustrator: 'ai.png',
    adobe_indesign: 'id.png',
    adobe_photoshop: 'ps.png',
    adobe_xd: 'xd.png',
    angular: 'angular.png',
    amazon_music: 'amazon_music.png',
    anghami: 'anghami.png',
    apache: 'apache.png',
    apple_music: 'apple_music.png',
    asset: 'asset.png',
    audacity: 'audacity.png',
    bandcamp: 'bandcamp.png',
    boomplay: 'boomplay.png',
    c: 'c.png',
    cpp: 'cpp.png',
    csharp: 'cs.png',
    deezer: 'deezer.png',
    design: 'img.png',
    distrokid: 'distrokid.png',
    font: 'font.png',
    fontforge: 'fontforge.png',
    git: 'git.png',
    github: 'github.png',
    github_pages: 'github.png',
    glyphs: 'glyphs.png',
    google_domains: 'google_domains.png',
    google_fonts: 'google_fonts.png',
    graphql: 'graphql.png',
    haskell: 'hs.png',
    handlebars: 'hbs.png',
    heroku: 'heroku.png',
    // html: 'html.png',
    iheartradio: 'iheartradio.png',
    java: 'java.png',
    javascript: 'js.png',
    jekyll: 'jekyll.png',
    json: 'json.png',
    kkbox: 'kkbox.png',
    liquid: 'liquid.png',
    logic_pro: 'logic.png',
    markdown: 'md.png',
    merchandise: 'merch.png',
    meteor: 'meteor.png',
    minecraft: 'minecraft.png',
    mongodb: 'mongo.png',
    music: 'music.png',
    myanimelist: 'myanimelist.png',
    myfonts: 'myfonts.png',
    mysql: 'mysql.png',
    netease_cloud_music: 'netease_cloud_music.png',
    nodejs: 'node.png',
    npm: 'npm.png',
    oauth: 'oauth.png',
    php: 'php.png',
    podcast: 'aud.png',
    postgresql: 'postgresql.png',
    programming: 'pc.png',
    pug: 'pug.png',
    python: 'py.png',
    qobuz: 'qobuz.png',
    react: 'react.png',
    scss: 'sass.png',
    soundcloud: 'soundcloud.png',
    spotify: 'spotify.png',
    spring: 'spring.png',
    threejs: 'threejs.png',
    triller: 'triller.png',
    typescript: 'ts.png',
    vercel: 'vercel.png',
    video: 'video.png',
    vscode: 'folder_vs.png',
    webpack: 'webpack.png',
    writing: 'readme.png',
    // yaml: "yml.png",
    youtube_music: 'youtube_music.png',
  },
  iconsPath = '/assets/img/icons/',
  zeroPad = (num, length) =>
    `${'0'.repeat(Math.max(0, length - `${num}`.length))}${num}`,
  newElement = (tag, contents = '', attributes = {}) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    return el;
  },
  render = (links, container) => {
    // Loop over the top level of the links (years)
    let [out, notes] = Object.keys(links)
      .reverse()
      .reduce(
        ([acc, notes], year) => {
          let yearDiv = newElement('div', '', { id: year });
          // Loop over months in a year
          Object.keys(links[year])
            .reverse()
            .reduce((yearContainer, month, i) => {
              let monthPadded = zeroPad(month, 2),
                monthDiv = newElement('div', '', {
                  id: `${year}.${monthPadded}`,
                });
              // Loop over days in a month
              Object.keys(links[year][month])
                .reverse()
                .reduce((monthContainer, day, j) => {
                  let dayPadded = zeroPad(day, 2),
                    dayEntries = links[year][month][day];
                  Array.isArray(dayEntries) || (dayEntries = [dayEntries]);
                  dayEntries.forEach((v, k) => {
                    let entryDiv = newElement('div', '', {
                      id: `${year}.${monthPadded}.${dayPadded}${
                        k == 0 ? '' : alpha[k]
                      }`,
                    });
                    i + j + k == 0
                      ? entryDiv.appendChild(
                          newElement('a', year, { href: `#${year}` })
                        ) && (entryDiv.innerHTML += '.')
                      : (entryDiv.innerHTML += '<t></t>&nbsp;');
                    j + k == 0
                      ? entryDiv.appendChild(
                          newElement('a', monthPadded, {
                            href: `#${year}.${monthPadded}`,
                          })
                        ) && (entryDiv.innerHTML += '.')
                      : (entryDiv.innerHTML += '&nbsp;'.repeat(3));
                    entryDiv.appendChild(
                      newElement('a', k == 0 ? dayPadded : '..', {
                        href: Array.isArray(v.link) ? v.link[0] : v.link,
                        target: '_blank',
                      })
                    );
                    entryDiv.innerHTML += ': ';
                    let entryText = newElement('span', '', {
                      class: 'title',
                    });
                    v.tags &&
                      v.tags.forEach(
                        tag =>
                          icons[tag] &&
                          entryText.appendChild(
                            newElement('img', '', {
                              class: 'tag-icon',
                              src: iconsPath + icons[tag],
                              alt: tag,
                              title: tag.replace('_', ' '),
                            })
                          )
                      );
                    entryText.innerHTML += v.title;
                    v.note &&
                      notes.push(v.note) &&
                      (entryText.innerHTML += `<a href="#${notes.length}"><sup title="${v.note}">${notes.length}</sup></a>`);
                    Array.isArray(v.link) &&
                      (entryText.innerHTML +=
                        ' ' +
                        v.link
                          .map(
                            (v, i) =>
                              `<a href="${v}" target="_blank">${i + 1}</a>`
                          )
                          .join(' '));
                    v.media &&
                      (entryText.innerHTML += ` <a href="#${year}.${monthPadded}.${dayPadded}${
                        k == 0 ? '' : alpha[k]
                      }" onclick=\'embed(this, ${JSON.stringify(
                        v.media
                      )} )'>&#x25BE;</a>`);
                    entryDiv.appendChild(entryText);
                    monthContainer.appendChild(entryDiv);
                  });
                  return monthContainer;
                }, monthDiv);
              yearContainer.appendChild(monthDiv);
              return yearContainer;
            }, yearDiv);
          acc.appendChild(yearDiv);
          return [acc, notes];
        },
        [container, []]
      );
    out.innerHTML += '<br>notes:<br>';
    for (var i = 0; i < notes.length; )
      out.innerHTML +=
        '<div id="' + ++i + '"><sup>' + i + '</sup> ' + notes[i - 1] + '</div>';
    return out;
  };
