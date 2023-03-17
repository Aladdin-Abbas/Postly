import { useContext } from "react";
import { useParams } from "react-router-dom";
// import postApi from "../apis/postApi";
import { UserContext } from "../context/UserContextProvider";
import { postsApiReponse } from "../types/types";
import useInitialFetch from "./useFetch";

const usePostDetails = () => {
  const { postId } = useParams();
  const { data, isError, isLoading, isRefetching } =
    useInitialFetch<postsApiReponse>(null, `/posts/${postId}`, [postId]);

  const ctx = useContext(UserContext);
  const user = ctx.find(user => user.id === Number(data?.userId));

  return {
    data,
    isError,
    isLoading,
    isRefetching,
    user,
  };
};

export default usePostDetails;
