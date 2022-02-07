import React, { useEffect } from "react";
import { useCallback, useState } from 'react'
import { Button, Container, Form, Header, Text, Title } from "./styels";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './editor.css'
import axios from "axios";
import fetcher from "@utils/fetcher";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import useInput from "@hooks/useInput";
import { IUser } from "@typings/db";
import { Navigate } from "react-router";
import HTMLReactParser from "html-react-parser";
import 'antd/dist/antd.css';
import LeftMenu from "@layouts/Navbar/LeftMenu";

const Workspace = () => {
    const user = useSWR('/api/users', fetcher, {
        dedupingInterval: 2000 //2초
    });

    const [menubar, setMenubar] = useState(false);
    const [title, setTitle] = useInput('')
    const [content, setContent] = useState('')
    const [data, setData] = useState([])
    const [viewTitle, setViewTitle] = useState([])
    const [viewContent, setViewContent] = useState([])

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


    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            axios
                .post(
                    '/api/workspaces',
                    {
                        title, content
                    },
                    {
                        withCredentials: true,
                    },
                )
                .then((response) => {
                    console.log(title);
                    console.log(content);
                    alert('등록완료!')
                    mutate(response.data, false);
                })
                .catch((error) => {
                    console.dir(error);
                    toast.error(error.response?.data, { position: 'bottom-center' });
                });
        },
        [title, content],
    );

    useEffect(() => {
        axios.get('/api/workspaces')
            .then((response) => {
                setData(response.data);
            })
    }, []);

    const onCollapse = useCallback((menubar: boolean) => {
        setMenubar(menubar)
    }, []);




    if (!userData) {
        return <Navigate to="/login" />;
    }


    return (
        <div>
            <Header></Header>
            <LeftMenu></LeftMenu>
            <Container>
                <h2>{data.map((v: any) => v.title)}</h2>
                <div>{HTMLReactParser(`${data.map((v: any) => v.content)}`)}</div>
            </Container>
            <Form>
                <Title type='text' placeholder="제목" value={title} onChange={setTitle} />
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event: any, editor: any) => {
                        const content = editor.getData();
                        setContent(content)
                        console.log(content);
                    }}
                    onBlur={(event: any, editor: any) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event: any, editor: any) => {
                        console.log('Focus.', editor);
                    }}
                />

            </Form>
            <Button onClick={onSubmit}>입력
            </Button>
        </div>
    )
}

export default Workspace