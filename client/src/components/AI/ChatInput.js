import {useState} from 'react'

export default function ChatInput({ user}) {
  const [prompt, setPrompt] = useState("")

  function askAI (e) {
    e.preventDefault()
    fetch("http://localhost:3000/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  
  }

  return (
    <div>
      <form onSubmit={askAI}>
        <input onChange={(e) => setPrompt(e.target.value)} type="text" />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
