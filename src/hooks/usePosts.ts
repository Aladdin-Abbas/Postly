import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { postsApiReponse } from "../types/types";
import useInitialFetch from "./useFetch";
const pageLimit = 20;

const usePosts = () => {
  const { userId } = useParams();

  const [page, setPage] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  // 100 is the total number of posts according the the api documentation
  const totalPages = Array.from(Array(100 / pageLimit).keys());

  const ctx = useContext(UserContext);
  const user = ctx.find(user => user.id === Number(userId));

  const pageChangeHandler = (p: number) => {
    setPage(p);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    e.target.value ? setPage(null) : setPage(1);
  };

  useEffect(() => {
    if (userId) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const { data, isError, isLoading, isRefetching } = useInitialFetch<
    postsApiReponse[]
  >([], "/posts", [userId, page, search], {
    userId,
    _page: page,
    _limit: pageLimit,
    q: search,
  });

  return {
    data,
    isError,
    isLoading,
    isRefetching,
    page,
    setPage,
    search,
    totalPages,
    pageChangeHandler,
    searchHandler,
    user,
    userId,
  };
};

export default usePosts;
