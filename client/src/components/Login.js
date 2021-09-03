import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";

function Login({ setAuthenticated, setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  function handleChange(e) {
    setErrors({});
    setForm((form) => ({
      ...form,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit() {
    let response;
    try {
      response = await axios.post("/users/login", form);
      const {
        data: { token, status, message, errors },
      } = response;
      if (!status && errors) {
        setErrors(errors);
      }
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      // setAuthToken(token);
      // Decode token to get user data
      setUser(jwt_decode(token));
      setAuthenticated(true);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">
      <h1>
        <b>Log in to Twitter</b>
      </h1>
      <form className="login-form">
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          <div className="error-span form-text">
            {errors && errors.email ? errors.email : null}
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            onChange={handleChange}
          />
        </div>
      </form>
      <Button
        inner="Log in"
        style={{ marginTop: "1rem" }}
        onClick={handleSubmit}
      />
      <div id="show-sign-up-link">
        <a href="/signup">Sign up for twitter</a>
      </div>
    </div>
  );
}

export default Login;
