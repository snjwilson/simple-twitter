import axios from "axios";
import React, { useRef } from "react";
import Button from "./Button";

function CreateTweet({ user }) {
  const tweetMessage = useRef(null);

  async function handleSubmit() {
    if (tweetMessage.current.value === "") {
      alert(`Tweet cannot be empty`);
      return;
    }
    let response;
    const payload = {
      message: tweetMessage.current.value,
      owner: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      ownerId: user._id,
    };
    try {
      response = await axios.post("/posts", payload);
      if (response.status) {
        alert(`Successfully posted tweet`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="create-tweet">
      <textarea
        ref={tweetMessage}
        placeholder={`Write something here and tweet`}
      ></textarea>
      <Button inner="Tweet" style={{ height: "4rem" }} onClick={handleSubmit} />
    </div>
  );
}

export default CreateTweet;
