// src/components/TaskList.jsx
import TaskGroup from './TaskGroup';

const listStyle = {
  marginTop: '30px',
  width: '100%',
  maxWidth: '800px', // Ограничим ширину для больших экранов
  margin: '30px auto', // Центрируем
};

// Принимаем {groups} как проп. Это весь массив наших групп.
function TaskList({ groups }) {
  // Если групп нет, показываем сообщение
  if (groups.length === 0) {
    return <p style={{ textAlign: 'center', color: 'white' }}>Пока нет ни одной задачи. Добавьте первую!</p>;
  }
  
  return (
    <div style={listStyle}>
      {groups.map(group => (
        <TaskGroup key={group.id} group={group} />
      ))}
    </div>
  );
}

export default TaskList;