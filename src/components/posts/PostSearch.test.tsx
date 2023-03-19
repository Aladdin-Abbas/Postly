import { render, screen } from "../../test-utils";
import PostSearch from "./PostSearch";

describe("post search", () => {
  test("input renders right value passed to it", () => {
    const search = "hello";
    const searchHandler = jest.fn();
    render(<PostSearch search={search} searchHandler={searchHandler} />);
    const searchInput = screen.getByDisplayValue(search);
    expect(searchInput).toBeInTheDocument();
  });
});
