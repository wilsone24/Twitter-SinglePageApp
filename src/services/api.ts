// @ts-nocheck

const API_BASE = "http://localhost:8083/api";

export const getUserID = async (username: string) => {
  const res = await fetch(`${API_BASE}/users`, {
    headers: {
      "x-access-token": localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (!res.ok) throw new Error("Error obteniendo usuarios");
  const data = await res.json();
  const user = data.data.find((u) => u.username === username);
  return user?._id;
};

export const getAllPosts = async () => {
  const res = await fetch(`${API_BASE}/tweets`, {
    headers: {
      "x-access-token": localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error obteniendo posts");
  const data = await res.json();
  return data.data;
};

export const createPost = async (content: string, userID: string) => {
  const res = await fetch(`${API_BASE}/tweets`, {
    method: "POST",
    headers: {
      "x-access-token": localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, userID }),
  });
  return await res.json();
};

export const deletePost = async (tweetId: string, userId: string) => {
  const res = await fetch(`${API_BASE}/tweets`, {
    method: "DELETE",
    headers: {
      "x-access-token": localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tweetId, userId }),
  });
  return await res.json();
};

export const createComment = async (
  comment: string,
  tweetId: string,
  userId: string
) => {
  const res = await fetch(`${API_BASE}/tweets/comments`, {
    method: "POST",
    headers: {
      "x-access-token": localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment, tweetId, userId }),
  });
  return await res.json();
};

export const toggleLike = async (tweetId: string, like: number) => {
  const res = await fetch(`${API_BASE}/tweets/likes`, {
    method: "POST",
    headers: {
      "x-access-token": localStorage.getItem("token") ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tweetId, like }),
  });
  if (!res.ok) throw new Error("Error al actualizar like");
  return await res.json();
};
