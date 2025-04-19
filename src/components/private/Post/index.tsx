import ReplyForm from "../ReplyForm";

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
  deletePost: () => void;
  userId: string;
  getPosts: () => void;
};

const Post = ({
  user,
  content,
  _id,
  comments,
  deletePost,
  userId,
  getPosts,
}: PostProps) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <p>
        <strong>{user.username}</strong>
      </p>
      <p>{content}</p>
      <button style={{ backgroundColor: "red" }} onClick={deletePost}>
        Eliminar Post
      </button>
      <ReplyForm tweetId={_id} userId={userId} getPosts={getPosts} />
      {comments.map((comment) => (
        <div
          key={comment._id}
          style={{ borderTop: "1px solid #eee", marginTop: 10 }}
        >
          <p>
            <strong>{comment.user?.username}</strong>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
