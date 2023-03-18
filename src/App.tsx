import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/loader/Loader";
import SharedLayout from "./components/sharedLayout/SharedLayout";
import UserContextProvider from "./context/UserContextProvider";
const Posts = React.lazy(() => import("./components/posts/Posts"));
const PostDetails = React.lazy(
  () => import("./components/postDetails/PostDetails")
);

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Loader />
                    </>
                  }
                >
                  <Posts />
                </React.Suspense>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Loader />
                    </>
                  }
                >
                  <Posts />
                </React.Suspense>
              }
            />
            <Route
              path="/:postId"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Loader />
                    </>
                  }
                >
                  <PostDetails />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
