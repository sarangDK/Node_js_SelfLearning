import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
    <Link to="/employees">Employees</Link>
    
  </nav>
);

export default Navbar;
