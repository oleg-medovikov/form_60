import { PatientForm } from '@components/PatientForm';

type Props = {};

const PatientCreate: React.FC<Props> = () => {
  const onSubmit = (data: any) => console.log(data);

  return <PatientForm onSubmit={onSubmit} />;
};

export { PatientCreate };
