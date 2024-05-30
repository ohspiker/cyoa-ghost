// src/App.js
import React from 'react';
import '${process.env.PUBLIC_URL}/App.css';
import Quiz from './Quiz';

function App() {
  return (
    <div className="App">
      <Quiz />
    </div>
  );
}

export default App;
