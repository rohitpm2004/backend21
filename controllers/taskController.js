let tasks = [
  { id: 1, title: 'Learn Node.js', description: 'Study Express fundamentals', status: 'completed' },
  { id: 2, title: 'Build REST API', description: 'Implement full CRUD routes', status: 'pending' }
];

export const getAllTasks = (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = tasks.filter(t => t.status.toLowerCase() === status.toLowerCase());
    return res.status(200).json(filtered);
  }
  return res.status(200).json(tasks);
};

export const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    description: description ? description.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status } = req.body;
  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) task.status = status;

  return res.status(200).json(task);
};

export const deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deleted = tasks.splice(index, 1)[0];
  return res.status(200).json({ message: 'Task deleted successfully', task: deleted });
};
