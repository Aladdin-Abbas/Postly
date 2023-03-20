import { render, screen } from "../../test-utils";
import Post from "./Post";
import Router from "react-router";
import { postDetailsMockup } from "../../mocks/mockupData";
import { server } from "../../mocks/server";
import { rest } from "msw";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

describe("Post", () => {
  test("renders post data", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ postId: "1" });

    render(<Post />);

    expect(
      await screen.findByText(postDetailsMockup.title)
    ).toBeInTheDocument();
  });

  test("renders error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    jest.spyOn(Router, "useParams").mockReturnValue({ postId: "1" });
    render(<Post />);
    const error = await screen.findByText(
      "Something went wrong please try again later"
    );
    expect(error).toBeInTheDocument();
  });

  test("renders spinner", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        }
      )
    );
    jest.spyOn(Router, "useParams").mockReturnValue({ postId: "1" });
    render(<Post />);
    const loadingSpinner = await screen.findByTestId("loader");
    expect(loadingSpinner).toBeInTheDocument();
  });
});
