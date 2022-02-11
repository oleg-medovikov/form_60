import { useSessionStorage } from '@hooks/useSessionStorage';
import { createContext, useMemo, useState } from 'react';

type AppConfig = {
  groupId: string;
};

type AppConfigContextType = {
  config: AppConfig;
  setConfig: (c: AppConfig) => void;
};

const initialValue: AppConfigContextType = {
  config: { groupId: '' },
  setConfig: () => null,
};

const AppConfigContext = createContext<AppConfigContextType>(initialValue);

const AppConfigProvider: React.FC = ({ children }) => {
  const [storedConfig, setStoredConfig] = useSessionStorage<AppConfig>('form60:config', {
    groupId: '',
  });

  const [config, setConfig] = useState<AppConfig>(storedConfig);

  const setAppConfig = (c: AppConfig) => {
    setConfig(c);
    setStoredConfig(c);
  };

  const memeValue = useMemo(() => ({ config, setConfig: setAppConfig }), [config]);

  return <AppConfigContext.Provider value={memeValue}>{children}</AppConfigContext.Provider>;
};

export { AppConfigContext, AppConfigProvider };
