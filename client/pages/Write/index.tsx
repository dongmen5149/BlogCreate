import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import useInput from '@hooks/useInput';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import './editor.css';

const Write = () => {
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });

  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (title.trim() === '') {
        return alert('제목을 입력해주세요');
      } else if (content.trim() === '') {
        return alert('내용을 입력해주세요');
      }
      axios
        .post(
          '/api/workspaces',
          {
            title,
            content,
          },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          console.log(title);
          console.log(content);
          alert('등록완료!');
          history.back();
          mutate(response.data, false);
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [title, content],
  );

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="wirte">
      <div id="Title">
        <input type="text" id="title_txt" placeholder="제목" name="title" onChange={setTitle} />
      </div>

      <div id="Content">
        <textarea id="content_txt" placeholder="내용을 입력하세요." name="contents" onChange={setContent}></textarea>
      </div>
      <div>
        <div id="post_submit">
          <button id="submit_btn" onClick={onSubmit}>
            포스트 등록
          </button>
        </div>
      </div>
    </div>
    // <div id='mainpage__write'>
    //     <table id='write__table'>
    //         <td id='write__table__title'>
    //             <span>
    //                 제목
    //             </span>
    //             <div>
    //                 <input type='text' value={title} onChange={setTitle}>

    //                 </input>
    //             </div>
    //         </td>
    //         <tr id='write__table__content'>
    //             <CKEditor
    //                 editor={ClassicEditor}
    //                 data="<p>Hello from CKEditor 5!</p>"
    //                 onReady={(editor: any) => {
    //                     // You can store the "editor" and use when it is needed.
    //                     console.log('Editor is ready to use!', editor);
    //                 }}
    //                 onChange={(event: any, editor: any) => {
    //                     const content = editor.getData();
    //                     setContent(content)
    //                     console.log(content);
    //                 }}
    //                 onBlur={(event: any, editor: any) => {
    //                     console.log('Blur.', editor);
    //                 }}
    //                 onFocus={(event: any, editor: any) => {
    //                     console.log('Focus.', editor);
    //                 }}
    //             />
    //         </tr>

    //     </table>
    //     <div id='submitbutton'>
    //         <table>
    //             <input onClick={onSubmit} value="저장">
    //             </input>
    //         </table>
    //     </div>
    // </div>
  );
};

export default Write;
