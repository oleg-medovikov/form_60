import { useState } from 'react';
import { useAppError } from './useAppError';

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const { setErrorMessage } = useAppError();

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      setErrorMessage('');
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setErrorMessage('Ошибка доступа к сессионному хранилищу');
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Ошибка записи в сессионное хранилищу');
    }
  };

  return [storedValue, setValue] as const;
};
