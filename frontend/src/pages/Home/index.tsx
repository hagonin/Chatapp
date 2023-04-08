import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => (
  <div className="home">
    <h1>Welcome to our website</h1>
    <Link to="/register">Signup</Link>
    <Link to="/login">Sign in</Link>
    <Link to="/chatroom">Chat Room</Link>
  </div>
);

export default Home;
