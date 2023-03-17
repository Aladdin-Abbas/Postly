import React from "react";
import styles from "./postSearch.module.css";
interface IProps {
  search: string;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostSearch = ({ search, searchHandler }: IProps) => {
  return (
    <form className={`nosubmit ${styles["search-form"]}`}>
      <input
        className="nosubmit"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={e => {
          searchHandler(e);
        }}
      />
    </form>
  );
};

export default PostSearch;
