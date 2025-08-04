// src/App.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import './App.css';

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
      <TaskList groups={taskGroups} />
    </div>
  );
}

export default App;