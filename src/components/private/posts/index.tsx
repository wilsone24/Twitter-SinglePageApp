import { useState, useEffect } from "react";
import Post from "../Post";
import NewPost from "../NewPost";
import { getAllPosts, deletePost, getUserID } from "../../../services/api";

const Posts = ({ username }: { username: string }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchPosts = async () => {
    const allPosts = await getAllPosts();
    const userPosts = allPosts.filter((p) => p.user.username === username);
    setPosts(userPosts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await getUserID(username);
      setUserId(id);
      await fetchPosts();
    };
    fetchData();
  }, []);

  const handleDelete = async (postId: string) => {
    await deletePost(postId, userId);
    fetchPosts();
  };

  return (
    <div>
      <NewPost onPostAdded={fetchPosts} username={username} />
      {posts.map((post) => (
        <Post
          key={post._id}
          {...post}
          userId={userId}
          deletePost={() => handleDelete(post._id)}
          getPosts={fetchPosts}
        />
      ))}
    </div>
  );
};

export default Posts;
