import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import Summary from './components/Summary.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import TrashBin from './components/TrashBin.jsx';
import './App.css';

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

function App() {
  const [taskGroups, setTaskGroups] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [trash, setTrash] = useState([]);
  const [isTrashVisible, setIsTrashVisible] = useState(false);

  const handleAddTask = (newTask) => {
    const taskWithStatus = { ...newTask, isCompleted: false };
    const existingGroup = taskGroups.find(group => group.name.toLowerCase() === taskWithStatus.group.toLowerCase());
    if (existingGroup) {
      const updatedGroups = taskGroups.map(group => (group.name.toLowerCase() === taskWithStatus.group.toLowerCase() ? { ...group, tasks: [...group.tasks, taskWithStatus] } : group));
      setTaskGroups(updatedGroups);
    } else {
      const newGroup = { name: taskWithStatus.group, id: uuidv4(), tasks: [taskWithStatus] };
      setTaskGroups([...taskGroups, newGroup]);
    }
  };
  const handleUpdateTask = (taskId, updatedData) => {
    setTaskGroups(taskGroups.map(group => ({ ...group, tasks: group.tasks.map(task => (task.id === taskId ? { ...task, ...updatedData } : task)) })));
    setEditingTaskId(null);
  };
  const handleToggleTask = (taskId) => {
    setTaskGroups(taskGroups.map(group => ({ ...group, tasks: group.tasks.map(task => (task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task)) })));
  };
  const handleDeleteTask = (taskIdToDelete) => {
    let taskToTrash;
    const updatedGroups = taskGroups.map(group => {
      const taskExists = group.tasks.find(task => task.id === taskIdToDelete);
      if (taskExists) taskToTrash = taskExists;
      return { ...group, tasks: group.tasks.filter(task => task.id !== taskIdToDelete) };
    }).filter(group => group.tasks.length > 0);
    setTaskGroups(updatedGroups);
    if (taskToTrash) setTrash([...trash, taskToTrash]);
  };
  const handleRestoreTask = (taskToRestore) => {
    handleAddTask(taskToRestore);
    setTrash(trash.filter(task => task.id !== taskToRestore.id));
  };
  const handlePermanentlyDeleteTask = (taskIdToDelete) => {
    if (window.confirm('Це завдання не можна буде відновити. Видалити?')) {
      setTrash(trash.filter(task => task.id !== taskIdToDelete));
    }
  };
  const handleEmptyTrash = () => {
    if (trash.length > 0 && window.confirm(`Ви впевнені, що хочете видалити назавжди всі завдання (${trash.length} шт.) з кошика? Ця дія необоротна.`)) {
      setTrash([]);
    }
  };
  const handleSetEditMode = (taskId) => setEditingTaskId(taskId);
  const handleCancelEdit = () => setEditingTaskId(null);
  const totalBalance = taskGroups.reduce((total, group) => {
    const groupTotal = group.tasks.reduce((groupSum, task) => {
      if (task.isCompleted) return groupSum;
      return task.type === 'income' ? groupSum + task.amount : groupSum - task.amount;
    }, 0);
    return total + groupTotal;
  }, 0);

  return (
    <div>
      <Header />
      
      <div className="main-controls-wrapper">
        <Summary total={totalBalance} />
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <TaskList
        groups={taskGroups}
        editingTaskId={editingTaskId}
        onSetEditMode={handleSetEditMode}
        onUpdateTask={handleUpdateTask}
        onCancelEdit={handleCancelEdit}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
      <div className="main-controls-wrapper">
      <button onClick={() => setIsTrashVisible(!isTrashVisible)} className="trash-toggle-bar">
          <span className="trash-bar-label">
            <TrashIcon />
            <span>Кошик</span>
          </span>
          {trash.length > 0 && <span className="trash-bar-counter">{trash.length}</span>}
        </button>

        {isTrashVisible && (
          <TrashBin
            trash={trash}
            onRestoreTask={handleRestoreTask}
            onPermanentlyDeleteTask={handlePermanentlyDeleteTask}
            onEmptyTrash={handleEmptyTrash}
          />
        )}
      </div>
    </div>
  );
}

export default App;