import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "./Button";

function Connect({ user }) {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await axios.get(`/users`);
    if (!response.data.status) {
      alert(response.data.message);
      return;
    }
    if (response.data.users.length > 0) {
      setUsers(
        response.data.users.filter(
          (twitterUser) => twitterUser._id !== user._id
        )
      );
    }
  }

  async function follow(id) {
    // if user is already following unfollow
    if (user.follows.includes(id)) {
      const newUserFollowsArray = user.follows.filter(
        (followId) => followId !== id
      );
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          follows: newUserFollowsArray,
        })
      );
      // setUser({
      //   ...user,
      //   follows: newUserFollowsArray,
      // });
      const response = await axios.put(`/users/follow`, {
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
      sessionStorage.setItem("user", JSON.stringify(newUser));
      // setUser(newUser);
      const response = await axios.put(`/users/follow`, {
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
  });

  return users.length > 0 ? (
    <div className="connect">
      {users.map((twitterUser) => (
        <div className="user-card">
          <div className="tweet-header">
            <h4>
              <a href="#"></a>
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
  ) : (
    <div className="message">There are no users to follow</div>
  );
}

export default Connect;
