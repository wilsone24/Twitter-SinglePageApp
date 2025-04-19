import { useState } from "react";

const ReplyForm = ({ tweetId, username, userId, getPosts }) => {
  const [comment, setComment] = useState("");

  const handleReply = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await fetch(
        "http://localhost:8083/api/tweets/comments",
        {
          method: "POST",
          headers: {
            "x-access-token": localStorage.getItem("token") ?? "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment,
            tweetId,
            userId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Comentario enviado:", data);
      setComment("");
      getPosts(); // Llama a la función para actualizar los posts
    } catch (error) {
      console.error("Error al hacer reply:", error);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={comment}
        placeholder="Escribe un comentario..."
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleReply}>Comentar</button>
    </div>
  );
};

export default ReplyForm;
