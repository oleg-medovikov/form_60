import Box from '@mui/material/Box';
import { FormEventHandler } from 'react';

type Props = {
  method?: 'GET' | 'POST';
  onSubmit: FormEventHandler;
};

const Form: React.FC<Props> = ({ children, method = 'GET', onSubmit }) => (
  <Box
    component="form"
    method={method}
    onSubmit={onSubmit}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 440,
      mx: 'auto',
      width: '100%',
    }}
  >
    {children}
  </Box>
);

export { Form };
