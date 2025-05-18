import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/components/public/login";

describe("Login component", () => {
  const mockSetToken = jest.fn();
  const mockSetUser = jest.fn();
  const mockOnSwitchToRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que los inputs de username y password, y los botones estén presentes en el renderizado inicial
  test("renderiza inputs y botones correctamente", () => {
    render(
      <Login
        setToken={mockSetToken}
        setUser={mockSetUser}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  // Verifica que se pueda escribir texto en los inputs de username y password
  test("permite escribir en los inputs username y password", () => {
    render(
      <Login
        setToken={mockSetToken}
        setUser={mockSetUser}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(usernameInput, { target: { value: "usuario1" } });
    fireEvent.change(passwordInput, { target: { value: "contraseña1" } });
    expect(usernameInput).toHaveValue("usuario1");
    expect(passwordInput).toHaveValue("contraseña1");
  });
});
