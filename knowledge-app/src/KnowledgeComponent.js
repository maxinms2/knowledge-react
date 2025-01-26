import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KnowledgeComponent = () => {
  const [knowledge, setKnowledge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          title: "uno",
          content: "uno",
          parentId: 1,
          childrenIds: [],
          createdAt: "2025-01-24",
          updatedAt: "2025-01-24"
        };

        const response = await axios.post('http://localhost:8080/api/knowledge', body);
        setKnowledge(response.data); // Guarda la respuesta del servidor en el estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {knowledge && (
        <>
          <h1>{knowledge.title}</h1>
          <p>{knowledge.content}</p>
          <p>Parent ID: {knowledge.parentId}</p>
          <p>Children IDs: {knowledge.childrenIds ? knowledge.childrenIds.join(', ') : 'No children IDs'}</p>
          <p>Created At: {knowledge.createdAt}</p>
          <p>Updated At: {knowledge.updatedAt}</p>
        </>
      )}
    </div>
  );
};

export default KnowledgeComponent;