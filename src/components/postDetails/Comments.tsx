import { useParams } from "react-router-dom";
import styles from "./Comments.module.css";
import { commentApiResponse } from "../../types/types";
import useInitialFetch from "../../hooks/useFetch";
import { useState } from "react";
import postApi from "../../apis/postApi";

const Comments = () => {
  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    comment: "",
    name: "",
    email: "",
  });
  const { postId } = useParams();

  const { data, setData, isError, isLoading, isRefetching } = useInitialFetch<
    commentApiResponse[]
  >([], `/posts/${postId}/comments`, [postId]);

  const minimumLengthValidator = (name: string, length: number) => {
    if (formData[name as keyof typeof formData].trim().length < length) {
      setFormErrors(prevState => ({
        ...prevState,
        [name]: `${name} length must be more than ${length} letters`,
      }));
      return false;
    }
    setFormErrors(prevState => ({
      ...prevState,
      [name]: "",
    }));
    return true;
  };

  const emailValidator = () => {
    const filter =
      /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(formData.email)) {
      setFormErrors(prevState => ({
        ...prevState,
        email: "Please provide a valid email",
      }));
      return false;
    }
    setFormErrors(prevState => ({
      ...prevState,
      email: "",
    }));
    return true;
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }));
    switch (name) {
      case "comment":
        minimumLengthValidator(name, 20);
        break;
      case "name":
        minimumLengthValidator(name, 5);
        break;
      case "email":
        emailValidator();
        break;
    }
  };

  const maxIdFinder = () => {
    const maxId = data
      ?.map(comment => comment.id)
      .reduce((acc, curr) => {
        if (acc > curr) {
          return acc;
        }
        return curr;
      });
    return maxId || 0;
  };

  const postComment = async () => {
    const commentData = {
      postId: Number(postId),
      name: formData.name,
      email: formData.email,
      body: formData.comment,
    };
    try {
      await postApi.post(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        commentData
      );

      console.log(maxIdFinder());
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return [{ ...commentData, id: maxIdFinder() + 1 }, ...prevData];
        } else {
          return [{ ...commentData, id: maxIdFinder() + 1 }];
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const clearFormFields = () => {
    setFormData({
      comment: "",
      name: "",
      email: "",
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formData });
    if (
      !minimumLengthValidator("comment", 20) ||
      !minimumLengthValidator("name", 5) ||
      !emailValidator()
    )
      return;
    await postComment();
    clearFormFields();
  };

  let content;

  if (isError) {
    content = <p>Something went wrong please try again later</p>;
  }

  if (isLoading || isRefetching) {
    content = <p>Loading...</p>;
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
      <ul>{content}</ul>
    </section>
  );
};

export default Comments;
