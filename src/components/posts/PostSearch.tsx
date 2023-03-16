import React from "react";
interface IProps {
  search: string;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostSearch = ({ search, searchHandler }: IProps) => {
  return (
    <form className="nosubmit">
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
