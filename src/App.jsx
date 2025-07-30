// src/App.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx'; // 1. Импортируем наш новый компонент
import './App.css'; // Не забываем про файл стилей

function App() {
  const [taskGroups, setTaskGroups] = useState([]);

  const handleAddTask = (newTask) => {
    const existingGroup = taskGroups.find(
      (group) => group.name.toLowerCase() === newTask.group.toLowerCase()
    );

    if (existingGroup) {
      const updatedGroups = taskGroups.map((group) => {
        if (group.name.toLowerCase() === newTask.group.toLowerCase()) {
          return { ...group, tasks: [...group.tasks, newTask] };
        }
        return group;
      });
      setTaskGroups(updatedGroups);
    } else {
      const newGroup = {
        name: newTask.group,
        id: uuidv4(),
        tasks: [newTask]
      };
      setTaskGroups([...taskGroups, newGroup]);
    }
  };

  return (
    <div>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      {/* 2. Используем TaskList и передаем ему все наши группы через проп */}
      <TaskList groups={taskGroups} />
    </div>
  );
}

export default App;