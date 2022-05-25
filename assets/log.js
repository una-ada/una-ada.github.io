const alpha = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
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
    let [out, notes] = Object.keys(links).reduce(
      ([acc, notes], year) => {
        let yearDiv = newElement('div', '', { id: year });
        // Loop over months in a year
        Object.keys(links[year]).reduce((yearContainer, month, i) => {
          let monthPadded = zeroPad(month, 2),
            monthDiv = newElement('div', '', { id: `${year}.${monthPadded}` });
          // Loop over days in a month
          Object.keys(links[year][month]).reduce((monthContainer, day, j) => {
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
              let entryText = newElement('span', v.title, { class: 'title' });
              v.note &&
                notes.push(v.note) &&
                (entryText.innerHTML += `<a href="#${notes.length}"><sup title="${v.note}">${notes.length}</sup></a>`);
              Array.isArray(v.link) &&
                (entryText.innerHTML +=
                  ' ' +
                  v.link
                    .map(
                      (v, i) => `<a href="${v}" target="_blank">${i + 1}</a>`
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
        '<div id="' + ++i + '"><sup>' + i + '</sup>' + notes[i - 1] + '</div>';
    return out;
  };
