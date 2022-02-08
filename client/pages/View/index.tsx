import fetcher from '@utils/fetcher';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const View = () => {
    const user = useSWR('/api/users', fetcher, {
        dedupingInterval: 2000 //2초
    });

    const [data, setData] = useState([])
    const [viewTitle, setViewTitle] = useState([])
    const [viewContent, setViewContent] = useState([])


    useEffect(() => {
        axios.get('/api/workspaces')
            .then((response) => {
                setData(response.data);
            })
    }, []);


    return (
        <div id='mainpage__view'>
            <h2>{data.map((v: any) => v.title)}</h2>
            <div>{HTMLReactParser(`${data.map((v: any) => v.content)}`)}</div>
        </div>
    )
}

export default View;