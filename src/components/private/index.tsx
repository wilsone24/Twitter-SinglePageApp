import Posts from "./Posts";

type HomepageProps = {
  username: string;
  name: string;
  setToken: (token: string | null) => void;
  setUser: (user: any) => void;
};

const Homepage = ({ username, name, setToken, setUser }: HomepageProps) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <div>
      <h2>Bienvenido {name}</h2>
      <p>Tu usuario es: {username}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <Posts username={username} />
    </div>
  );
};

export default Homepage;
