import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CreateTweet from "./components/CreateTweet";
import Connect from "./components/Connect";
import useToken from "./components/useToken";

function App() {
  const { token, setToken } = useToken();
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : {};

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Navbar />
          <Feed />
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route exact path="/new">
          <Navbar />
          <CreateTweet user={user} />
        </Route>
        <Route exact path="/users">
          <Navbar />
          <Connect user={user} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
