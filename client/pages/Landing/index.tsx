import React, { useCallback, useState } from "react";
import { Button, Container, Form, Text, Title } from "./styels";



const Landing = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onSubmit = useCallback(() => {
        console.log("ㅎㅎ");
    }, []);



    return (
        <div>
            <h1>Review</h1>
            <Container>
                <h2>제목</h2>
                <div>내용</div>
            </Container>
            <Form>
                <Title>
                    <Text>

                    </Text>
                </Title>
            </Form>
            <Button onClick={onSubmit}>입력
            </Button>
        </div>
    )
}

export default Landing