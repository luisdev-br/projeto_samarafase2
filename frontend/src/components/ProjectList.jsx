import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import api from '../services/api';
import { FaTrashAlt, FaCheck } from 'react-icons/fa';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
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

  
  const loadTasks = async (projectId) => {
    try {
      if (projectId) {
        const response = await api.get(`/tasks?projectId=${projectId}`);
        setTasks(response.data);
      }
    } catch (error) {
      setError('Falha ao carregar tarefas.');
    }
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    loadTasks(projectId);
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Erro ao excluir tarefa');
    }
  };

  const markAsCompleted = async (taskId) => {
    try {
      const task = tasks.find(task => task._id === taskId);
      task.finished = !task.finished;
      await api.patch(`/tasks/${taskId}`, { finished: task.finished });
      setTasks([...tasks]);
    } catch (error) {
      setError('Erro ao atualizar tarefa');
    }
  };

  return (
    <div style={styles.container}>
      {}
      <button
        onClick={() => navigate('/tasks')}
        style={styles.backButton}
      >
        Voltar
      </button>

      {error && <p style={styles.errorMessage}>{error}</p>}

      <select 
        value={selectedProject || ''} 
        onChange={(e) => handleProjectSelect(e.target.value)} 
        style={styles.select}
      >
        <option value="">Selecione um projeto</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>

      {selectedProject && (
        <div style={styles.taskContainer}>
          <h3 style={styles.tasksTitle}>Tarefas do Projeto</h3>
          <ul style={styles.taskList}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task._id} style={styles.taskItem(task.finished)}>
                  <span style={styles.taskTitle}>
                    {task.title} - {task.finished ? 'Concluída' : 'Pendente'}
                  </span>

                  <div style={styles.iconsContainer}>
                    {!task.finished && (
                      <FaCheck 
                        onClick={() => markAsCompleted(task._id)} 
                        style={styles.icon('green')}
                      />
                    )}
                    <FaTrashAlt 
                      onClick={() => deleteTask(task._id)} 
                      style={styles.icon('red')}
                    />
                  </div>
                </li>
              ))
            ) : (
              <li style={styles.noTasksMessage}>Nenhuma tarefa encontrada para este projeto.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#d3d3d3',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',  
  },
  backButton: {
    position: 'absolute',  
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '150px',
    textAlign: 'center',
  },
  select: {
    width: '300px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  tasksTitle: {
    fontSize: '22px',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  taskContainer: {
    width: '100%',
    maxWidth: '800px',
    marginTop: '20px',
  },
  taskList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  taskItem: (finished) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: finished ? '#d4edda' : '#f8d7da',
    border: '1px solid #ccc',
  }),
  taskTitle: {
    flex: 1,
    marginRight: '20px',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: '600',
  },
  iconsContainer: {
    display: 'flex',
    gap: '15px',
  },
  icon: (color) => ({
    cursor: 'pointer',
    color: color,
    fontSize: '20px',
  }),
  noTasksMessage: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '16px',
    marginBottom: '20px',
  },
};

export default ProjectList;
