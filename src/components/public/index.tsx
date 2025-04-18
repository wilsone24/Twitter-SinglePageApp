import React, { useEffect, useState } from "react";
import Login from "./login";
import Register from "./register";
import Homepage from "../private";

const Public: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<{ username: string; name: string } | null>(
    null
  );
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  if (token && user) {
    return <Homepage username={user.username} name={user.name} />;
  }

  if (showRegister) {
    return <Register onSuccess={() => setShowRegister(false)} />;
  }

  return (
    <Login
      setToken={setToken}
      setUser={setUser}
      onSwitchToRegister={() => setShowRegister(true)}
    />
  );
};

export default Public;
