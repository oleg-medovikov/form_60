import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Form } from '@components/Form';
import { FormGroup } from '@mui/material';

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        variant="outlined"
        label="ФИО"
        {...register('fio', { required: true })}
        error={!!errors.fio}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="УНРЗ"
        {...register('unrz', { required: true })}
        error={!!errors.unrz}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="Полис"
        {...register('polis', { required: true })}
        error={!!errors.polis}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="Эпидномер"
        {...register('epidNumber', { required: true })}
        error={!!errors.epidNumber}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="Паспорт"
        {...register('passport', { required: true })}
        error={!!errors.passport}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="Телефон"
        {...register('phone', { required: true })}
        error={!!errors.phone}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="Адрес"
        {...register('address', { required: true })}
        error={!!errors.address}
        helperText={false}
        margin="normal"
      />
      <FormGroup>
        <span>1</span>
        <span>2</span>
      </FormGroup>
      <TextField
        type="text"
        variant="outlined"
        label="Врач"
        {...register('doctor', { required: true })}
        error={!!errors.doctor}
        helperText={false}
        margin="normal"
      />
      <TextField
        type="text"
        variant="outlined"
        label="Место работы"
        {...register('workplace', { required: true })}
        error={!!errors.workplace}
        helperText={false}
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Сохранить
      </Button>
    </Form>
  );
};

export { PatientForm };
