import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { Form } from '@components/Form';

type Props = {
  onSubmit: (data: { [key: string]: string }) => void;
};

const PatientForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container sx={{ py: 6 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          variant="outlined"
          label="ФИО"
          {...register('fio', { required: true })}
          error={!!errors.fio}
          helperText=" "
          margin="normal"
        />
        {/* Birth date, register date */}
        <TextField
          type="text"
          variant="outlined"
          label="УНРЗ"
          {...register('unrz', { required: true })}
          error={!!errors.unrz}
          helperText=" "
          margin="normal"
        />
        <TextField
          type="text"
          variant="outlined"
          label="Полис"
          {...register('polis', { required: true })}
          error={!!errors.polis}
          helperText=" "
          margin="normal"
        />
        <TextField
          type="text"
          variant="outlined"
          label="Эпидномер"
          {...register('epidNumber', { required: true })}
          error={!!errors.epidNumber}
          helperText=" "
          margin="normal"
        />
        <TextField
          type="text"
          variant="outlined"
          label="Паспорт"
          {...register('passport', { required: true })}
          error={!!errors.passport}
          helperText=" "
          margin="normal"
        />
        <TextField
          type="text"
          variant="outlined"
          label="Телефон"
          {...register('phone', { required: true })}
          error={!!errors.phone}
          helperText=" "
          margin="normal"
        />
        <TextField
          type="text"
          variant="outlined"
          label="Адрес"
          {...register('address', { required: true })}
          error={!!errors.address}
          helperText=" "
          margin="normal"
        />
        {/* Start date, end date */}
        <TextField
          type="text"
          variant="outlined"
          label="Врач"
          {...register('doctor', { required: true })}
          error={!!errors.doctor}
          helperText=" "
          margin="normal"
        />
        <TextField
          type="text"
          variant="outlined"
          label="Место работы"
          {...register('workplace', { required: true })}
          error={!!errors.workplace}
          helperText=" "
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export { PatientForm };
