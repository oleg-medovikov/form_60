import { useContext } from 'react';

import { AppConfigContext } from '@providers/AppConfigProvider';

export const useAppConfig = () => useContext(AppConfigContext);
