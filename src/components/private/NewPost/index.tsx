import { useState } from "react";
import { createPost, getUserID } from "../../../services/api";
import "./newpost.css";

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
    <div className="newPost">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="¿Qué estás pensando?"
      ></textarea>
      <button onClick={handleAddPost}>Postear</button>
    </div>
  );
};

export default NewPost;
