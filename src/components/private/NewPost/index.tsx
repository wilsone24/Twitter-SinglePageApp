import { useState } from "react";
import { createPost, getUserID } from "../../../services/api";

type NewPostProps = {
  onPostAdded: () => void;
  username: string;
};

const NewPost = ({ onPostAdded, username }: NewPostProps) => {
  const [description, setDescription] = useState("");

  const handleAddPost = async () => {
    if (description.trim() === "") return;
    const userID = await getUserID(username);
    await createPost(description, userID);
    setDescription("");
    onPostAdded();
  };

  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escribe la descripción del post"
      />
      <button onClick={handleAddPost}>Agregar post</button>
    </div>
  );
};

export default NewPost;
