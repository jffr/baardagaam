import Hello from './hello';

function component() {
  const element = document.createElement('div');
  const hello = new Hello();
  element.appendChild(hello.render());

  return element;
}

let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./hello', () => {
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}