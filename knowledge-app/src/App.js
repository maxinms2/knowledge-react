import React from 'react';
import KnowledgeTree from './KnowledgeTree';
import KnowledgeSearch from './KnowledgeSearch';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* Hipervínculo usando Link de React Router */}
          <nav>
            <Link to="/">Home</Link><br />
            <Link to="/knowledge-search">Búsqueda de temas</Link><br />
            <Link to="/knowledge-tree">Árbol de temas</Link>
          </nav>

          {/* Configuración de rutas */}
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>BASE DE CONOCIMIENTO</h1>
                </div>
              }
            />
            <Route path="/knowledge-search" element={<KnowledgeSearch />} />
            <Route path="/knowledge-tree" element={<KnowledgeTree />} />
          </Routes>
        </div>
      </Router>
    </div>

  );
}

export default App;