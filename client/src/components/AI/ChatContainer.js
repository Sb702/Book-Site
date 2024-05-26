import Navigation from "../Nav/Navigation";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";


export default function ChatContainer({ user, userBooks }) {
  return (
    <div>
      <Navigation />
      <ChatInput user={user} userBooks={userBooks}/>
      <ChatMessages />
    </div>
  )
}
