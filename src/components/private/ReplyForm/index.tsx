import { useState } from "react";
import { createComment } from "../../../services/api";

const ReplyForm = ({
  tweetId,
  userId,
  getPosts,
}: {
  tweetId: string;
  userId: string;
  getPosts: () => void;
}) => {
  const [comment, setComment] = useState("");

  const handleReply = async () => {
    if (comment.trim() === "") return;
    await createComment(comment, tweetId, userId);
    setComment("");
    getPosts();
  };

  return (
    <div style={{ marginTop: 10 }}>
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
