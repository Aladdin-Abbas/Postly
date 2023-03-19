import { rest } from "msw";
import {
  usersMockup,
  postsMockup,
  userPostsMockup,
  secondPagePosts,
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

  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersMockup));
  }),
];
