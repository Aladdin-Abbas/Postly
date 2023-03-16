import PostsList from "./PostsList";
import PostSearch from "./PostSearch";
import PostPagination from "./PostPagination";
import usePosts from "../../hooks/usePosts";

const Posts = () => {
  const {
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
  } = usePosts();

  let content;

  if (isError) {
    content = <p>Something went wrong please try again later</p>;
  }

  if (isLoading || isRefetching) {
    content = <p>Loading...</p>;
  }

  if (data.length > 0) {
    content = (
      <>
        <PostSearch search={search} searchHandler={searchHandler} />
        <PostsList posts={data} setPage={setPage} />
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
    // <section className="container">
    <>
      <h1>{userId ? `${user?.name} posts` : "All posts"}</h1>
      {content}
    </>
    // </section>
  );
};

export default Posts;
