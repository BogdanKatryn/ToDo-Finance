import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Header from './components/Header.jsx';
import Summary from './components/Summary.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import TrashBin from './components/TrashBin.jsx';
import './App.css';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

function App() {
  const [taskGroups, setTaskGroups] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [trash, setTrash] = useState([]);
  const [isTrashVisible, setIsTrashVisible] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Аутентификация и загрузка пользователя
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Загрузка задач пользователя из Supabase
  useEffect(() => {
    async function fetchTasks() {
      if (!user) return;
  
      // Завантажуємо не видалені (основні) задачі
      const { data: activeTasks, error: activeError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_deleted', false);  // <- ЭТО ОБЯЗАТЕЛЬНО!

    const { data: trashedTasks, error: trashError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_deleted', true);

      if (activeError || trashError) {
        console.error('Помилка завантаження:', activeError?.message || trashError?.message);
        return;
      }
  
      // Групуємо активні задачі як раніше
      const groupsMap = {};
  
      activeTasks.forEach(task => {
        const groupKey = task.group_name.toLowerCase();
        if (!groupsMap[groupKey]) {
          groupsMap[groupKey] = {
            id: groupKey,
            name: task.group_name,
            tasks: []
          };
        }
        groupsMap[groupKey].tasks.push({
          id: task.id,
          group: task.group_name,
          title: task.title,
          type: task.type,
          amount: parseFloat(task.amount),
          isCompleted: task.is_completed,
        
        });
      });
  
      setTaskGroups(Object.values(groupsMap));
      setTrash(trashedTasks); // встановлюємо корзину в state
    }
  
    fetchTasks();
  }, [user]);

  if (loading) return <p className='app-p'>Завантаження...</p>;
  if (!user) return <Auth onLogin={setUser} />;

  const handleAddTask = async (newTask) => {
    if (!newTask.title || newTask.title.trim() === '') {
      alert('Поле названия завдання обов’язкове');
      return;
    }
  
    const taskToSave = {
      user_id: user.id,
      group_name: newTask.group,
      title: newTask.title,
      type: newTask.type,
      amount: newTask.amount,
      is_completed: false,
      is_deleted: false,
    };
  
    console.log('Отправляем задачу в Supabase:', taskToSave);
  
    const { data, error } = await supabase
      .from('tasks')
      .insert([taskToSave])
      .select();
  
    if (error) {
      console.error('Ошибка при вставке задачи:', error);
      alert('Помилка при додаванні завдання: ' + error.message);
      return;
    }
  
    console.log('Задача успешно вставлена в Supabase:', data[0]);

    const savedTask = data[0];

    const existingGroup = taskGroups.find(g => g.name.toLowerCase() === savedTask.group_name.toLowerCase());

    if (existingGroup) {
      const updatedGroups = taskGroups.map(g =>
        g.name.toLowerCase() === savedTask.group_name.toLowerCase()
          ? { ...g, tasks: [...g.tasks, { ...newTask, id: savedTask.id, isCompleted: false }] }
          : g
      );
      setTaskGroups(updatedGroups);
    } else {
      const newGroup = { id: savedTask.group_name.toLowerCase(), name: savedTask.group_name, tasks: [{ ...newTask, id: savedTask.id, isCompleted: false }] };
      setTaskGroups([...taskGroups, newGroup]);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        title: updatedData.title,
        type: updatedData.type,
        amount: updatedData.amount,
        is_completed: updatedData.isCompleted
      })
      .eq('id', taskId);

    if (error) {
      alert('Помилка оновлення завдання: ' + error.message);
      return;
    }

    setTaskGroups(taskGroups.map(group => ({
      ...group,
      tasks: group.tasks.map(task => (task.id === taskId ? { ...task, ...updatedData } : task)),
    })));

    setEditingTaskId(null);
  };

  const handleToggleTask = async (taskId) => {
    // Находим задачу и меняем isCompleted локально и в базе
    let toggledTask = null;
    for (const group of taskGroups) {
      const task = group.tasks.find(t => t.id === taskId);
      if (task) {
        toggledTask = task;
        break;
      }
    }
    if (!toggledTask) return;

    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !toggledTask.isCompleted })
      .eq('id', taskId);

    if (error) {
      alert('Помилка оновлення стану завдання: ' + error.message);
      return;
    }

    setTaskGroups(taskGroups.map(group => ({
      ...group,
      tasks: group.tasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    })));
  };

  const handleDeleteTask = async (taskIdToDelete) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_deleted: true })
      .eq('id', taskIdToDelete)
      .eq('user_id', user.id);
  
    if (error) {
      alert('Помилка видалення завдання: ' + error.message);
      return;
    }
  
    let taskToTrash;
    const updatedGroups = taskGroups.map(group => {
      const taskExists = group.tasks.find(task => task.id === taskIdToDelete);
      if (taskExists) taskToTrash = taskExists;
      return { ...group, tasks: group.tasks.filter(task => task.id !== taskIdToDelete) };
    }).filter(group => group.tasks.length > 0);

    setTaskGroups(updatedGroups);
    if (taskToTrash) setTrash([...trash, taskToTrash]);
  };

  const handleRestoreTask = async (taskToRestore) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_deleted: false })
      .eq('id', taskToRestore.id)
      .eq('user_id', user.id);
  
    if (error) {
      alert('Помилка відновлення завдання: ' + error.message);
      return;
    }
  
    // Оновлюємо локально
    setTrash(trash.filter(task => task.id !== taskToRestore.id));
    
    // Перезавантажуємо таски або додаємо вручну:
    setTaskGroups(prev => {
      const existingGroup = prev.find(g => g.name.toLowerCase() === taskToRestore.group_name.toLowerCase());
      if (existingGroup) {
        return prev.map(g =>
          g.name.toLowerCase() === taskToRestore.group_name.toLowerCase()
            ? { ...g, tasks: [...g.tasks, { ...taskToRestore, isCompleted: taskToRestore.is_completed }] }
            : g
        );
      } else {
        return [...prev, {
          id: taskToRestore.group_name.toLowerCase(),
          name: taskToRestore.group_name,
          tasks: [{ ...taskToRestore, isCompleted: taskToRestore.is_completed }],
        }];
      }
    });
  };

  const handlePermanentlyDeleteTask = async (taskIdToDelete) => {
    if (!window.confirm('Це завдання не можна буде відновити. Видалити?')) return;
  
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskIdToDelete)
      .eq('user_id', user.id);
  
    if (error) {
      alert('Помилка видалення завдання: ' + error.message);
      return;
    }
  
    setTrash(trash.filter(task => task.id !== taskIdToDelete));
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

      <div className='div-exit'>
        <button onClick={() => supabase.auth.signOut()} className='exit-btn'>Вийти</button>
      </div>
    </div>
  );
}

export default App;
