import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="app">
      <h1>Bav's To-Do List ✅</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Add a new task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} className={task.done ? 'done' : ''}>
            <span onClick={() => toggleTask(i)}>{task.text}</span>
            <button className="delete" onClick={() => deleteTask(i)}><i class="fa-solid fa-xmark"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
