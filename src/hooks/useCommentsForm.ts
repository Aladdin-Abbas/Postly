import React, { useState } from "react";
import postApi from "../apis/postApi";
import { commentApiResponse } from "../types/types";

interface IProps {
  setData: React.Dispatch<React.SetStateAction<commentApiResponse[] | null>>;
  data: commentApiResponse[] | null;
  postId: string | undefined;
}

const useCommentsForm = ({ data, setData, postId }: IProps) => {
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

  return {
    submitHandler,
    inputChangeHandler,
    formErrors,
    formData,
  };
};

export default useCommentsForm;
