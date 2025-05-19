import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReplyForm from "../src/components/private/ReplyForm";
import * as api from "../src/services/api";

// Mock de createComment
jest.mock("../src/services/api", () => ({
  createComment: jest.fn(),
}));

describe("ReplyForm", () => {
  const mockGetPosts = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que se puede escribir en el input
  test("permite escribir en el input de comentario", () => {
    render(<ReplyForm tweetId="123" userId="user-1" getPosts={mockGetPosts} />);
    const input = screen.getByPlaceholderText("Escribe un comentario...");
    fireEvent.change(input, { target: { value: "Este es un comentario" } });
    expect(input).toHaveValue("Este es un comentario");
  });

  // Verifica que se llama a createComment y getPosts al comentar correctamente
  test("llama a createComment y getPosts al hacer clic en 'Comentar'", async () => {
    (api.createComment as jest.Mock).mockResolvedValue(undefined);
    render(<ReplyForm tweetId="123" userId="user-1" getPosts={mockGetPosts} />);
    const input = screen.getByPlaceholderText("Escribe un comentario...");
    const button = screen.getByText("Comentar");
    fireEvent.change(input, { target: { value: "Comentario de prueba" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(api.createComment).toHaveBeenCalledWith(
        "Comentario de prueba",
        "123",
        "user-1"
      );
      expect(mockGetPosts).toHaveBeenCalled();
    });
  });

  // Verifica que el botón "Comentar" esté en la interfaz
  test("muestra el botón Comentar en pantalla", () => {
    render(<ReplyForm tweetId="123" userId="user-1" getPosts={mockGetPosts} />);
    const button = screen.getByText("Comentar");
    expect(button).toBeInTheDocument();
  });

  // Verifica que el input este limpio luego de enviar un comentario
  test("limpia el input después de enviar un comentario exitosamente", async () => {
    (api.createComment as jest.Mock).mockResolvedValue(undefined);
    render(<ReplyForm tweetId="123" userId="user-1" getPosts={mockGetPosts} />);
    const input = screen.getByPlaceholderText("Escribe un comentario...");
    const button = screen.getByText("Comentar");
    fireEvent.change(input, {
      target: { value: "Comentario para limpiar input" },
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(api.createComment).toHaveBeenCalled();
      expect(input).toHaveValue(""); // Aquí verificamos que el input esté vacío
    });
  });
});
