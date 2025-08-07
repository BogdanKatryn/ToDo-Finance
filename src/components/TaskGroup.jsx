import TaskItem from './TaskItem';
import './css/TaskGroup.css'; 

function TaskGroup({ group, editingTaskId, onSetEditMode, onUpdateTask, onCancelEdit, onToggleTask, onDeleteTask }) {
  const groupTotal = group.tasks.reduce((sum, task) => {
    if (task.isCompleted) {
      return sum;
    }
    return task.type === 'income' ? sum + task.amount : sum - task.amount;
  }, 0);

  const totalClass = groupTotal > 0 ? 'positive' : groupTotal < 0 ? 'negative' : 'zero';
  const formattedTotal = groupTotal.toLocaleString('ru-RU');

  return (
    <div className="task-group">
      <div className="task-group-header">
        <h3 className="task-group-name">{group.name}</h3>
        <span className={`group-total ${totalClass}`}>
          {groupTotal > 0 ? '+' : ''}{formattedTotal} ₴
        </span>
      </div>
      <div>
        {group.tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            isEditing={task.id === editingTaskId}
            onSetEditMode={onSetEditMode}
            onUpdateTask={onUpdateTask}
            onCancelEdit={onCancelEdit}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskGroup;