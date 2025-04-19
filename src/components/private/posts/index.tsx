import { useState, useEffect } from "react";
import Post from "./post";
import Newpost from "./newpost";

const Posts = ({ username }) => {
  const [posts, setPosts] = useState([]);

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

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/tweets", {
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
      const userPosts = data.data.filter(
        (post) => post.user.username === username
      );
      setPosts(userPosts);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (tweetId, userId) => {
    const response = await fetch("http://localhost:8083/api/tweets", {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetId, userId }),
    });
    const data = await response.json();
    console.log(data);
    getPosts();
  };

  const userId = getUserID();

  return (
    <div>
      <Newpost onPostAdded={getPosts} username={username} />
      <div>
        {posts.map((post) => (
          <Post
            key={post._id}
            username={post.user.username}
            description={post.content}
            deletePost={() => deletePost(post._id, userId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
