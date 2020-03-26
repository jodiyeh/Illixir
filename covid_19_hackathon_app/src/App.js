import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestUserComponent from './TestUserComponent';

function App() {
  return (
    <Router>
      <div class="container">
        </br>
        <Route path='/' exact component={TestUserComponent}>
      </div>
    </Router>
  );
}

export default App;
