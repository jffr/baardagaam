export interface IDispose {
  dispose(): void;
}

export function ComponentDisposer(instances: IDispose[]) {
  instances.forEach(instance => instance.dispose());
}