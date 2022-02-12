import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { useAppConfig } from '@hooks/useAppConfig';
import { useAppError } from '@hooks/useAppError';

type Props = {};

const Login: React.FC<Props> = () => {
  const { setConfig } = useAppConfig();
  const { setErrorMessage } = useAppError();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid') || '';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://медовиков.рф:8443/users/${uid}`);
        const { user_id: id, first_name: firstName, second_name: secondName } = await res.json();
        const fio = `${firstName} ${secondName}`;
        setConfig({ groupId: String(id), username: fio });
        setErrorMessage('');
        navigate('/search');
      } catch {
        setErrorMessage('Сервер недоступен');
      }
    };

    fetchUser();
  }, []);

  return <Typography variant="h3" component="h1" sx={{ m: '5rem auto 0' }}>Загрузка...</Typography>;
};

export { Login };
