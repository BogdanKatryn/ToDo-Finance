import { useState } from 'react';
import './css/EditTaskForm.css';

// --- Иконки для кнопок ---
const CloseIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const SaveIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

function EditTaskForm({ task, onUpdateTask, onCancelEdit }) {
  // --- Состояния для полей ввода ---
  const [group, setGroup] = useState(task.group);
  const [name, setName] = useState(task.name);
  const [amount, setAmount] = useState(task.amount);
  const [isIncome, setIsIncome] = useState(task.type === 'income');
  const [isFixed, setIsFixed] = useState(task.isFixed);

  // --- Обработчик отправки формы ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      group,
      name,
      amount: parseFloat(amount) || 0,
      type: isIncome ? 'income' : 'expense',
      isFixed,
    };
    onUpdateTask(task.id, updatedData);
  };

  return (
    <div className="edit-task-form-wrapper">
      <form className="edit-task-form" onSubmit={handleSubmit}>
        
        {/* --- ИЗМЕНЕНИЕ №1 --- */}
        {/* Это поле теперь находится само по себе и будет занимать всю ширину */}
        <input
          type="text"
          className="edit-input"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="Название группы"
        />
        
        {/* --- ИЗМЕНЕНИЕ №2 --- */}
        {/* А эти два поля остались в контейнере .form-row */}
        <div className="form-row">
          <input
            type="text"
            className="edit-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название задачи"
          />
          <input
            type="number"
            className="edit-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сумма"
          />
        </div>
        
        {/* Переключатель "Витрата / Дохід" */}
        <div className={`type-selector ${isIncome ? 'income-active' : ''}`}>
          <div className="sliding-background"></div>
          <button type="button" onClick={() => setIsIncome(false)}>Витрата</button>
          <button type="button" onClick={() => setIsIncome(true)}>Дохід</button>
        </div>

        {/* Чекбокс "Фиксированная сумма" */}
        <div className="fixed-amount">
          <input
            type="checkbox"
            id={`is-fixed-${task.id}`}
            checked={isFixed}
            onChange={(e) => setIsFixed(e.target.checked)}
          />
          <label htmlFor={`is-fixed-${task.id}`}>Фіксована сума</label>
        </div>
        
        {/* Кнопки управления */}
        <div className="form-actions">
          <button title="Отменить" type="button" onClick={onCancelEdit} className="btn-icon cancel">
            <CloseIcon />
          </button>
          <button title="Сохранить" type="submit" className="btn-icon save">
            <SaveIcon />
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditTaskForm;