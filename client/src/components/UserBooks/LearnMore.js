import React from 'react'
import './LearnMore.css'

export default function LearnMore({ book }) {
  return (
    <div className='learnmore-container'>{book.title}</div>
  )
}
