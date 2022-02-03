import React from "react";
import { useCallback, useState } from 'react'
import { Button, Container, Form, Text, Title } from "./styels";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


const Landing = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [viewtitle, setViewtitle] = useState([]);
    const [viewContent, setViewContent] = useState([]);

    const getTitle = useCallback((e) => {
        setTitle(e.target.value)
    }, []);

    const onsubmit = useCallback(() => {
        setViewContent(viewContent.concat());
    }, []);


    return (
        <div>
            <h1>Review</h1>
            <Container>
                <h2>제목</h2>
                <div>내용</div>
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
            <Button onClick={onsubmit}>입력
            </Button>
        </div>
    )
}

export default Landing