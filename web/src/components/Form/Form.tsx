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
      gap: 4,
      maxWidth: 440,
      mx: 'auto',
      '& .MuiFormHelperText-root': {
        position: 'absolute',
        top: '100%',
      },
    }}
  >
    {children}
  </Box>
);

export { Form };
