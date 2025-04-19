import { useState } from "react";
import ReplyForm from "../ReplyForm";
import "./post.css";
import { toggleLike } from "../../../services/api";

type User = {
  username: string;
};

type Comment = {
  _id: string;
  user?: {
    username?: string;
  };
  comment: string;
};

type PostProps = {
  user: User;
  content: string;
  _id: string;
  comments: Comment[];
  likes: number;
  createdAt: string;
  deletePost: () => void;
  userId: string;
  getPosts: () => void;
};

const Post = ({
  user,
  content,
  _id,
  comments,
  likes: initialLikes,
  createdAt,
  deletePost,
  userId,
  getPosts,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(initialLikes);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleLike = async () => {
    try {
      const newLikeStatus = !isLiked;
      await toggleLike(_id, newLikeStatus ? 1 : 0);

      setIsLiked(newLikeStatus);
      setCurrentLikes(newLikeStatus ? currentLikes + 1 : currentLikes - 1);

      // Actualizar la lista de posts si es necesario
      getPosts();
    } catch (error) {
      console.error("Error al actualizar like:", error);
    }
  };

  return (
    <div className="post">
      <div className="postContent">
        <div className="postHeader">
          <p className="username">
            <strong>@{user.username}</strong>
          </p>
          <p className="postDate">·{formatDate(createdAt)}</p>
        </div>
        <p className="postText">{content}</p>

        <div className="postActions">
          <button
            className={`likeButton ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <img
              className="heartIcon"
              src={
                isLiked ? "src/assets/fullheart.svg" : "src/assets/heart.svg"
              }
              alt="heart like"
            />
            <span className="likesCount">{currentLikes}</span>
          </button>

          <button className="deleteButton" onClick={deletePost}>
            <img src="src/assets/trash.svg" alt="Delete" />
          </button>
        </div>

        <ReplyForm tweetId={_id} userId={userId} getPosts={getPosts} />

        {comments.length > 0 && (
          <div className="commentArea">
            <h1>Comentarios</h1>
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>
                  <strong>{comment.user?.username}</strong>
                </p>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
