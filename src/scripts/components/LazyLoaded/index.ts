import ComponentLoader from '../../utils/ComponentLoader';

const targets = Array.from(document.querySelectorAll('.js-lazy'));

export default ComponentLoader(
  targets.length > 0,
  () => import(/* webpackChunkName: "Lazy" */ './Lazy'),
  (Component) => targets.map(() => new Component())
);
