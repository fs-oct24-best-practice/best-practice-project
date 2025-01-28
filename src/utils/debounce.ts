/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  ms = 300
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
