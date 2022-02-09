import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { mutate } from 'swr';

const Search = () => {
  const [changSearch, setChangSearch] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          '/api/workspaces/search',
          {
            changSearch,
          },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          console.log(changSearch);
          mutate(response.data, false);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    [changSearch],
  );

  return (
    <div>
      <form>
        <input
          type="text"
          maxLength={20}
          className="search_input"
          placeholder="검색어를 입력해주세요."
          onChange={setChangSearch}
        />
        <input type="submit" value="검색" className="serach_submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Search;
