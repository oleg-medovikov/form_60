import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useUser } from '@hooks/useUser';
import { snilsRepeat, snilsSum } from '@utils/validate';

type Props = {};

const PatientSearch: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid') || '';
  const user = useUser(uid);
  const [userID, setUserID] = useState('');
  const [userFIO, setUserFIO] = useState('');
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const onSnilsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = e.target.value
      .replace(/\D/g, '')
      .replace(/^(\d{3})-?(\d{1,3})$/, '$1-$2')
      .replace(/^(\d{3})-?(\d{3})-?(\d{1,3})$/, '$1-$2-$3')
      .replace(/^(\d{3})-?(\d{3})-?(\d{3})\s?(\d{1,2})(\d+)?$/, '$1-$2-$3 $4');

    setValue('snils', masked);
  };

  useEffect(() => {
    setValue('identificator', user.id);
    setUserID(user.id);
    setUserFIO(user.fio);
  }, [user]);

  const getErrorMessage = () => {
    switch (errors.snils?.type) {
      case 'required':
        return 'Поле обязательно';
      case 'minLength':
        return 'СНИЛС должен состоять из 11 цифр';
      case 'snilsRepeat':
        return 'Цифра не может повторяться более двух раз подряд';
      case 'snilsSum':
        return 'Контрольная сумма не сходится';
      default:
        return 'Поле не прошло валидацию';
    }
  };

  return (
    <>
      <Typography variant="h6" component="h1" sx={{ mb: 4 }}>
        Привет, {userFIO}! Ваш ID: {userID}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', alignItems: 'start', gap: 0.5, maxWidth: 440 }}
      >
        <TextField
          type="search"
          variant="outlined"
          label="СНИЛС"
          {...register('snils', {
            required: true,
            minLength: 11,
            onChange: onSnilsChange,
            validate: {
              snilsRepeat,
              snilsSum,
            },
          })}
          error={errors.snils}
          helperText={errors.snils && getErrorMessage()}
          sx={{ flex: '1 1 0' }}
        />
        <Input type="hidden" {...register('identificator', { required: true })} />
        <Button type="submit" variant="contained" sx={{ lineHeight: 1.4, py: 2.2 }}>
          Искать
        </Button>
      </Box>
    </>
  );
};

export { PatientSearch };
