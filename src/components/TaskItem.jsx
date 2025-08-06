import EditTaskForm from './EditTaskForm.jsx';
import './css/TaskItem.css'; 

const EditIcon = () => <svg fill="currentColor" viewBox="0 0 20 20" width="18" height="18"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>;
const DeleteIcon = () => <svg fill="currentColor" viewBox="0 0 20 20" width="18" height="18"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>;
const FixedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>;

function TaskItem({ task, isEditing, onSetEditMode, onUpdateTask, onCancelEdit, onToggleTask, onDeleteTask }) {
  const amountClass = task.type === 'income' ? 'income' : 'expense';

  const handleEditClick = (e) => {
    e.stopPropagation();
    isEditing ? onCancelEdit() : onSetEditMode(task.id);
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (task.isFixed) return;
    onToggleTask(task.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Вы уверены, что хотите удалить задачу "${task.name}"?`)) {
      onDeleteTask(task.id);
    }
  };

  return (
    <div className="task-item-wrapper">
      <div className={`task-item ${isEditing ? 'is-editing' : ''} ${task.isCompleted ? 'is-completed' : ''}`}>
        <div className="task-main-info">
          <button 
            onClick={handleToggleClick} 
            className="task-status-toggle"
            disabled={task.isFixed} 
            title={task.isFixed ? "Фиксированные суммы нельзя выполнить" : "Отметить как выполненное"}
          />
          <span className="task-name">{task.name}</span>
          {task.isFixed && (
            <span className="fixed-icon" title="Фиксированная сумма">
              <FixedIcon />
            </span>
          )}
        </div>
        <div className="task-details">
          <span className={`task-amount ${amountClass}`}>
            {task.type === 'income' ? '+' : '-'} {task.amount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₴
          </span>
          <div className="task-actions">
            <button title="Редактировать" onClick={handleEditClick} className="action-btn-edit">
              <EditIcon />
            </button>
            <button title="Удалить" onClick={handleDeleteClick} className="action-btn-delete">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditTaskForm
          task={task}
          onUpdateTask={onUpdateTask}
          onCancelEdit={onCancelEdit}
        />
      )}
    </div>
  );
}

export default TaskItem;