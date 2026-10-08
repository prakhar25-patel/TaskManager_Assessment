function PriorityBadge({ priority }) {
  return (
    <span
      className={`badge priority-${priority}`}
    >
      {priority?.charAt(0).toUpperCase() +
        priority?.slice(1)}
    </span>
  );
}

export default PriorityBadge;