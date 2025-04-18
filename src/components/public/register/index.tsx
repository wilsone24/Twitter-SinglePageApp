import React, { useState } from "react";
import "./Register.css";

interface RegisterProps {
  onSuccess: () => void;
}

function Register({ onSuccess }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const register_post = async () => {
    const response = await fetch("http://localhost:8083/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
        passwordConfirmation,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("¡Registro exitoso! Por favor inicia sesión.");
      onSuccess();
    } else {
      alert("Error: " + (data.message || "No se pudo completar el registro"));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !username || !password || !passwordConfirmation) {
      alert("Por favor completa todos los campos");
      return;
    } else if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    register_post();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Repeat your password"
          />
        </div>
        <button type="submit">Register Now!</button>
      </form>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSuccess();
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
}

export default Register;
