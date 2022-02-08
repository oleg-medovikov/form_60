import { useState } from 'react';
import { useAppError } from './useAppError';

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const { setErrorMessage } = useAppError();

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setErrorMessage('Session storage access failed');
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      setErrorMessage('Session storage save failed');
    }
  };

  return [storedValue, setValue] as const;
};
