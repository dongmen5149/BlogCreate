import Search from '@components/Search';
import { IWorkspace } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const List = () => {
  const user = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, //2초
  });
  const count = useSWR('/api/workspaces/count', fetcher, {
    dedupingInterval: 2000, //2초
  });

  const [data, setData] = useState<IWorkspace[]>([]);
  const [page, setPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const offset = (currentPage - 1) * limit;

  const changePage = useCallback((el) => {
    setCurrentPage(el);
    sessionStorage.setItem('currentPage', el);
  }, []);

  const pageset = useCallback(() => {
    if (sessionStorage.currentPage) {
      setCurrentPage(Number(sessionStorage.currentPage));
      return Number(sessionStorage.currentPage);
    }
    setCurrentPage(1);
    return 1;
  }, []);

  useEffect(() => {
    let page_arr = new Array();
    for (let i = 1; i <= Math.ceil(count.data / limit); i++) {
      page_arr.push(i);
    }
    setPage(page_arr);
    pageset();
  }, [count.data]);

  useEffect(() => {
    axios.get('/api/workspaces').then((response) => {
      setData(response.data);
    });
  }, []);

  // if (data != undefined) {
  // }

  return (
    <div className="List">
      <div className="list_tit">
        <div> 제목 </div>
        <div> 조회수 </div>
        <div className="acenter-date"> 날짜 </div>
      </div>

      {data
        ? data.slice(offset, offset + limit).map((el, key) => {
            const view_url = '/workspace/view/' + el.id;
            return (
              <div className="list_data" key={key}>
                <div>
                  <Link to={view_url}> {el.title}</Link>
                </div>
                <div> </div>
                <div className="acenter-date"> {el.createdAt.slice(0, 10)} </div>
              </div>
            );
          })
        : null}
      <div className="paging_div">
        <div> </div>
        <div className="paging_numdiv">
          <ul>
            {page
              ? page.map((el, key) => {
                  return el === currentPage ? (
                    <li key={key} className="page_num">
                      <b> {el} </b>
                    </li>
                  ) : (
                    <li key={key} className="page_num" onClick={() => changePage(el)}>
                      {el}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div> </div>
      </div>
    </div>

    // <div id="mainpage__view">
    //   <h2>{data.map((v: any) => v.title)}</h2>
    //   <div>{HTMLReactParser(`${data.map((v: any) => v.content)}`)}</div>
    // </div>
  );
};

export default List;
