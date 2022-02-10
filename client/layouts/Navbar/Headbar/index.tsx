import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const Headbar = () => {
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });

  const onLogout = useCallback(() => {
    if (confirm('로그아웃 하시겠습니까?') == true) {
      axios
        .post('/api/users/logout', null, {
          withCredentials: true,
        })
        .then(() => {
          setTimeout(() => {
            mutate(false, false);
          }, 2000);
        });
    } else {
      return false;
    }
  }, []);

  return (
    <div className="header_grid">
      <div className="acenter">
        {userData ? (
          <h5>
            <Link to={'write'}>포스트작성</Link>
          </h5>
        ) : null}
      </div>
      <div className="acenter">
        <Routes>
          <Route path="/" />
        </Routes>

        <Link className="link_tit" to="/">
          <h1> Ryu's Blog </h1>
        </Link>
      </div>

      <div className="acenter">
        <a onClick={onLogout}>Logout</a>
      </div>
    </div>
  );
};

export default Headbar;
