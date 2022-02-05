import { Route, Routes } from 'react-router-dom';

import { PatientSearch } from '@pages/PatientSearch';

const App = () => (
  <Routes>
    <Route path="/" element={<PatientSearch />} />
  </Routes>
);

export default App;
