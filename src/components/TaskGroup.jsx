import TaskItem from './TaskItem';
import './css/TaskGroup.css';

function TaskGroup({ group }) {
  return (
    <div className="task-group">
      <div className="task-group-header">
        <h3 className="task-group-name">{group.name}</h3>
      </div>
      <div>
        {group.tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskGroup;