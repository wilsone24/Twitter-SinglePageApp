import React from "react";

interface HomepageProps {
  username: string;
  name: string;
}

const Homepage: React.FC<HomepageProps> = ({ username, name }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // recargar para volver a login
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
