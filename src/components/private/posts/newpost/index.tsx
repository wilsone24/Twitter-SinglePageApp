import React, { useState } from "react";

export interface PostData {
  id: number;
  username: string;
  description: string;
  deletePost?: () => void;
}

interface NewPostProps {
  posts: PostData[];
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  username: string;
}

const Newpost = ({ posts, setPosts, username }: NewPostProps) => {
  const [newDescription, setNewDescription] = useState("");

  const handleAddPost = () => {
    if (newDescription.trim() === "") return;

    const newPost: PostData = {
      id: posts.length + 1,
      username: username, // podrías hacerlo dinámico más adelante
      description: newDescription,
    };

    setPosts([...posts, newPost]);
    setNewDescription(""); // limpia el campo
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
