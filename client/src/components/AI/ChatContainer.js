import Navigation from "../Nav/Navigation";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";


export default function ChatContainer({ user }) {
  return (
    <div>
      <Navigation />
      <ChatInput user={user} />
      <ChatMessages />
    </div>
  )
}
