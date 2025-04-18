import React, { useState, FormEvent, ChangeEvent } from "react";
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Choose a username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter a password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirmation(e.target.value)
            }
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
};

export default Register;
