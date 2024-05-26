import { useState } from "react";
import "./ChatInput.css";

export default function ChatInput({
  user,
  userBooks,
  aiMessages,
  setAiMessages,
  userMessages,
  setUserMessages,
  addMessage
}) {
  const [prompt, setPrompt] = useState("");
  // console.log(userBooks);

function askAI(e) {
  e.preventDefault();
  // addMessage("user", prompt);
  fetch("http://localhost:3000/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, books: userBooks }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // addMessage("ai", data.response);
      setUserMessages([...userMessages, { type: "user", content: prompt }]);
      setAiMessages([...aiMessages, { type: "ai", content: data.response }]);
      // addMessage(newUserMessage = {prompt} , newAiMessage = {data.response});
      addMessage({ type: "user", content: prompt }, { type: "ai", content: data.response });
    })
    .catch((err) => console.error(err));
}

  return (
    <div className="chat-input-out-container">
      <form onSubmit={askAI} className="chat-input-form">
        <input
          className="chat-input"
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
        />
        <button className="chat-submit-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
