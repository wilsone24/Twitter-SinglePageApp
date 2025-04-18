import React, { useState } from "react";

interface LoginProps {
  setToken: (token: string | null) => void;
  setUser: (user: { username: string; name: string } | null) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({
  setToken,
  setUser,
  onSwitchToRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(false);

    try {
      // 1. Hacer la petición HTTP
      const response = await fetch("http://localhost:8083/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // 2. Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      // 3. Procesar los datos JSON
      const data = await response.json();

      // 4. Validar credenciales
      if (data.message === "user not exists") {
        throw new Error("Credenciales inválidas");
      }

      // 5. Guardar datos y actualizar estado
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
    } catch (error) {
      console.error("Error en login:", error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <br />
      {loginError && (
        <p style={{ color: "red" }}>Usuario o contraseña incorrectos</p>
      )}
      <br />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Iniciar sesión"}
      </button>
      <br />
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSwitchToRegister();
        }}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Registrarse
      </a>
    </div>
  );
};

export default Login;
