import { useParams } from "react-router-dom";
import styles from "./Comments.module.css";
import { commentApiResponse } from "../../types/types";
import useInitialFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import CommentsForm from "./CommentsForm";

const Comments = () => {
  const { postId } = useParams();

  const { data, setData, isError, isLoading, isRefetching } = useInitialFetch<
    commentApiResponse[]
  >([], `/posts/${postId}/comments`, [postId]);

  let content;

  if (isError) {
    content = <p>Something went wrong please try again later</p>;
  }

  if (isLoading || isRefetching) {
    content = <Loader />;
  }

  if (data?.length) {
    content = data.map(comment => {
      const { name, id, body, email } = comment;
      return (
        <li key={id} id={id.toString()} className={styles["comment-item"]}>
          <h4>{name}</h4>
          <h5>{email}</h5>
          <p>{body}</p>
        </li>
      );
    });
  }

  return (
    <section className={styles.comments}>
      <CommentsForm setData={setData} data={data} postId={postId} />
      <ul>{content}</ul>
    </section>
  );
};

export default Comments;
