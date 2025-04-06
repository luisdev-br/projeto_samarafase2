import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CreateProject from './components/CreateProject'; 
import ProjectList from './components/ProjectList'; 

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/tasks" element={<TaskList />} />  
        <Route path="/tasks/new" element={<TaskForm />} />  
        <Route path="/projects" element={<ProjectList />} />  
        <Route path="/projects/new" element={<CreateProject />} />  
      </Routes>
    </Router>
  );
};

export default App;
