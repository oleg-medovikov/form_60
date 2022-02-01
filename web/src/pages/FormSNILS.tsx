import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {};

const FormSNILS: React.FC<Props> = () => {
  const { search } = useLocation();
  const [userID, setUserID] = useState('');
  const [userFIO, setUserFIO] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const uid = search.replace(/\?uid=(\d+)/, '$1');
        const res = await fetch(`/users/${uid}`);
        const { id, name } = await res.json();
        setUserID(id);
        setUserFIO(name);
      } catch (err) {
        setUserID('0');
        setUserFIO('Аноним');
      }
    };

    getData();
  }, []);

  return userFIO === '' ? (
    <h1>Loading...</h1>
  ) : (
    <h1>
      Привет, {userFIO}! Ваш ID: {userID}
    </h1>
  );
};

export { FormSNILS };
