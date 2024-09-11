import { render } from "@testing-library/react-native";

import Login from "../index";

describe("<Login />", () => {
  test("Login", () => {
    const { getByText } = render(<Login />);
    getByText("Welcome Back!");
  });
});
