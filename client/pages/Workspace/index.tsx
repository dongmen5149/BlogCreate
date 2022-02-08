import React from "react";
import { useCallback } from 'react'
import axios from "axios";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import { IUser } from "@typings/db";
import { Navigate, Route, Routes } from "react-router";

import 'antd/dist/antd.css';
import LeftMenu from "@layouts/Navbar/LeftMenu";
import View from "@pages/View";
import Write from "@pages/Write";

const Workspace = () => {
    const { data: userData, error, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
        dedupingInterval: 2000, // 2초
    });
    // const { data: ReviewData } = useSWR<IWorkspace[]>(userData ? '/api/workspaces/' : null, fetcher);

    const onLogout = useCallback(() => {
        axios
            .post('/api/users/logout', null, {
                withCredentials: true,
            })
            .then(() => {
                mutate(false, false);
            });
    }, []);


    if (!userData) {
        return <Navigate to="/login" />;
    }


    return (
        <div id="container">
            <header id="header">
                <img src="img/home.png" alt="trillo logo" id="logo" />
                <nav id="user-nav">
                    <div id="user-nav__user">
                        <img
                            src="img/user.png"
                            alt="User photo"
                            id="user-nav__user-photo"
                        />
                        <span id="user-nav__user-name">User</span>
                        <div id="user-nav__icon-box">
                            <svg id="user-nav__icon">
                                <use xlinkHref="img/switch.svg"></use>
                            </svg>
                            <span id="user-nav__notification">Logout</span>
                        </div>
                    </div>
                </nav>
            </header>
            <div id="content">
                <LeftMenu></LeftMenu>
                <main id="mainpage">
                    <Routes>
                        <Route path="/view" element={<View />}></Route>
                        <Route path="/write" element={<Write />}></Route>
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Workspace