import React, { useState } from "react";
import Post from "./post";
import Newpost, { PostData } from "./newpost";

interface PostsProps {
  username: string;
}

const Posts: React.FC<PostsProps> = ({ username }) => {
  const [posts, setPosts] = useState<PostData[]>([]);

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <Newpost posts={posts} setPosts={setPosts} username={username}></Newpost>
      <div>
        {[...posts].reverse().map((post) => (
          <Post
            key={post.id}
            username={post.username}
            description={post.description}
            deletePost={() => deletePost(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
