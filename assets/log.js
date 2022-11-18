const dummy = 0,
  ALPHA = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
  SUPERSCRIPT = n =>
    String.fromCodePoint(
      ...[...('' + n)].map(i =>
        i > 0 && i < 4 ? [185, 178, 179][+i - 1] : +i + 8304
      )
    );
(icons = {
  // Distribution
  adobe_color: 'dist/adobe_color.png',
  adobe_fonts: 'dist/adobe_fonts.png',
  amazon_music: 'dist/amazon_music.png',
  anchor: 'dist/anchor.png',
  anghami: 'dist/anghami.png',
  apple_music: 'dist/apple_music.png',
  apple_podcasts: 'dist/apple_podcasts.png',
  audible: 'dist/audible.png',
  backtracks: 'dist/backtracks.png',
  bandcamp: 'dist/bandcamp.png',
  boomplay: 'dist/boomplay.png',
  castbox: 'dist/castbox.png',
  deezer: 'dist/deezer.png',
  distrokid: 'dist/distrokid.png',
  github: 'dist/github.png',
  github_pages: 'dist/github.png',
  google_domains: 'dist/google_domains.png',
  google_fonts: 'dist/google_fonts.png',
  google_podcasts: 'dist/google_podcasts.png',
  heroku: 'dist/heroku.png',
  iheartradio: 'dist/iheartradio.png',
  kkbox: 'dist/kkbox.png',
  myfonts: 'dist/myfonts.png',
  netease_cloud_music: 'dist/netease_cloud_music.png',
  npm: 'dist/npm.png',
  playerfm: 'dist/playerfm.png',
  pocket_casts: 'dist/pocket_casts.png',
  podbay: 'dist/podbay.png',
  podchaser: 'dist/podchaser.png',
  podyssey: 'dist/podyssey.png',
  radio_public: 'dist/radio_public.png',
  qobuz: 'dist/qobuz.png',
  soundcloud: 'dist/soundcloud.png',
  spotify: 'dist/spotify.png',
  spring: 'dist/spring.png',
  stitcher: 'dist/stitcher.png',
  triller: 'dist/triller.png',
  vercel: 'dist/vercel.png',
  vk: 'dist/vk.png',
  vscode: 'type/folder_vs.png',
  yandex_music: 'dist/yandex_music.png',
  youtube: 'dist/youtube.png',
  youtube_music: 'dist/youtube_music.png',
  // Languages
  c: 'lang/c.png',
  cpp: 'lang/cpp.png',
  csharp: 'lang/cs.png',
  haskell: 'lang/hs.png',
  handlebars: 'lang/hbs.png',
  html: 'lang/html.png',
  java: 'lang/java.png',
  javascript: 'lang/js.png',
  json: 'lang/json.png',
  liquid: 'lang/liquid.png',
  markdown: 'lang/md.png',
  php: 'lang/php.png',
  pug: 'lang/pug.png',
  python: 'lang/py.png',
  ruby: 'lang/ruby.png',
  scss: 'lang/sass.png',
  typescript: 'lang/ts.png',
  yaml: "lang/yml.png",
  // Libraries
  angular: 'lib/angular.png',
  graphql: 'lib/graphql.png',
  meteor: 'lib/meteor.png',
  oauth: 'lib/oauth.png',
  react: 'lib/react.png',
  threejs: 'lib/threejs.png',
  webpack: 'lib/webpack.png',
  // Software
  ableton_live: 'soft/ableton_live.png',
  adobe_illustrator: 'soft/adobe_illustrator.png',
  adobe_indesign: 'soft/adobe_indesign.png',
  adobe_photoshop: 'soft/adobe_photoshop.png',
  adobe_xd: 'soft/adobe_xd.png',
  apache: 'soft/apache.png',
  audacity: 'soft/audacity.png',
  fontforge: 'soft/fontforge.png',
  git: 'soft/git.png',
  glyphs: 'soft/glyphs.png',
  jekyll: 'soft/jekyll.png',
  logic_pro: 'soft/logic_pro.png',
  mongodb: 'soft/mongodb.png',
  mysql: 'soft/mysql.png',
  nodejs: 'soft/node.png',
  postgresql: 'soft/postgresql.png',
  // Type
  asset: 'type/asset.png',
  design: 'type/image.png',
  font: 'type/font.png',
  merchandise: 'type/merch.png',
  music: 'type/music.png',
  podcast: 'type/audio.png',
  programming: 'type/program.png',
  video: 'type/video.png',
  writing: 'etc/readme.png',
  // Other
  minecraft: 'etc/minecraft.png',
  myanimelist: 'etc/myanimelist.png',
}),
  (iconsPath = '/una-theme-icons/12px/'),
  (zeroPad = (num, length) =>
    `${'0'.repeat(Math.max(0, length - `${num}`.length))}${num}`),
  (newElement = (tag, contents = '', attributes = {}) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    return el;
  }),
  (render = (links, container) => {
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
                        k == 0 ? '' : ALPHA[k]
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
                        href: Array.isArray(v.link)
                          ? v.link[0].url || v.link[0]
                          : v.link.url || v.link,
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
                      (entryText.innerHTML += `<a href="#${
                        notes.length
                      }" title="${v.note}">${SUPERSCRIPT(notes.length)}</a>`);
                    Array.isArray(v.link) &&
                      (entryText.innerHTML +=
                        '. ' +
                        v.link
                          .map((l, i) =>
                            i > 0 || l.title
                              ? `<a href="${l.title ? l.url : l}" ${
                                  l.title &&
                                  `title="${l.title.replace('_', ' ')}"`
                                } target="_blank">${
                                  l.title && icons[l.title]
                                    ? `<img src="${
                                        iconsPath + icons[l.title]
                                      }" alt="${l.title}" class="link-icon" />`
                                    : l.title || i + 1
                                }</a>`
                              : ''
                          )
                          .join(' '));
                    v.media &&
                      (entryText.innerHTML += ` [<a href="#${year}.${monthPadded}.${dayPadded}${
                        k == 0 ? '' : ALPHA[k]
                      }" onclick=\'embed(this, ${JSON.stringify(
                        v.media
                      )} )'>embed</a>]`);
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
        '<div id="' + ++i + '">' + SUPERSCRIPT(i) + ' ' + notes[i - 1] + '</div>';
    return out;
  });
