import HelloWorld from './HelloWorld';

const targets = Array.from(
  document.querySelectorAll<HTMLDivElement>('.js-hello-world')
);
const instances = targets.map((node) => new HelloWorld(node));

module.hot.dispose(() => {
  instances.forEach((component) => {
    component.dispose();
  });
});

export default instances;
