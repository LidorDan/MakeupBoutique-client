import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isAdmin: false,
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  const [isAdmin, setisAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") || false;
  });
  const [isLoggedin, setIsLoggedin] = useState(() => {
    return localStorage.getItem("isLoggedin") || false;
  });

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem("isLoggedin", isLoggedin);
  }, [isLoggedin]);

  const loginHandler = (newToken, user_id, is_admin) => {
    setToken(newToken);
    setUserId(user_id);
    setisAdmin(is_admin);
    setIsLoggedin("true");
  };

  const logoutHandler = () => {
    setToken(null);
    setIsLoggedin("false");
    setisAdmin("false")

  };

  const contextValue = {
    token: token,
    userId: userId,
    isAdmin: isAdmin,
    isLoggedin: isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
