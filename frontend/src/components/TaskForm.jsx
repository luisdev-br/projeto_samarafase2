import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        setError('Falha ao carregar projetos.');
      }
    };
    loadProjects();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/tasks', { title, projectId: selectedProject });
      setTitle('');
      setSelectedProject('');
      alert('Tarefa criada com sucesso!');
    } catch (error) {
      setError('Erro ao criar tarefa.');
    }
  };

  const handleGoBack = () => {
    navigate('/tasks');  
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Criar Tarefa</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Selecione um projeto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            style={styles.button}
          >
            Criar Tarefa
          </button>
        </form>

        {}
        <button
          onClick={handleGoBack}
          style={styles.goBackButton}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#d3d3d3',  
    margin: 0,
    padding: 0,
    width: '100vw',  
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',  
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
  goBackButton: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#f44336',  
    color: 'white',
    border: '1px solid #f44336', 
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default TaskForm;
