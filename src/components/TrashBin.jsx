// Убедитесь, что путь к CSS правильный для вашей структуры
import './css/TrashBin.css'; 

// --- Иконки для кнопок ---
const RestoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>;
const FinalDeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

// --- Компонент теперь принимает новую функцию onEmptyTrash ---
function TrashBin({ trash, onRestoreTask, onPermanentlyDeleteTask, onEmptyTrash }) {
  return (
    <div className="trash-bin-card">
      <h3 className="trash-bin-header">Корзина</h3>
      {trash.length === 0 ? (
        <p className="trash-empty-message">Корзина пуста</p>
      ) : (
        <>
          <div className="trash-list">
            {trash.map(task => (
              <div key={task.id} className="trash-item">
                <div className="trash-item-info">
                  <span className="trash-item-name">{task.name}</span>
                  <span className="trash-item-group">(Группа: {task.group})</span>
                </div>
                <div className="trash-item-actions">
                  <button onClick={() => onRestoreTask(task)} className="btn-trash restore" title="Восстановить">
                    <RestoreIcon />
                  </button>
                  <button onClick={() => onPermanentlyDeleteTask(task.id)} className="btn-trash delete-final" title="Удалить навсегда">
                    <FinalDeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* --- Новый "подвал" с кнопкой очистки --- */}
          <div className="trash-bin-footer">
            <button onClick={onEmptyTrash} className="btn-empty-trash">
              Очистить корзину
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TrashBin;