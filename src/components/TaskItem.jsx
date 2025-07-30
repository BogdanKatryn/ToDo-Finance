// src/components/TaskItem.jsx
import './css/TaskItem.css'
// Мы сразу добавим базовые стили прямо в компонент для наглядности
const taskItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  };
  
  const taskNameStyle = {
    fontSize: '16px',
  };
  
  const amountStyle = {
    fontWeight: 'bold',
  };
  
  // Принимаем {task} как проп. Это объект с данными одной задачи.
  function TaskItem({ task }) {
    // Определяем цвет в зависимости от типа транзакции
    const color = task.type === 'income' ? 'green' : 'red';
  
    return (
      <div style={taskItemStyle}>
        <span style={taskNameStyle}>{task.name}</span>
        
        <div>
          <span style={{ ...amountStyle, color: color }}>
            {task.type === 'income' ? '+' : '-'} {task.amount} ₴
          </span>
          {/* Здесь позже будут кнопки "изменить" и "удалить" */}
        </div>
      </div>
    );
  }
  
  export default TaskItem;