var newElement = (tag, contents = '', attributes = {}, children = []) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    children.forEach(child => el.appendChild(child));
    return el;
  },
  render = async (json, container) => {
    var { icons, iconsPath } = json;
    console.log(icons);
    Object.keys(icons).forEach(category => {
      container.appendChild(
        newElement(
          'table',
          '',
          {
            class: 'tag-list',
          },
          [
            newElement('thead', '', {}, [
              newElement('td', category),
              newElement('td', 'icon'),
              newElement('td', 'path'),
            ]),
            ...Object.keys(icons[category]).map(icon =>
              newElement('tr', '', {}, [
                newElement('td', icon.replaceAll('_', ' '), {
                  class: 'tag-name',
                }),
                newElement('td', '', { class: 'tag-icons' }, [
                  newElement('img', '', {
                    class: 'tag-icon',
                    src: iconsPath + icons[category][icon],
                    alt: icon,
                    title: icon.replaceAll('_', ' '),
                  }),
                ]),
                newElement('td', icons[category][icon], { class: 'tag-path' }),
              ])
            ),
          ]
        )
      );
    });
  };
