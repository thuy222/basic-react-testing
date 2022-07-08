import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Input should be initially empty", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText(/^password$/i);
  const confirmPasswordInputElement =
    screen.getByLabelText(/^confirm password$/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("Should be able to type an email", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  userEvent.type(emailInputElement, "hongocthuy@gmail.com");

  expect(emailInputElement.value).toBe("hongocthuy@gmail.com");
});

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "password!");
  expect(passwordInputElement.value).toBe("password!");
});

test("should be able to type confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/^confirm password$/i);
  userEvent.type(confirmPasswordInputElement, "password!");
  expect(confirmPasswordInputElement.value).toBe("password!");
});

test("should show email error message on invalid email", () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/
  );

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "hongocthuy.com");

  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("Should show the password error if password is less than 5 characters", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText("Password");

  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "hongocthuy@gmail.com");
  userEvent.type(passwordInputElement, "thuy12");
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});
