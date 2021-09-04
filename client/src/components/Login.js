import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import Signup from "./Signup";

function Login({ setToken }) {
  const [type, setType] = useState("login");
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
        data: { token, status, errors },
      } = response;
      if (!status && errors) {
        setErrors(errors);
        return;
      }
      setToken(token);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return type === "login" ? (
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
      <div
        id="show-sign-up-link"
        onClick={() => {
          setType("signup");
        }}
      >
        <a href="#">Sign up for twitter</a>
      </div>
    </div>
  ) : (
    <Signup setType={setType} />
  );
}

export default Login;
