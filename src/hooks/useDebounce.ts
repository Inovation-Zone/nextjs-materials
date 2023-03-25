import { useEffect, useState } from 'react';

export default function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number): (...args: T) => void {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (...args: T) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => callback(...args), delay));
  };
}
