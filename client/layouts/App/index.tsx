import LogIn from '@pages/Login';
import SignUp from '@pages/SignUp';
import Workspace from '@pages/Workspace';
import React from 'react';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/*" element={<Workspace />} />
    </Routes>
  );
};

export default App;
