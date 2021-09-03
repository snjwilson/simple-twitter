import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState(false);
  const history = useHistory();

  function handleChange(e) {
    setForm((form) => ({
      ...form,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit() {
    console.log(`Submitting sign up form`);
    let response;
    try {
      response = await axios.post("/users/signup", form);
      alert(response.data.message);
      if (!response.data.status) {
        setErrors(response.data.errors);
      } else {
        history.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">
      <h1>
        <b>Sign up for Twitter</b>
      </h1>
      <form className="login-form">
        <div class="mb-3">
          <label for="firstName" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="error-span form-text">
          {errors && errors.firstName ? errors.firstName : null}
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">
            Last Name
          </label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            onChange={handleChange}
          />
          <div className="error-span form-text">
            {errors && errors.lastName ? errors.lastName : null}
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email
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
          <div className="error-span form-text">
            {errors && errors.password ? errors.password : null}
          </div>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            onChange={handleChange}
          />
          <div className="error-span form-text">
            {errors && errors.confirmPassword ? errors.confirmPassword : null}
          </div>
        </div>
      </form>
      <Button
        inner="Sign Up"
        style={{ marginTop: "1rem" }}
        onClick={handleSubmit}
      />
      <div id="show-sign-up-link">
        <a href="/login">Back to login</a>
      </div>
    </div>
  );
}

export default Signup;
