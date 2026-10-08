import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function TaskDetailsModal({
  task,
  onClose
}) {
  if (!task) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>Task Details</h2>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="details-content">
          <div className="detail-item">
            <span className="detail-label">
              Title
            </span>

            <strong>{task.title}</strong>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Description
            </span>

            <p>{task.description}</p>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">
                Status
              </span>

              <StatusBadge
                status={task.status}
              />
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Priority
              </span>

              <PriorityBadge
                priority={task.priority}
              />
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">
                Due Date
              </span>

              <span>
                {task.dueDate
                  ? new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  : "No due date"}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Created
              </span>

              <span>
                {new Date(
                  task.createdAt
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Last Updated
            </span>

            <span>
              {new Date(
                task.updatedAt
              ).toLocaleString()}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Task ID
            </span>

            <code>{task.id}</code>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;