import { postsMockup, userPostsMockup } from "../../mocks/mockupData";
import { render, screen } from "../../test-utils";
import Posts from "./Posts";
import Router from "react-router";
import userEvent from "@testing-library/user-event";

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

  //   test("changing page render different results", async () => {
  //     jest.spyOn(Router, "useParams").mockReturnValue({ userId: "" });
  //     render(<Posts />);
  //     const secondPageItem = await screen.findByText("2");
  //     expect(secondPageItem).toBeInTheDocument();
  //     userEvent.click(secondPageItem);
  //     await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
  //     const listItems = await waitFor(() =>
  //       screen.findAllByText(/post details/i)
  //     );
  //     expect(listItems).toHaveLength(secondPagePosts.length);
  //   });
});
