import './css/Summary.css';
function Summary({ total }) {
  const valueClass = total > 0 ? 'positive' : total < 0 ? 'negative' : 'zero';
  const formattedTotal = total.toLocaleString('ru-RU');

  return (
    <div className="summary-card">
      <span className="summary-label">Загальний баланс:</span>
      <span className={`summary-value ${valueClass}`}>
        {formattedTotal} ₴
      </span>
    </div>
  );
}

export default Summary;