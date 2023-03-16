import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./components/posts/Posts";
import UserContextProvider from "./context/UserContextProvider";
import postDetails from "./components/postDetails/postDetails";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <section className="container">
          <Routes>
            <Route path="/" Component={Posts} />
            <Route path="/users/:userId" Component={Posts} />
            <Route path="/:postId" Component={postDetails} />
          </Routes>
        </section>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
