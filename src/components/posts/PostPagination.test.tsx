import { render, screen } from "../../test-utils";
import PostPagination from "./PostPagination";

describe("post pagination", () => {
  test("render the right number of list items", () => {
    const totalPages = [1, 2, 3, 4, 5];
    const pageChangeHandler = jest.fn();
    render(
      <PostPagination
        pageChangeHandler={pageChangeHandler}
        page={1}
        totalPages={totalPages}
      />
    );
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(totalPages.length);
  });

  test("the right page number is active", async () => {
    const totalPages = [1, 2, 3, 4, 5];
    const pageChangeHandler = jest.fn();
    const page = 2;
    render(
      <PostPagination
        pageChangeHandler={pageChangeHandler}
        page={page}
        totalPages={totalPages}
      />
    );

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems[page - 1].className).toMatch(/active/i);
  });
});
