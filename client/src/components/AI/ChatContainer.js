import { useEffect, useState } from "react";
import Navigation from "../Nav/Navigation";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useNavigate } from "react-router-dom";


export default function ChatContainer({ user, userBooks }) {
const [userMessages, setUserMessages] = useState([])
const [aiMessages, setAiMessages] = useState([])
const [messages, setMessages] = useState([])

const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost:3000/protect", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Not authorized');
      }
      return res.json();
    })
    .then((data) => {
      if (data && !data.error) {
        // console.log(data.user);
      }
    })
    .catch((err) => {
      // if there is an error we need to navigate to the login screen
      console.log(err);
      alert("You are not authorized to access this page.")
      navigate("/");
    });
}, []);

// const addMessage = () => {
//   console.log(userMessages, aiMessages)

//   // we want to combine the userMessages and aiMessages arrays into one array but we want to keep track of the order of the messages and make it look like a conversation. All of them will be stored in the state called messages
// };  

const addMessage = (newUserMessage, newAiMessage) => {
  let combinedMessages = [...messages];
  if (newUserMessage) {
    combinedMessages.push(newUserMessage);
  }
  if (newAiMessage) {
    combinedMessages.push(newAiMessage);
  }
  // reverse the order of the messages so that the most recent message is at the bottom
  setMessages(combinedMessages);
};


  return (
    <div>
      <Navigation />
      <ChatMessages aiMessages={aiMessages} userMessages={userMessages} messages={messages} />
      <ChatInput user={user} userBooks={userBooks} aiMessages={aiMessages} setAiMessages={setAiMessages} userMessages={userMessages} setUserMessages={setUserMessages} addMessage={addMessage} messages={messages}/>
    </div>
  )
}
