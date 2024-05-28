import './ChatMessages.css';

export default function ChatMessages({ messages }) {
  const transformAIResponse = (message) => {
    if (message.type !== 'ai') return message;

    const splitMessage = message.content.split('APITitle: ');
    const introMessage = splitMessage[0];
    const bookRecommendations = splitMessage.slice(1).map(book => {
      const bookInfo = book.split(', ');
      return {
        APITitle: bookInfo[0],
        APIAuthors: bookInfo[1].split(': ')[1],
        APIDescription: bookInfo[2].split(': ')[1]
      };
    });

    return { ...message, content: { introMessage, bookRecommendations } };
  };

  const transformedMessages = messages.map(transformAIResponse);

  return (
    <div className='chat-container'>
      {transformedMessages.map((message, index) => (
        <div key={index} className={message.type === 'ai' ? 'ai-message' : 'user-message'}>
          {message.type === 'ai' ? (
            <>
              <p>{message.content.introMessage}</p>
              {message.content.bookRecommendations.map((book, i) => (
                <div key={i}>
                  <h2>{book.APITitle}</h2>
                  <h3>{book.APIAuthors}</h3>
                  <p>{book.APIDescription}</p>
                </div>
              ))}
            </>
          ) : (
            message.content
          )}
        </div>
      ))}
    </div>
  );
}