import {
  postsMockup,
  secondPagePosts,
  userPostsMockup,
} from "../../mocks/mockupData";
import { render, screen, waitForElementToBeRemoved } from "../../test-utils";
import Posts from "./Posts";
import Router from "react-router";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";
import { rest } from "msw";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

describe("posts", () => {
  test("render text correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
    render(<Posts />);
    expect(
      await screen.findByRole("heading", { name: /all posts/i })
    ).toBeInTheDocument();
  });

  test("render user name when provided a userId param", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "1" });
    render(<Posts />);
    expect(
      await screen.findByRole("heading", { name: /leanne graham posts/i })
    ).toBeInTheDocument();
  });

  test("render right number of list items for specific user posts", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "1" });
    render(<Posts />);
    const listItems = await screen.findAllByText(/post details/i);
    expect(listItems).toHaveLength(userPostsMockup.length);
  });

  test("render right number of list items for all posts", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
    render(<Posts />);
    const listItems = await screen.findAllByText(/post details/i);
    expect(listItems).toHaveLength(postsMockup.length);
  });

  test("render the correct search results", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
    render(<Posts />);
    const searchInput = await screen.findByRole("searchbox");
    userEvent.type(searchInput, "qui est esse");
    expect(searchInput).toHaveValue("qui est esse");
    const listItem = await screen.findByText(/post details/i);
    expect(listItem).toBeInTheDocument();
  });

  test("changing page render different results", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
    render(<Posts />);
    const secondPageItem = await screen.findByText("2");
    expect(secondPageItem).toBeInTheDocument();
    userEvent.click(secondPageItem);
    await waitForElementToBeRemoved(
      () => screen.queryAllByText(/post details/i)[4]
    );
    const listItems = await screen.findAllByText(/post details/i);

    expect(listItems).toHaveLength(secondPagePosts.length);
  });

  test("renders error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
    render(<Posts />);
    const error = await screen.findByText(
      "Something went wrong please try again later"
    );
    expect(error).toBeInTheDocument();
  });

  test("renders spinner", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts",
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        }
      )
    );
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
    render(<Posts />);
    const loadingSpinner = await screen.findByTestId("loader");
    expect(loadingSpinner).toBeInTheDocument();
  });
});
