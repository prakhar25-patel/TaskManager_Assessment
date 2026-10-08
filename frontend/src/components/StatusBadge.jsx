function StatusBadge({ status }) {
  const labels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed"
  };

  return (
    <span
      className={`badge status-${status}`}
    >
      {labels[status] || status}
    </span>
  );
}

export default StatusBadge;