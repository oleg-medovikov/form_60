import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useAppConfig } from '@hooks/useAppConfig';

type Props = {};

const Footer: React.FC<Props> = () => {
  const {
    config: { groupId, username },
  } = useAppConfig();

  return (
    <Box component="footer" sx={{ mt: 'auto', py: 2 }}>
      <Container>
        {groupId ? `${username}, ваш id группы ${groupId}` : 'id группы неизвестен'}
      </Container>
    </Box>
  );
};

export { Footer };
