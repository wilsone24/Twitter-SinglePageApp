import React, { useState } from "react";

interface LoginProps {
  setToken: (token: string) => void;
  setUser: (user: { username: string; name: string }) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    fetch("http://0.0.0.0:8083/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "user not exists") {
          setLoginError(true);
        } else {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.data.username,
              name: data.data.name,
            })
          );
          setToken(data.data.token);
          setUser({ username: data.data.username, name: data.data.name });
          setLoginError(false);
        }
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {loginError && (
        <p style={{ color: "red" }}>Usuario o contraseña incorrectos</p>
      )}
      <br />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
