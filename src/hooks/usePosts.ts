import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postApi from "../apis/postApi";
import { UserContext } from "../context/UserContextProvider";
import { postsApiReponse } from "../types/types";
const pageLimit = 20;

const usePosts = () => {
  const [data, setData] = useState<postsApiReponse[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

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

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await postApi.get("/posts", {
          params: { userId, _page: page, _limit: pageLimit, q: search },
          signal: controller.signal,
        });
        const json = (await response.data) as postsApiReponse[];

        setData(json);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    fetchData();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, page, search]);

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
