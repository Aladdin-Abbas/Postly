import { usersMockup } from "../../mocks/mockupData";
import { render, screen, waitFor } from "../../test-utils";
import PostItem from "./PostItem";

describe("post item", () => {
  test("render text correctly", () => {
    render(<PostItem id={1} userId={1} title={"hello"} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  test("links to have the right href", async () => {
    render(<PostItem id={1} userId={1} title={"hello"} />);
    const links = await screen.findAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/users/1");
    expect(links[1]).toHaveAttribute("href", "/1");
    await waitFor(() =>
      expect(links[0]).toHaveTextContent(usersMockup[0].name)
    );
  });
});
