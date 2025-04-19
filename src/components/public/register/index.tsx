import React, { useState, FormEvent } from "react";
import "./Register.css";

interface RegisterProps {
  onSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const register_post = async (): Promise<void> => {
    try {
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

      if (response.ok) {
        alert("¡Registro exitoso! Por favor inicia sesión.");
        onSuccess();
      } else {
        alert("Error: " + (data.message || "No se pudo completar el registro"));
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Ocurrió un error al intentar registrarse. Inténtalo más tarde.");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name || !email || !username || !password || !passwordConfirmation) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }

    register_post();
  };

  return (
    <div id="register-container">
      <h2 id="register-h2">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="register-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <input
            className="register-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <input
            className="register-input"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
          />
        </div>
        <div>
          <input
            className="register-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <div>
          <input
            className="register-input"
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirmar contraseña"
          />
        </div>
        <button type="submit" id="register-button">
          ¡Registrarse ahora!
        </button>
      </form>
      <p className="register-link">
        ¿Ya tienes una cuenta?{" "}
        <button
          id="register-button"
          onClick={(e) => {
            e.preventDefault();
            onSuccess();
          }}
        >
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

export default Register;
