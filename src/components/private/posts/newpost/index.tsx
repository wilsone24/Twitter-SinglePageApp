import { useState } from "react";

const Newpost = ({ onPostAdded, username }) => {
  const [newDescription, setNewDescription] = useState("");

  const getUserID = async () => {
    const response = await fetch("http://localhost:8083/api/users", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    const miUsuario = data.data.find((user) => user.username === username);
    return miUsuario._id;
  };

  const savePost = async (content, userID) => {
    const response = await fetch("http://localhost:8083/api/tweets", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        userID: userID,
      }),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
  };

  const handleAddPost = async () => {
    if (newDescription.trim() === "") return;

    try {
      const userID = await getUserID();
      await savePost(newDescription, userID);
      setNewDescription("");

      // Llamamos a la función que viene del padre
      if (onPostAdded) {
        onPostAdded();
      }
    } catch (error) {
      console.error("Error al agregar el post:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Escribe la descripción del post"
      />
      <button onClick={handleAddPost}>Agregar post</button>
    </div>
  );
};

export default Newpost;
