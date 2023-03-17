import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import styles from "./postItem.module.css";

interface IProps {
  id: number;
  userId: number;
  title: string;
  setPage: React.Dispatch<React.SetStateAction<number | null>>;
}

const PostItem = ({ id, userId, title, setPage }: IProps) => {
  const ctx = useContext(UserContext);
  const user = ctx.find(user => user.id === userId);
  const navigate = useNavigate();

  return (
    <section className={styles["post-item"]}>
      <h3>
        <span
          onClick={() => {
            setPage(1);
            navigate(`/users/${userId}`);
          }}
        >{`${user?.name} temprary`}</span>
      </h3>
      <p>{title}</p>
      <span>
        <Link to={`/${id}`}>post details</Link>
      </span>
    </section>
  );
};

export default PostItem;
