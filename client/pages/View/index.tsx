import { IWorkspace } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR, { mutate } from 'swr';

const View = () => {
  const [viewData, setViewData] = useState<IWorkspace>();
  const viewId = useParams().data;

  useEffect(() => {
    axios.get(`/api/workspaces/view/${viewId}`).then((response) => {
      setViewData(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .post(
        '/api/workspaces/update/viewcnt',
        {},
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        mutate(response.data, false);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, []);

  console.log(viewData);

  return (
    <div className="write">
      {viewData ? (
        <div>
          <div className="top_title">
            <input type="text" id="view_title_txt" name="title" defaultValue={viewData.title} readOnly />
          </div>
          <div className="date_div">{viewData.createdAt}</div>
          <div>
            <textarea id="view_content_txt" name="contents" defaultValue={viewData.content} readOnly></textarea>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default View;
