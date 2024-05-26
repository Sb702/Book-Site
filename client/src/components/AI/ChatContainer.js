import { useState } from "react";
import Navigation from "../Nav/Navigation";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";


export default function ChatContainer({ user, userBooks }) {
const [userMessages, setUserMessages] = useState([])
const [aiMessages, setAiMessages] = useState([])
const [messages, setMessages] = useState([])

// const addMessage = () => {
//   console.log(userMessages, aiMessages)

//   // we want to combine the userMessages and aiMessages arrays into one array but we want to keep track of the order of the messages and make it look like a conversation. All of them will be stored in the state called messages
// };  

const addMessage = () => {
  let combinedMessages = [];
  for (let i = 0; i < userMessages.length; i++) {
    combinedMessages.push(userMessages[i]);
    combinedMessages.push(aiMessages[i]);
  }
  setMessages(combinedMessages);
};


  return (
    <div>
      <Navigation />
      <ChatMessages aiMessages={aiMessages} userMessages={userMessages} messages={messages} />
      <ChatInput user={user} userBooks={userBooks} aiMessages={aiMessages} setAiMessages={setAiMessages} userMessages={userMessages} setUserMessages={setUserMessages} addMessage={addMessage} />
    </div>
  )
}
