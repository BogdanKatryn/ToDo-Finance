import './css/TaskItem.css'
function TaskItem({ task }) {
  const amountClass = task.type === 'income' ? 'income' : 'expense';

  return (
    <div className="task-item">
      <span className="task-name">{task.name}</span>
      <div>
        <span className={`task-amount ${amountClass}`}>
          {task.type === 'income' ? '+' : '-'} {task.amount} ₴
        </span>
      </div>
    </div>
  );
}

export default TaskItem;