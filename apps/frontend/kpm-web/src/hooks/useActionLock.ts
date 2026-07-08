import { useCallback, useRef, useState } from 'react';

/**
 * Guards async UI actions from duplicate clicks.
 *
 * The ref blocks re-entry immediately in the same event loop tick, while the
 * state exposes loading keys for buttons and modals. Keep action keys stable
 * and semantic, for example "customer-material-upload".
 */
export function useActionLock() {
  const locksRef = useRef<Set<string>>(new Set());
  const [loadingKeys, setLoadingKeys] = useState<Set<string>>(() => new Set());

  const isLocked = useCallback((key: string) => loadingKeys.has(key), [loadingKeys]);

  const runLocked = useCallback(async <T,>(key: string, action: () => Promise<T> | T): Promise<T | undefined> => {
    if (locksRef.current.has(key)) return undefined;
    locksRef.current.add(key);
    setLoadingKeys((previous) => new Set(previous).add(key));
    try {
      return await action();
    } finally {
      locksRef.current.delete(key);
      setLoadingKeys((previous) => {
        const next = new Set(previous);
        next.delete(key);
        return next;
      });
    }
  }, []);

  return { isLocked, runLocked };
}
