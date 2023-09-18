var newElement = (tag, contents = '', attributes = {}, children = []) => {
    let el = document.createElement(tag);
    el.innerHTML = contents;
    Object.keys(attributes).forEach(v => el.setAttribute(v, attributes[v]));
    children.forEach(child => el.appendChild(child));
    return el;
  },
  render = async (json, container) => {
    var { icons, iconsPath } = json;
    Object.keys(icons).sort().forEach(icon => {
      container.appendChild(
        newElement('tr', '', {}, [
          newElement('td', icon.replaceAll('_', ' ')),
          newElement('td', '', {}, [
            newElement('img', '', {
              class: 'tag-icon',
              src: iconsPath + icons[icon],
              alt: icon,
              title: icon.replaceAll('_', ' '),
            }),
          ]),
          newElement('td', icons[icon]),
        ])
      );
    });
  };
