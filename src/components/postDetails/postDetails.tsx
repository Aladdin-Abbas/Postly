import React from "react";

const postDetails = () => {
  return (
    <section>
      <h3>name</h3>
      <section>
        <span>phone</span>
        <span>company</span>
      </section>

      <h2>title</h2>
      <p>body</p>

      <section>
        <form>
          <textarea name="comment" id="comment" cols={30} rows={10}></textarea>
          <input type="text" name="name" />
          <button>Comment</button>
        </form>
      </section>
    </section>
  );
};

export default postDetails;
