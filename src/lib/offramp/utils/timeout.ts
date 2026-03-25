/**
 * Wraps a promise with a timeout. Rejects with a descriptive message if the
 * promise does not settle within `ms` milliseconds. The timer is always
 * cleared on both resolve and reject to avoid memory leaks.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms / 1000}s`));
    }, ms);

    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (err)   => { clearTimeout(timer); reject(err); }
    );
  });
}
