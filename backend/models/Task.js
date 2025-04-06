import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  finished: { type: Boolean, default: false }
});


const Task = mongoose.model('Task', taskSchema);

export default Task;
