import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewPost from "../src/components/private/NewPost/index";
import * as api from "../src/services/api";

// Mock de las funciones del módulo api
jest.mock("../src/services/api", () => ({
  getUserID: jest.fn(),
  createPost: jest.fn(),
}));

describe("NewPost", () => {
  const mockOnPostAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que el usuario puede escribir texto en el textarea
  test("permite escribir en el textarea", () => {
    render(<NewPost onPostAdded={mockOnPostAdded} username="wilson123" />);
    const textarea = screen.getByPlaceholderText("¿Qué estás pensando?");
    fireEvent.change(textarea, { target: { value: "Mi primer post" } });
    expect(textarea).toHaveValue("Mi primer post");
  });

  // Verifica que al hacer clic en el botón se crea un post correctamente
  test("crea un post al hacer clic en el botón", async () => {
    (api.getUserID as jest.Mock).mockResolvedValue("user-1");
    (api.createPost as jest.Mock).mockResolvedValue(undefined);
    render(<NewPost onPostAdded={mockOnPostAdded} username="wilson123" />);
    const textarea = screen.getByPlaceholderText("¿Qué estás pensando?");
    fireEvent.change(textarea, { target: { value: "Post de prueba" } });
    fireEvent.click(screen.getByText("Postear"));
    await waitFor(() => {
      expect(api.getUserID).toHaveBeenCalledWith("wilson123");
      expect(api.createPost).toHaveBeenCalledWith("Post de prueba", "user-1");
      expect(mockOnPostAdded).toHaveBeenCalled();
    });
  });

  // Verifica que el botón "Postear" se muestra en la interfaz
  test("muestra el botón Postear en la interfaz", () => {
    render(<NewPost onPostAdded={mockOnPostAdded} username="wilson123" />);
    const button = screen.getByText("Postear");
    expect(button).toBeInTheDocument();
  });

  // Verifica que el placeholder del textarea se muestra correctamente
  test("muestra el placeholder en el textarea", () => {
    render(<NewPost onPostAdded={mockOnPostAdded} username="wilson123" />);
    const textarea = screen.getByPlaceholderText("¿Qué estás pensando?");
    expect(textarea).toBeInTheDocument();
  });
});
