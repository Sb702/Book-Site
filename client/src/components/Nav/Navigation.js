import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ handleLogout }) => {
  return (
    // <nav className='nav-container'>
    //   <ul className='nav-list'>
    //     <li className='nav-link-container'>
    //       <Link className='nav-link' to="/home">Home</Link>
    //     </li>
    //     <li className='nav-link-container'>
    //       <Link className='nav-link' to="/books">My Books</Link>
    //     </li>
    //     <li className='nav-link-container'>
    //       <Link className='nav-link' to="/ai">AI</Link>
    //     </li>
    //   </ul>
    // </nav>
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl text-purple-500">Bookly</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link to="/home" className="btn btn-ghost">Home</Link>
      </li>
      <li>
        <Link to="/books" className="btn btn-ghost">My Books</Link>
      </li>
      <li>
        <Link to="/ai" className="btn btn-ghost">AI</Link>
      </li>
      <li>
      <button onClick={handleLogout} className='btn btn-error'>Logout</button>
      </li>
    </ul>
  </div>
</div>
  );
};

export default Navigation;


