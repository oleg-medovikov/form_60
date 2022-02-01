import { Route, Routes } from 'react-router-dom';

import { FormSNILS } from '@pages/FormSNILS';

const App = () => (
  <Routes>
    <Route path="/" element={<FormSNILS />} />
  </Routes>
);

export default App;
