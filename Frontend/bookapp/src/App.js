import React from 'react';
import Home from './Home';
import AddEdit from './AddEdit';
import View from './View';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';

const App = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/addedit/:id" element={<AddEdit />} />
          <Route path="/addedit" element={<AddEdit />} />
        </Routes>

    </BrowserRouter>
  );
};

export default App;
