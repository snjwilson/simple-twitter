import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Tweet from "./Tweet";

function Feed(props) {
  const history = useHistory();
  const [tweets, setTweets] = useState([]);
  async function loadTweets(id) {
    let response;
    try {
      response = await axios.get(`http://localhost:5000/posts?id=${id}`);
      setTweets(response.data.posts);
    } catch (error) {
      console.error(`Something went wrong while fetching tweets`);
    }
  }
  useEffect(() => {
    if (props.user) {
      loadTweets(props.user._id);
    }
  }, [props]);

  // useEffect(() => {
  //   if (!props.authenticated) {
  //     history.push("/login");
  //   }
  // }, []);
  return (
    <div className="feed">
      {tweets
        ? tweets.map((tweet) => <Tweet tweet={tweet} />)
        : "You are up to date"}
    </div>
  );
}

export default Feed;
