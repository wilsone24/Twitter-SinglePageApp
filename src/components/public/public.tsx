import React, { useEffect, useState } from "react";
import Login from "./login/login";
import Homepage from "../private/homepage";

const Public: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<{ username: string; name: string } | null>(
    null
  );

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

  return <Login setToken={setToken} setUser={setUser} />;
};

export default Public;
