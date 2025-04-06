import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';
import '../styles/task-list.css';

const TaskList = () => {
  const [error, setError] = useState('');  
  const navigate = useNavigate();  

  
  const handleLogout = () => {
    navigate('/login');  
  };

  return (
    <div className="task-list-container">
      {}
      <button
        onClick={handleLogout}
        className="logout-button"
      >
        Sair
      </button>

      {}
      {error && <p className="error-message">{error}</p>}

      {}
      <div className="button-container">
        {}
        <button
          onClick={() => navigate('/tasks/new')}  
          className="action-button"
        >
          Criar Tarefa
        </button>

        {}
        <button
          onClick={() => navigate('/projects/new')}  
          className="action-button"
        >
          Criar Projeto
        </button>

        {}
        <button
          onClick={() => navigate('/projects')}  
          className="action-button"
        >
          Lista de Projetos
        </button>
      </div>
    </div>
  );
};

export default TaskList;
