import { rest } from "msw";
import {
  usersMockup,
  postsMockup,
  userPostsMockup,
  secondPagePosts,
  commentsMockup,
  postDetailsMockup,
} from "./mockupData";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    const userId = req.url.searchParams.get("userId");
    const q = req.url.searchParams.get("q");
    const p = req.url.searchParams.get("_page");

    let response;
    if (userId) {
      response = userPostsMockup;
    } else {
      response = Number(p) === 2 ? secondPagePosts : postsMockup;
    }

    if (q) response = response.filter(post => post.title.includes(q));
    return res(ctx.status(200), ctx.json(response));
  }),

  rest.get(
    "https://jsonplaceholder.typicode.com/posts/1/comments",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(commentsMockup));
    }
  ),

  rest.get("https://jsonplaceholder.typicode.com/posts/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postDetailsMockup));
  }),

  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersMockup));
  }),

  rest.post(
    "https://jsonplaceholder.typicode.com/posts/1/comments",
    (req, res, context) => {
      return res(context.status(201), context.json({ status: 200 }));
    }
  ),
];
