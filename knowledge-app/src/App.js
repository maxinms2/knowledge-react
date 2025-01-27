import React from 'react';
import KnowledgeTree from './KnowledgeTree';
import KnowledgeSearch from './KnowledgeSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Base de conocimiento</h1>
      <KnowledgeSearch />
    </div>
  );
}

export default App;