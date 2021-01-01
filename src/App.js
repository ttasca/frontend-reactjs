import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect( ()=> {
      api.get('repositories').then(response => {
      setRepository(response.data); // popula os projetos
        //console.log(response);
      })
    }, [] 
  );


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'http://teste-insercao-desafio-3',
      techs: 'desafio 3'
    } );
    
    const repository = response.data;
    setRepository( [...repositories, repository] );
    
  }
  
  

  async function handleRemoveRepository(id) {
    api.delete( 'repositories/' + id);

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )
    setRepository(newRepositories);
  }

  return (
    <div>
    <ul data-testid="repository-list">
    {repositories.map(repository => (
        <li key={repository.id}>
        {repository.title}

        <button onClick={() => handleRemoveRepository(repository.id)}>
        Remover
        </button>
        </li>
    ))}
    </ul>
       <button onClick={handleAddRepository}>
       Adicionar
       </button>
    </div>

    



  );
}

export default App;
