import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/TaskForm.css'; // 1. Импортируем наш новый файл стилей

// Принимаем onAddTask в параметрах функции (проп) от родителя (App.jsx)
function TaskForm({ onAddTask }) {
  // --- СОСТОЯНИЯ (STATE) ---
  // Каждое поле ввода имеет свою "ячейку памяти"
  const [isIncome, setIsIncome] = useState(false); // Для слайдера: false - расход, true - доход
  const [group, setGroup] = useState('');         // Для названия группы
  const [taskName, setTaskName] = useState('');    // Для названия задачи
  const [amount, setAmount] = useState('');        // Для суммы
  const [isFixed, setIsFixed] = useState(false);   // Для флажка "Фиксированная сумма"

  // --- ОБРАБОТЧИК ОТПРАВКИ ---
  const handleSubmit = (event) => {
    // 1. Предотвращаем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();

    // 2. Проверяем, что важные поля заполнены. trim() убирает пробелы.
    if (!taskName.trim() || !amount || !group.trim()) {
      alert('Пожалуйста, заполните название группы, задачи и сумму!');
      return; // Прерываем выполнение функции, если проверка не пройдена
    }

    // 3. Собираем все данные из состояний в один объект
    const newTransaction = {
      type: isIncome ? 'income' : 'expense', // 'income' или 'expense'
      group: group.trim(),                   // .trim() убирает случайные пробелы по краям
      name: taskName.trim(),
      amount: Math.abs(parseFloat(amount)),  // Превращаем строку в число и берем по модулю
      isFixed: isFixed,
      id: uuidv4()                             // Генерируем уникальный ID для задачи
    };

    // 4. Вызываем функцию, полученную от родителя (App.jsx), и передаем ей новый объект
    onAddTask(newTransaction);

    // 5. Очищаем поля формы после успешной отправки для удобства пользователя
    // Поле группы не очищаем, т.к. пользователь скорее всего будет добавлять задачи в ту же группу
    setTaskName('');
    setAmount('');
    setIsFixed(false);
  };

  // --- JSX РАЗМЕТКА (То, что мы видим на экране) ---
  return (
    // Привязываем обработчик к событию onSubmit формы
    <form className="task-form" onSubmit={handleSubmit}>
      
      {/* Слайдер "Доход / Расход" */}
      <div className="type-slider">
        <span>Расход</span>
        <input
          type="checkbox"
          id="type-toggle"
          checked={isIncome}
          onChange={(e) => setIsIncome(e.target.checked)}
        />
        <label htmlFor="type-toggle"></label>
        <span>Доход</span>
      </div>

      {/* Группа полей для ввода */}
      <div className="inputs-group">
        <input
          type="text"
          placeholder="Название группы (напр. 'Продукты')"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <input
          type="text"
          placeholder="Название задачи (напр. 'Купить молоко')"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Сумма"
          min="0" // Запрещаем ввод отрицательных чисел
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Флажок фиксированной суммы */}
      <div className="fixed-amount">
        <input
          type="checkbox"
          id="is-fixed"
          checked={isFixed}
          onChange={(e) => setIsFixed(e.target.checked)}
        />
        <label htmlFor="is-fixed">Фиксированная сумма</label>
      </div>
      
      {/* Кнопка добавления */}
      <button type="submit">Добавить задачу</button>
    </form>
  );
}

export default TaskForm;