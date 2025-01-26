import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    parentId: '',
  });

  // Estado para manejar la respuesta del servidor
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    setLoading(true);
    setError(null);

    try {
      // Realiza la solicitud POST al servidor
      const res = await axios.post('http://localhost:8080/api/knowledge', formData);
      setResponse(res.data); // Guarda la respuesta del servidor
    } catch (err) {
      setError(err.message); // Maneja errores
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className="App">
      <h1>Ingresar Datos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contenido:</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Parent ID:</label>
          <input
            type="number"
            name="parentId"
            value={formData.parentId}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {response && (
        <div>
          <h2>Respuesta del servidor:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;