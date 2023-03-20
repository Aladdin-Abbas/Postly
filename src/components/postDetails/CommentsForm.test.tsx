import { render, screen, waitFor } from "../../test-utils";
import CommentsForm from "./CommentsForm";
import Router from "react-router";
import userEvent from "@testing-library/user-event";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

describe("comments form", () => {
  test("rendering errors when trying to submit without filling the fields", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ postId: "1" });
    const setData = jest.fn();
    render(<CommentsForm setData={setData} data={null} postId={undefined} />);
    const commentButton = screen.getByRole("button");

    userEvent.click(commentButton);

    expect(
      await screen.findByText(/comment length must be more than 20 letters/i)
    ).toBeInTheDocument();

    const commentInput = screen.getByPlaceholderText("Comment");

    userEvent.type(
      commentInput,
      "Hello this is random comment which length is more than twenty letters"
    );

    await waitFor(() =>
      expect(
        screen.queryByText(/comment length must be more than 20 letters/i)
      ).not.toBeInTheDocument()
    );

    userEvent.click(commentButton);

    expect(
      await screen.findByText(/name length must be more than 5 letters/i)
    ).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText("Name");

    userEvent.type(nameInput, "Mohammed");

    await waitFor(() =>
      expect(
        screen.queryByText(/name length must be more than 5 letters/i)
      ).not.toBeInTheDocument()
    );

    userEvent.click(commentButton);

    expect(
      await screen.findByText(/Please provide a valid email/i)
    ).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");

    userEvent.type(emailInput, "random@test.com");

    await waitFor(() =>
      expect(
        screen.queryByText(/Please provide a valid email/i)
      ).not.toBeInTheDocument()
    );
  });

  test("rendering errors when providing insufficient values", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ postId: "1" });
    const setData = jest.fn();
    render(<CommentsForm setData={setData} data={null} postId={undefined} />);

    const commentInput = screen.getByPlaceholderText("Comment");

    userEvent.type(commentInput, "random comment");

    expect(
      await screen.findByText(/comment length must be more than 20 letters/i)
    ).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText("Name");

    userEvent.type(nameInput, "h");

    expect(
      await screen.findByText(/name length must be more than 5 letters/i)
    ).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");

    userEvent.type(emailInput, "bademail");

    expect(
      await screen.findByText(/Please provide a valid email/i)
    ).toBeInTheDocument();
  });
});
