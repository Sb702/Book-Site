import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className='nav-container'>
      <ul className='nav-list'>
        <li className='nav-link-container'>
          <Link className='nav-link' to="/home">Home</Link>
        </li>
        <li className='nav-link-container'>
          <Link className='nav-link' to="/books">My Books</Link>
        </li>
        <li className='nav-link-container'>
          <Link className='nav-link' to="/ai">AI</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;