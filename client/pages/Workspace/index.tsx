import React from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import { Navigate, Route, Routes } from 'react-router';

import 'antd/dist/antd.css';
import LeftMenu from '@layouts/Navbar/LeftMenu';
import Write from '@pages/Write';
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import Headbar from '@layouts/Navbar/Headbar';
import Main from '@layouts/Navbar/Main';

const Workspace = () => {
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  // const { data: ReviewData } = useSWR<IWorkspace[]>(userData ? '/api/workspaces/' : null, fetcher);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="header">
        <Headbar></Headbar>
      </div>
      <div>
        <Main></Main>
      </div>
      <div className="footer">hello my name is Ryu!</div>
    </div>
  );
};

export default Workspace;
