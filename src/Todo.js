import React, { useState } from 'react';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null); 
  const [editTask, setEditTask] = useState(""); 

  function handleSubmit(event) {
    event.preventDefault();
    if (editIndex !== null) {
      handleEditTaskSubmit();
    } else if (newTask.trim()) {
      console.log("Adding Task:", newTask);
      addTask(newTask);
      setNewTask("");  
    }
  }
  
  function addTask(task) {
    console.log("Current Tasks:", tasks);  
    setTasks([...tasks, { text: task, done: false }]);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }
  function toggleTaskDone(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  }
  function handleEditTask(index) {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  }
  function handleEditTaskSubmit() {
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: editTask } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask("");
  }


  return (
    <div className='todo'>
      <h1>TO-DO APP</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <input
          type='text'
          placeholder={editIndex !== null ? "Edit task..." : "Add a task..."}
          value={editIndex !== null ? editTask || "" : newTask || ""}
          onChange={(e) => editIndex !== null ? setEditTask(e.target.value) : setNewTask(e.target.value)}
        />

          <button className='add-button' type='submit'>
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <span className="text">{task.text}</span>
            <button className="done-button" onClick={() => toggleTaskDone(index)}>
              {task.done ? "Undo" : "Done"}
            </button>
            <button className="edit-button" onClick={() => handleEditTask(index)}>Edit</button>
            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Todo;
