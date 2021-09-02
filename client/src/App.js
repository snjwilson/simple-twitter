import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import CreateTweet from "./components/CreateTweet";
import Connect from "./components/Connect";
import jwtDecode from "jwt-decode";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setUser(jwtDecode(token));
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar
          setUser={setUser}
          setAuthenticated={setAuthenticated}
          user={user}
          authenticated={authenticated}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Feed
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              setUser={setUser}
              user={user}
            />
          )}
        />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/login"
          render={() => (
            <Login setUser={setUser} setAuthenticated={setAuthenticated} />
          )}
        />
        <Route
          exact
          path="/new"
          render={() => (
            <CreateTweet user={user} authenticated={authenticated} />
          )}
        ></Route>
        <Route
          exact
          path="/users"
          render={() => <Connect user={user} setUser={setUser} />}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
