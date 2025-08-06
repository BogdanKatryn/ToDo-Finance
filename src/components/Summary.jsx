import './css/Summary.css'; // Подключаем стили, которые создадим на следующем шаге

// Компонент принимает один проп - 'total' (общая сумма)
function Summary({ total }) {

  // Определяем, какой класс присвоить в зависимости от суммы
  const valueClass = total > 0 ? 'positive' : total < 0 ? 'negative' : 'zero';

  // Форматируем число, чтобы оно было читаемым (например, 1 000 000 вместо 1000000)
  const formattedTotal = total.toLocaleString('ru-RU');

  return (
    <div className="summary-card">
      <span className="summary-label">Общий баланс:</span>
      <span className={`summary-value ${valueClass}`}>
        {formattedTotal} ₴
      </span>
    </div>
  );
}

export default Summary;