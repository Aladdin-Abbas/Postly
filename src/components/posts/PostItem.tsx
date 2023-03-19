import "../../index.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import styles from "./postItem.module.css";

interface IProps {
  id: number;
  userId: number;
  title: string;
}

const PostItem = ({ id, userId, title }: IProps) => {
  const ctx = useContext(UserContext);
  const user = ctx.find(user => user.id === userId);

  return (
    <li className={styles["post-item"]}>
      <h3>
        <Link to={`/users/${userId}`}>{user?.name}</Link>
      </h3>
      <p>{title}</p>
      <span>
        <Link to={`/${id}`}>post details</Link>
      </span>
    </li>
  );
};

export default PostItem;
