import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/components/public/login";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";

// Crear una instancia falsa de GrowthBook con la feature activa por defecto
const gb = new GrowthBook({
  features: {
    "show-new-button": { defaultValue: true },
  },
});

describe("Login component", () => {
  const mockSetToken = jest.fn();
  const mockSetUser = jest.fn();
  const mockSwitch = jest.fn();

  const renderWithProvider = () =>
    render(
      <GrowthBookProvider growthbook={gb}>
        <Login
          setToken={mockSetToken}
          setUser={mockSetUser}
          onSwitchToRegister={mockSwitch}
        />
      </GrowthBookProvider>
    );

  test("renderiza inputs y botones correctamente", () => {
    renderWithProvider();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
    expect(screen.getByText("Feature Flag Activo")).toBeInTheDocument(); // de MyComponent
  });

  test("permite escribir en los inputs username y password", () => {
    renderWithProvider();

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });

    expect(usernameInput).toHaveValue("user");
    expect(passwordInput).toHaveValue("pass");
  });
});
