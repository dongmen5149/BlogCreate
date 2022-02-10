import LogIn from '@pages/Login';
import View from '@pages/View';
import Write from '@pages/Write';
import React from 'react';
import { Route, Routes } from 'react-router';
import RightMenu from '../RightMenu';
import List from '@pages/List';

const Main = () => {
  return (
    <div className="Mains">
      <div id="Mains-left">
        <h3> Left Side </h3>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<List></List>}></Route>
          <Route path="write" element={<Write></Write>}></Route>
          <Route path="view/:data" element={<View></View>}></Route>
        </Routes>
      </div>

      <div id="Mains-right">
        <Routes>
          <Route path="write" element={<RightMenu></RightMenu>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
