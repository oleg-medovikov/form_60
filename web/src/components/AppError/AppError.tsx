import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useAppError } from '@hooks/useAppError';

type Props = {};

const AppError: React.FC<Props> = () => {
  const { errorMessage } = useAppError();

  return errorMessage !== '' ? (
    <Box sx={{ bgcolor: '#f34', color: '#fff' }}>
      <Container sx={{ py: 0.5, textAlign: 'center' }}>{errorMessage}</Container>
    </Box>
  ) : null;
};

export { AppError };
