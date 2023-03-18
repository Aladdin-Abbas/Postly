import React from "react";
import useCommentsForm from "../../hooks/useCommentsForm";
import { commentApiResponse } from "../../types/types";
import styles from "./Comments.module.css";

interface IProps {
  setData: React.Dispatch<React.SetStateAction<commentApiResponse[] | null>>;
  data: commentApiResponse[] | null;
  postId: string | undefined;
}

const CommentsForm = ({ setData, data, postId }: IProps) => {
  const { submitHandler, inputChangeHandler, formErrors, formData } =
    useCommentsForm({
      setData,
      data,
      postId,
    });

  return (
    <form
      onSubmit={e => {
        submitHandler(e);
      }}
    >
      <section>
        <textarea
          name="body"
          id="body"
          cols={30}
          rows={10}
          placeholder="Comment"
          value={formData.comment}
          onChange={e => inputChangeHandler(e, "comment")}
        ></textarea>
        <p className={styles.error}>{formErrors?.comment}</p>
      </section>
      <section className={styles["email-wrapper"]}>
        <section>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={e => inputChangeHandler(e, "name")}
          />
          <p className={styles.error}>{formErrors?.name}</p>
        </section>
        <section>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => inputChangeHandler(e, "email")}
          />
          <p className={styles.error}>{formErrors?.email}</p>
        </section>
        <button
          disabled={
            !!formErrors.email || !!formErrors.name || !!formErrors.comment
          }
        >
          Comment
        </button>
      </section>
    </form>
  );
};

export default CommentsForm;
