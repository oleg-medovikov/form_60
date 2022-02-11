import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { PatientCreate } from '@pages/PatientCreate';
import { PatientSearch } from '@pages/PatientSearch';
import { AppError } from '@components/AppError';
import { Footer } from '@components/Footer';

const App = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <CssBaseline />
    <AppError />
    <Routes>
      <Route path="/" element={<PatientSearch />} />
      <Route path="/create" element={<PatientCreate />} />
    </Routes>
    <Footer />
  </Box>
);

export default App;
