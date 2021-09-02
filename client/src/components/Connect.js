import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "./Button";

function Connect({ user, setUser }) {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await axios.get(`http://localhost:5000/users`);
    if (!response.data.status) {
      alert(response.data.message);
      return;
    }
    setUsers(
      response.data.users.filter((twitterUser) => twitterUser._id !== user._id)
    );
  }

  async function follow(id) {
    // if user is already following unfollow
    if (user.follows.includes(id)) {
      const newUserFollowsArray = user.follows.filter(
        (followId) => followId !== id
      );
      setUser({
        ...user,
        follows: newUserFollowsArray,
      });
      const response = await axios.put(`http://localhost:5000/users/follow`, {
        userId: user._id,
        follows: newUserFollowsArray,
      });
      if (!response.data.status) {
        alert(response.data.message);
        return;
      }
    } else {
      const newUser = {
        ...user,
      };
      newUser.follows.push(id);
      setUser(newUser);
      const response = await axios.put(`http://localhost:5000/users/follow`, {
        userId: user._id,
        follows: newUser.follows,
      });
      if (!response.data.status) {
        alert(response.data.message);
        return;
      }
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="connect">
      {users.map((twitterUser) => (
        <div className="user-card">
          <div className="tweet-header">
            <h4>
              <a href="/user"></a>
              {twitterUser.firstName + " " + twitterUser.lastName}
            </h4>
            <span>{`@${twitterUser.email.split("@")[0]}`}</span>
          </div>
          <Button
            inner={
              user.follows.includes(twitterUser._id) ? "following" : "follow"
            }
            style={{
              width: "5rem",
              height: "2rem",
              borderRadius: "30px",
            }}
            onClick={() => follow(twitterUser._id)}
          />
        </div>
      ))}
    </div>
  );
}

export default Connect;
