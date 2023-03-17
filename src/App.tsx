import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider";
const Posts = React.lazy(() => import("./components/posts/Posts"));
const PostDetails = React.lazy(
  () => import("./components/postDetails/PostDetails")
);

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <section className="container">
          <Routes>
            <Route
              index
              element={
                <React.Suspense fallback={<>...</>}>
                  <Posts />
                </React.Suspense>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Posts />
                </React.Suspense>
              }
            />
            <Route
              path="/:postId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <PostDetails />
                </React.Suspense>
              }
            />
          </Routes>
        </section>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
