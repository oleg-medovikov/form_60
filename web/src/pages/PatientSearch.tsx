import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { Form } from '@components/Form';
import { useAppError } from '@hooks/useAppError';
import { useUser } from '@hooks/useUser';
import { snilsRepeat, snilsSum } from '@utils/validate';

type Props = {};

const PatientSearch: React.FC<Props> = () => {
  const user = useUser();
  const { setErrorMessage } = useAppError();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm();
  const onSubmit = async ({ snils, gid }: { [key: string]: string }) => {
    try {
      const res = await fetch(
        `https://медовиков.рф:8443/patients/?snils=${snils}&identificator=${gid}`
      );

      if (res.status === 200) {
        console.log(res);
      } else if (res.status === 404) {
        console.log('Not found');
      }
      setErrorMessage('');
    } catch {
      setErrorMessage('Сервер недоступен');
    }
  };

  const onSnilsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = e.target.value
      .replace(/\D/g, '')
      .replace(/^(\d{3})-?(\d{1,3})$/, '$1-$2')
      .replace(/^(\d{3})-?(\d{3})-?(\d{1,3})$/, '$1-$2-$3')
      .replace(/^(\d{3})-?(\d{3})-?(\d{3})\s?(\d{1,2})(\d+)?$/, '$1-$2-$3 $4');

    setValue('snils', masked);
  };

  useEffect(() => {
    setValue('gid', user.id);
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
    <Container sx={{ py: 6 }}>
      <Form method="GET" onSubmit={handleSubmit(onSubmit)}>
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
          error={!!errors.snils}
          helperText={errors.snils && getErrorMessage()}
          margin="normal"
        />
        <input type="hidden" {...register('gid', { required: true })} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Искать
        </Button>
      </Form>
    </Container>
  );
};

export { PatientSearch };
