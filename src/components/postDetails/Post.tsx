import styles from "./Post.module.css";
import usePostDetails from "../../hooks/usePostDetails";
import Loader from "../loader/Loader";

const Post = () => {
  const { data, isError, isLoading, isRefetching, user } = usePostDetails();

  let content;

  if (isLoading || isRefetching) {
    content = <Loader />;
  }

  if (isError) {
    content = <p>Something went wrong please try again later</p>;
  }

  if (data) {
    content = (
      <section className={styles.post}>
        <h3>{user?.name}</h3>
        <section>
          <span>{user?.phone}</span>
          <span>{user?.company.name}</span>
        </section>

        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </section>
    );
  }

  return <>{content}</>;
};

export default Post;
