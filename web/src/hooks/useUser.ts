import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppConfig } from './useAppConfig';
import { useAppError } from './useAppError';

type User = {
  id: string;
  fio: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User>({ id: '', fio: '' });
  const { setConfig } = useAppConfig();
  const { setErrorMessage } = useAppError();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid') || '';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://медовиков.рф:8443/users/${uid}`);
        const { user_id: id, first_name: firstName, second_name: secondName } = await res.json();
        setConfig({ groupId: String(id) });
        setUser({ id, fio: `${firstName} ${secondName}` });
      } catch {
        setErrorMessage('Сервер недоступен');
      }
    };

    fetchUser();
  }, []);

  return user;
};
