import React from "react";
interface IProps {
  pageChangeHandler: (p: number) => void;
  page: number | null;
  totalPages: number[];
}

const PostPagination = ({ totalPages, page, pageChangeHandler }: IProps) => {
  return (
    <section className="pagination">
      <ul>
        {totalPages.map((p, i) => (
          <li
            key={p}
            className={page && page - 1 === i ? "numb active" : "numb"}
            onClick={() => pageChangeHandler(p + 1)}
          >
            <span>{p + 1}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostPagination;
