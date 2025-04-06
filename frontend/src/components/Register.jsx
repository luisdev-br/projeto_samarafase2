import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');  
    } catch (error) {
      setError('Erro ao criar conta. Verifique seus dados.');
    }
  };

  const handleGoBack = () => {
    navigate('/login');  
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Cadastro</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Nome" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            style={styles.input}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            style={styles.input}
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            style={styles.input}
          />
          <button 
            type="submit" 
            style={styles.button}
          >
            Cadastrar
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
    maxWidth: '400px',  
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
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
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
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
};

export default Register;
