async function ComponentLoader<T>(
  condition: boolean,
  factory: () => Promise<{ default: T } >,
  map: (constructor: T) => void
) {
  if (condition) {
    const component = await factory();
    map(component.default);
  }
};

export default ComponentLoader;