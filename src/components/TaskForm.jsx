import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/TaskForm.css';

function TaskForm({ onAddTask }) {
  const [isIncome, setIsIncome] = useState(false);
  const [group, setGroup] = useState('');
  const [taskName, setTaskName] = useState('');
  const [amount, setAmount] = useState('');
  const [isFixed, setIsFixed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName.trim() || !amount || !group.trim()) {
      alert('Будь ласка, заповніть назву групи, завдання та суму!');
      return;
    }
    const newTransaction = {
      type: isIncome ? 'income' : 'expense',
      group: group.trim(),
      title: taskName.trim(),   // <-- здесь изменено
      amount: Math.abs(parseFloat(amount)),
      isFixed: isFixed,
      id: uuidv4()
    };
    onAddTask(newTransaction);
    setTaskName('');
    setAmount('');
    setIsFixed(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className={`type-selector ${isIncome ? 'income-active' : ''}`}>
        <div className="sliding-background"></div>
        <button type="button" className="expense" onClick={() => setIsIncome(false)}>Витрата</button>
        <button type="button" className="income" onClick={() => setIsIncome(true)}>Дохід</button>
      </div>

      <div className="inputs-group">
        <input type="text" placeholder="Назва групи" value={group} onChange={(e) => setGroup(e.target.value)} className='placeholder-color' />
        <input type="text" placeholder="Назва задачі" value={taskName} onChange={(e) => setTaskName(e.target.value)} className='placeholder-color' />
        <input type="number" placeholder="Сума" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className='placeholder-color' />
      </div>

      <div className="fixed-amount">
        <input type="checkbox" id="is-fixed" checked={isFixed} onChange={(e) => setIsFixed(e.target.checked)} />
        <label htmlFor="is-fixed">Фіксована сума</label>
      </div>
      
      <button type="submit">Додати завдання</button>
    </form>
  );
}

export default TaskForm;
