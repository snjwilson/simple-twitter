import React, { useState } from "react";
import jwtDecode from "jwt-decode";

function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    return tokenString;
  };
  const saveToken = (token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(jwtDecode(token)));
    setToken(token);
  };
  const [token, setToken] = useState(getToken());

  return { token, setToken: saveToken };
}

export default useToken;
