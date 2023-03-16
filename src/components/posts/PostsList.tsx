import PostItem from "./PostItem";
import { postsApiReponse } from "../../types/types";

interface IProps {
  posts: postsApiReponse[];
  setPage: React.Dispatch<React.SetStateAction<number | null>>;
}

const PostsList = ({ posts, setPage }: IProps) => {
  return (
    <ul className=" post-list">
      {posts.map(post => {
        const { id, userId, title } = post;
        return (
          <PostItem
            id={id}
            userId={userId}
            title={title}
            key={id}
            setPage={setPage}
          />
        );
      })}
    </ul>
  );
};

export default PostsList;
