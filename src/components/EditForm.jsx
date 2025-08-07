import { useState } from 'react';
import './css/EditForm.css';

const CloseIcon = () => <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>;
const SaveIcon = () => <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6a1 1 0 10-2 0v5.586L7.707 10.293zM5 3a2 2 0 012-2h6a2 2 0 012 2v2a1 1 0 102 0V3a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-2a1 1 0 10-2 0v2a2 2 0 01-2 2H7a2 2 0 01-2-2V3z"></path></svg>;


function EditForm({ task, onUpdateTask, onCancelEdit }) {
  const [name, setName] = useState(task.name);
  const [amount, setAmount] = useState(task.amount);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(task.id, { name, amount: parseFloat(amount) || 0 });
  };

  return (
    <div className="edit-form-wrapper">
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            className="edit-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Назва задачі"
          />
          <input
            type="number"
            className="edit-input amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сума"
          />
        </div>

        <div className="form-actions">
          <button title="Скасувати" type="button" onClick={onCancelEdit} className="btn-icon cancel">
            <CloseIcon />
          </button>
          <button title="Зберегти" type="submit" className="btn-icon save">
            <SaveIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;