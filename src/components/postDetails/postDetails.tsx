import React from "react";
import Post from "./Post";
import Comments from "./Comments";

const postDetails = () => {
  return (
    <section className="post-details">
      <Post />
      <Comments />
    </section>
  );
};

export default postDetails;
