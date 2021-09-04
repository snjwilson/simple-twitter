import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";

function Feed() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [tweets, setTweets] = useState([]);
  async function loadTweets(id) {
    let response;
    try {
      response = await axios.get(`/posts?id=${id}`);
      setTweets(response.data.posts);
    } catch (error) {
      console.error(`Something went wrong while fetching tweets`);
    }
  }
  useEffect(() => {
    if (user) {
      loadTweets(user._id);
    }
  });

  return (
    <div className="feed">
      {tweets.length > 0 ? (
        tweets.map((tweet) => <Tweet tweet={tweet} />)
      ) : (
        <div className="message">
          You are up to date connect with more people
        </div>
      )}
    </div>
  );
}

export default Feed;
