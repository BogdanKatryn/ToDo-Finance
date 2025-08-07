import TaskGroup from './TaskGroup';

const listStyle = {
  marginTop: '30px',
  width: '100%',
  maxWidth: '800px',
  margin: '30px auto',
  padding: '0 0px',
  boxSizing: 'border-box',
};

function TaskList({ groups, editingTaskId, onSetEditMode, onUpdateTask, onCancelEdit, onToggleTask, onDeleteTask }) {
  if (!groups || groups.length === 0) {
    return <p style={{ textAlign: 'center', color: '#94a3b8' }}>Пока нет ни одной задачи. Добавьте первую!</p>;
  }
  
  return (
    <div style={listStyle}>
      {groups.map(group => (
        <TaskGroup
          key={group.id}
          group={group}
          editingTaskId={editingTaskId}
          onSetEditMode={onSetEditMode}
          onUpdateTask={onUpdateTask}
          onCancelEdit={onCancelEdit}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;