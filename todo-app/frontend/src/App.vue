<template>
  <div class="container">
    <h1>📝 ToDo App</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a new task" />
      <button>Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <label>
          <input type="checkbox" v-model="todo.done" @change="toggleTodo(todo)" />
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const todos = ref([])
const newTodo = ref('')

const fetchTodos = async () => {
  const res = await fetch('http://localhost:3000/api/todos')
  todos.value = await res.json()
}

const addTodo = async () => {
  const res = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newTodo.value })
  })
  const added = await res.json()
  todos.value.push(added)
  newTodo.value = ''
}

const toggleTodo = async (todo) => {
  await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: todo.done })
  })
}

onMounted(fetchTodos)
</script>

<style>
.container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-family: sans-serif;
}
input[type="text"] {
  width: 70%;
  padding: 0.5rem;
  margin-right: 1rem;
}
.done {
  text-decoration: line-through;
  color: gray;
}
button {
  padding: 0.5rem 1rem;
}
</style>
