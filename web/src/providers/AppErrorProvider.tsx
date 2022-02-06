import React, { createContext, useMemo, useState } from 'react';

type AppErrorState = {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

const initialValue: AppErrorState = {
  errorMessage: '',
  setErrorMessage: () => null,
};

const AppErrorContext = createContext<AppErrorState>(initialValue);

const AppErrorProvider: React.FC = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const memeValue = useMemo(() => ({ errorMessage, setErrorMessage }), [errorMessage]);

  return <AppErrorContext.Provider value={memeValue}>{children}</AppErrorContext.Provider>;
};

export { AppErrorContext, AppErrorProvider };
