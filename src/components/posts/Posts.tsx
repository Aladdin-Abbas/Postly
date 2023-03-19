import PostsList from "./PostsList";
import PostSearch from "./PostSearch";
import PostPagination from "./PostPagination";
import usePosts from "../../hooks/usePosts";
import Loader from "../loader/Loader";

const Posts = () => {
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    page,
    search,
    totalPages,
    pageChangeHandler,
    searchHandler,
    user,
    userId,
  } = usePosts();

  let content;

  if (isError) {
    content = <p>Something went wrong please try again later</p>;
  }

  if (isLoading || isRefetching) {
    content = <Loader />;
  }

  if (data.length > 0) {
    content = (
      <>
        <PostSearch search={search} searchHandler={searchHandler} />
        <PostsList posts={data} />
        {!userId && !search && (
          <PostPagination
            page={page}
            pageChangeHandler={pageChangeHandler}
            totalPages={totalPages}
          />
        )}
      </>
    );
  }

  return (
    <>
      <h1>{userId ? `${user?.name} posts` : "All posts"}</h1>
      {content}
    </>
  );
};

export default Posts;
