import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { useUser } from '@hooks/useUser';
import { snilsRepeat, snilsSum } from '@utils/validate';

type Props = {};

const PatientSearch: React.FC<Props> = () => {
  const user = useUser();
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
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 440, mx: 'auto' }}
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
          margin="normal"
        />
        <input type="hidden" {...register('identificator', { required: true })} />
        <Button type="submit" variant="contained">
          Искать
        </Button>
      </Box>
    </Container>
  );
};

export { PatientSearch };
