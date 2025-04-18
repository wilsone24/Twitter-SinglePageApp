import { useState, useEffect } from "react";
import Post from "./post";
import Newpost from "./newpost";

const Posts = ({ username }) => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <Newpost onPostAdded={getPosts} />
      <div>
        {[...posts].map((post) => (
          <Post
            key={post._id}
            username={post.user.username}
            description={post.content}
            deletePost={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
