import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default function Header() {
  return (
    <div>
      <header id="main-header">
        <div className="header-content">
          <Link to="/">Dev Blog</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
    </div>
  );
}
