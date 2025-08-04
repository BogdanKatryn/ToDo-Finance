import TaskGroup from './TaskGroup';

const listStyle = {
  marginTop: '30px',
  width: '100%',
  maxWidth: '800px',
  margin: '30px auto',
  padding: '0 10px',
  boxSizing: 'border-box',
};

function TaskList({ groups }) {
  if (!groups || groups.length === 0) {
    return <p style={{ textAlign: 'center', color: '#94a3b8' }}>Пока нет ни одной задачи. Добавьте первую!</p>;
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