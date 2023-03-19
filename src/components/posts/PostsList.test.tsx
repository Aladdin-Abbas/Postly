import { render, screen } from "../../test-utils";
import PostsList from "./PostsList";
import { postsMockup } from "../../mocks/mockupData";

describe("post list", () => {
  test("renders right number of list items", () => {
    render(<PostsList posts={postsMockup} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(postsMockup.length);
  });
});
