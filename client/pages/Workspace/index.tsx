import React, { useEffect } from "react";
import { useCallback, useState } from 'react'
import { Button, Container, Form, Text, Title } from "./styels";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './editor.css'
import axios from "axios";
import fetcher from "@utils/fetcher";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import useInput from "@hooks/useInput";
import { IUser, IWorkspace } from "@typings/db";
import { Navigate } from "react-router";

const Workspace = () => {
    const user = useSWR('/api/users', fetcher, {
        dedupingInterval: 2000 //2초
    });

    const [title, setTitle] = useInput('')
    const [content, setContent] = useState('')
    const [viewTitle, setViewTitle] = useInput('')
    const [viewContent, setViewContent] = useState('')

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
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setViewTitle(response.data.title)
                    setViewContent(response.data.content)
                } else {
                    alert('Failed to get Reivew')
                }
            })
    }, [])


    if (!userData) {
        return <Navigate to="/login" />;
    }


    return (
        <div>
            <h1>Review</h1>
            <Container>
                <h2>{viewTitle}</h2>
                <div>{viewContent}</div>
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