import React from "react";
import styles from "./postPagination.module.css";
interface IProps {
  pageChangeHandler: (p: number) => void;
  page: number | null;
  totalPages: number[];
}

const PostPagination = ({ totalPages, page, pageChangeHandler }: IProps) => {
  return (
    <section className={styles.pagination}>
      <ul>
        {totalPages.map((p, i) => (
          <li
            key={p}
            className={
              page && page - 1 === i
                ? `${styles.numb} ${styles.active}`
                : styles.numb
            }
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
