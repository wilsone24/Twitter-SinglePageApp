import React from "react";

export interface PostProps {
  username: string;
  description: string;
  deletePost: () => void;
}

const Post: React.FC<PostProps> = ({ username, description, deletePost }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>
        <strong>{username}</strong>
      </p>
      <p>{description}</p>
      <button
        type="button"
        onClick={deletePost}
        style={{
          backgroundColor: "red",
        }}
      >
        Eliminar Post
      </button>
    </div>
  );
};

export default Post;
