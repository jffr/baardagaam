import Alert from './Alert';

const targets = Array.from(
  document.querySelectorAll<HTMLButtonElement>('.js-alert')
);
const instances = targets.map((target) => new Alert(target));

module.hot.dispose(() => {
  instances.forEach((component) => {
    component.dispose();
  });
});

export default instances;
