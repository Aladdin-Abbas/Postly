import { render, screen, waitFor } from "../../test-utils";
import Comments from "./Comments";
import Router from "react-router";
import { commentsMockup } from "../../mocks/mockupData";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

describe("comments", () => {
  test("renders post comments", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ postId: "1" });

    render(<Comments />);

    const listItems = await screen.findAllByRole("listitem");

    await waitFor(() => expect(listItems).toHaveLength(commentsMockup.length));
  });
});
