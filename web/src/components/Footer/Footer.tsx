import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useUser } from '@hooks/useUser';

type Props = {};

const Footer: React.FC<Props> = () => {
  const { fio, id } = useUser();

  return (
    <Box sx={{ mt: 'auto', py: 2 }}>
      <Container>{id ? `${fio}, ваш id группы ${id}` : 'id группы неизвестен'}</Container>
    </Box>
  );
};

export { Footer };
