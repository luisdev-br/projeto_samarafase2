import express from 'express';
import Task from '../models/Task.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { title, projectId } = req.body;

  try {
    if (!title || !projectId) {
      return res.status(400).json({ message: 'Título e projeto são obrigatórios' });
    }

    const newTask = new Task({ title, projectId });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  const { projectId } = req.query;  

  try {
    let tasks;

    
    if (projectId) {
      tasks = await Task.find({ projectId }).populate('projectId', 'name description');
    } else {
      
      tasks = await Task.find().populate('projectId', 'name description');
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa', error: error.message });
  }
});


router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    task.finished = !task.finished; 
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
});

export default router;
