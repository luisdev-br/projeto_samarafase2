import express from 'express';
import Project from '../models/Project.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
    }

    const newProject = new Project({ name, description });
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar projeto', error: error.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find();  
    res.status(200).json(projects);  
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar projetos', error: error.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);  
    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    res.status(200).json({ message: 'Projeto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir projeto', error: error.message });
  }
});

export default router;
