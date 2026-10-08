import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function TaskCard({
  task,
  onView,
  onEdit,
  onDelete
}) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <h3>{task.title}</h3>

          <p className="task-date">
            Created{" "}
            {new Date(
              task.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <PriorityBadge
          priority={task.priority}
        />
      </div>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-meta">
        <StatusBadge status={task.status} />

        <span>
          Due:{" "}
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "No due date"}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onView(task)}
        >
          View
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;