import Posts from "./posts";
import "./homepage.css";
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
    <div className="container">
      <section className="homepage">
        <header className="homepageHeader">
          <h2>{name}</h2>
          <p>@{username}</p>
          <button
            onClick={() => {
              throw new Error("This is your first error!");
            }}
          >
            Break the world
          </button>
          <button onClick={handleLogout}>
            <img src="src/assets/logout.svg" alt="logut" />
          </button>
        </header>
        <Posts username={username} />
      </section>
    </div>
  );
};

export default Homepage;
