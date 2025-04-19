import ReplyForm from "../replyform"; // 👈 Importa este componente

const Post = ({
  username,
  description,
  deletePost,
  postId,
  userId,
  comments,
  getPosts,
}) => {
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

      <ReplyForm
        tweetId={postId}
        username={username}
        userId={userId}
        getPosts={getPosts}
      />
      <div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>{username}</strong>
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
