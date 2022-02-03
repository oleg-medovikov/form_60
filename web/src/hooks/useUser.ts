import { useEffect, useState } from 'react';

type User = {
  id: string;
  fio: string;
};

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>({ id: '0', fio: 'Аноним' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://медовиков.рф:8443/users/${uid}`);
        const { user_id: id, first_name: firstName, second_name: secondName } = await res.json();
        setUser({ id, fio: `${firstName} ${secondName}` });
      } catch (err) {
        setUser({ id: '0', fio: 'Аноним' });
      }
    };

    fetchUser();
  }, []);

  return user;
};
