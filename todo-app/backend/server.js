const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: req.body.done } : todo
  );
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
