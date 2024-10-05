var newElement = (tag, contents = '', attributes = {}, children = []) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    children.forEach(child => el.appendChild(child));
    return el;
  },
  render = async (json, container) => {
    var { iconsPath, coversPath, recs } = json,
      c = 0;
    recs.forEach(rec => {
      (c = rec.rating / 2 + 1) &&
        container.appendChild(
          newElement(
            'tr',
            '',
            {
              class: 'rec',
            },
            [
              newElement('td', '', {}, [
                newElement('img', '', {
                  class: 'rec-icon',
                  src: coversPath + rec.cover,
                }),
                newElement(
                  'span',
                  rec.type.toUpperCase(),
                  {
                    class: rec.type,
                    style: 'display:block;margin-left:0.75em;'
                  }
                ),
              ]),
              newElement('td', '', { class: `title ${rec.type}` }, [
                newElement('span', `${rec.title}<br>`, { class: 'rec-title' }),
                newElement('img', '', {
                  class: 'tag-icon',
                  src: iconsPath + 'flag/' + rec.origin + '.png',
                }),
                newElement('span', rec.title_original + '<br>', {
                  class: 'rec-title-original',
                }),
                newElement(
                  'span',
                  rec.tags
                    .map(
                      s => `<span class="genre">${s.replace('_', ' ')}</span>`
                    )
                    .join(', ') + '<br><br>'
                ),
                newElement('span', rec.review + ' '),
                newElement(
                  'span',
                  Array(5)
                    .fill(0)
                    .map(
                      _ =>
                        `<img class="tag-icon" src="${iconsPath}etc/${
                          --c < 0.4
                            ? 'heart_empty.png'
                            : c > 0.6
                            ? 'heart.png'
                            : 'heart_half.png'
                        }"/>`
                    )
                    .join('') + `(${rec.rating}/10)<br><br>`
                ),
              ]),
              newElement('td', '', { class: 'links' }, []),
            ]
          )
        );
    });
  };
