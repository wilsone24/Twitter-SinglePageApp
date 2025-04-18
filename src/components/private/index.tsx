import React from "react";

interface HomepageProps {
  username: string;
  name: string;
  setToken: (token: string | null) => void;
  setUser: (user: { username: string; name: string } | null) => void;
}

const Homepage: React.FC<HomepageProps> = ({
  username,
  name,
  setToken,
  setUser,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null); // Limpiar el estado del usuario
  };

  return (
    <div>
      <h2>Bienvenido {name}</h2>
      <p>Tu usuario es: {username}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Homepage;
