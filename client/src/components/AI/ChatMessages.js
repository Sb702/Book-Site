import './ChatMessages.css';

export default function ChatMessages({ messages }) {
  return (
    <div className='chat-container'>
      {messages.map((message, index) => (
        <div key={index} className={message.type === 'ai' ? 'ai-message' : 'user-message'}>
          {message.content}
        </div>
      ))}
    </div>
  );
}