import React, { FC } from "react";
import { useCallback, useState } from 'react'
import { Button, Container, Form, Text, Title } from "./styels";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './editor.css'
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const Landing: React.FC<{ history: any }> = (props) => {
    const user = useSWR('/api/users', fetcher, {
        dedupingInterval: 2000 //2초
    });

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [viewtitle, setViewTitle] = useState('')
    const [viewcontent, setViewContent] = useState('')

    const getTitle = useCallback((e) => {
        setTitle(e.target.value)
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!title && content) {
                axios
                    .post('/api/contents', {
                        writer: user.data.id,
                        title,
                        content,
                    })
                    .then((response) => {
                        alert('video Uploaded Successfully')
                        setTimeout(() => {
                            props.history.push('/')
                        }, 2000);
                    })
                    .catch((error) => {
                        console.log(error.response);
                    })
                    .finally(() => { });
            }
        },
        [title, content],
    );



    return (
        <div>
            <h1>Review</h1>
            <Container>
                <h2>{ }</h2>
                <div>{ }</div>
            </Container>
            <Form>
                <Title type='text' placeholder="제목" onChange={getTitle} />
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

export default Landing