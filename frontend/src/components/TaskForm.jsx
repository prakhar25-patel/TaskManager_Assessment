import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: ""
};

function TaskForm({
  task,
  onSubmit,
  onCancel,
  loading
}) {
  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description:
          task.description || "",
        status:
          task.status || "pending",
        priority:
          task.priority || "medium",
        dueDate:
          task.dueDate
            ? task.dueDate.slice(0, 10)
            : ""
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [task]);

  function handleChange(event) {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title =
        "Title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Description is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      title: form.title.trim(),
      description:
        form.description.trim(),
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate || null
    });
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="title">
          Title *
        </label>

        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />

        {errors.title && (
          <span className="field-error">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description *
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
        />

        {errors.description && (
          <span className="field-error">
            {errors.description}
          </span>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">
              Pending
            </option>

            <option value="in_progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">
          Due Date
        </label>

        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : task
              ? "Update Task"
              : "Create Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;