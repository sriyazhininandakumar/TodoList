import React, { useState, useEffect, useRef } from 'react';
import List from './List';

const API_URL = 'http://localhost:3000/todos';

const Todo = () => {
  const [todolist, settodolist] = useState([]);
  const inputRef = useRef();

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      settodolist(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  
  const addTask = async () => {
    const input = inputRef.current.value.trim();
    if (input === '') return;

    const newTodo = { 
        todolist: input, 
        isComplete: false };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error('Failed to add task');

      const addedTodo = await response.json();
      settodolist((prev) => [...prev, addedTodo]);
      inputRef.current.value = '';
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  
  
 
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');

      settodolist((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const updateTask = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todolist: newText }),
      });

      if (!response.ok) throw new Error('Failed to update task text');

      const updatedTask = await response.json();

      settodolist((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTask : todo))
      );
    } catch (error) {
      console.error('Failed to update task text:', error);
    }
  };

 
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>

      <input ref={inputRef} type="text" placeholder="Enter your task" />
      <button onClick={addTask}>Add Task</button>

      <div>
        {todolist.map((todo) => (
          <List
            key={todo._id}
            id={todo._id}
            text={todo.todolist}
            isComplete={todo.isComplete}
            
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
