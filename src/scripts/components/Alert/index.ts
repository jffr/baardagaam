import { ComponentDisposer } from '../../utils/ComponentDisposer';
import Alert from './Alert';

const targets = Array.from(
  document.querySelectorAll<HTMLButtonElement>('.js-alert')
);
const instances = targets.map((target) => new Alert(target));

module.hot.dispose(() => {
  ComponentDisposer(instances);
});

export default instances;
