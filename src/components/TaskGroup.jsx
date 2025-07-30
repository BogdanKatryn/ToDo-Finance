// src/components/TaskGroup.jsx
import TaskItem from './TaskItem';
import './css/TaskGroup.css'

// Стили для группы
const groupStyle = {
  marginBottom: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
};

const groupNameStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px',
  borderBottom: '2px solid #ccc',
  paddingBottom: '5px',
};

// Принимаем {group} как проп. Это объект группы с названием и массивом задач.
function TaskGroup({ group }) {
  return (
    <div style={groupStyle}>
      <h3 style={groupNameStyle}>{group.name}</h3>
      <div>
        {/* 
          Пробегаемся по массиву задач (group.tasks) и для каждой задачи
          создаем компонент <TaskItem>, передавая в него данные этой задачи.
          Атрибут key={task.id} очень важен! Он помогает React эффективно
          обновлять список, когда элементы добавляются или удаляются.
        */}
        {group.tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskGroup;