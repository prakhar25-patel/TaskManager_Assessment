const { randomUUID } = require("crypto");

const tasks = [
  {
    id: randomUUID(),
    title: "Complete assignment",
    description: "Build the full-stack task management system.",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-10-12",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    title: "Review React concepts",
    description: "Revise React hooks and component architecture.",
    status: "pending",
    priority: "medium",
    dueDate: "2026-10-15",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const VALID_STATUSES = [
  "pending",
  "in_progress",
  "completed"
];

const VALID_PRIORITIES = [
  "low",
  "medium",
  "high"
];

function validateTaskData(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.title !== undefined) {
    if (
      typeof data.title !== "string" ||
      data.title.trim().length === 0
    ) {
      errors.push("Title is required.");
    }
  }

  if (!isUpdate || data.description !== undefined) {
    if (
      typeof data.description !== "string" ||
      data.description.trim().length === 0
    ) {
      errors.push("Description is required.");
    }
  }

  if (data.status !== undefined) {
    if (!VALID_STATUSES.includes(data.status)) {
      errors.push(
        `Status must be one of: ${VALID_STATUSES.join(", ")}.`
      );
    }
  }

  if (data.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(data.priority)) {
      errors.push(
        `Priority must be one of: ${VALID_PRIORITIES.join(", ")}.`
      );
    }
  }

  if (
    data.dueDate !== undefined &&
    data.dueDate !== null &&
    data.dueDate !== ""
  ) {
    const date = new Date(data.dueDate);

    if (Number.isNaN(date.getTime())) {
      errors.push("Due date must be a valid date.");
    }
  }

  return errors;
}

function getAllTasks() {
  return [...tasks];
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(data) {
  const errors = validateTaskData(data);

  if (errors.length > 0) {
    const error = new Error("Validation failed.");
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const now = new Date().toISOString();

  const task = {
    id: randomUUID(),
    title: data.title.trim(),
    description: data.description.trim(),
    status: data.status || "pending",
    priority: data.priority || "medium",
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);

  return task;
}

function updateTask(id, data) {
  const task = getTaskById(id);

  if (!task) {
    const error = new Error("Task not found.");
    error.statusCode = 404;
    throw error;
  }

  const errors = validateTaskData(data, true);

  if (errors.length > 0) {
    const error = new Error("Validation failed.");
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  if (data.title !== undefined) {
    task.title = data.title.trim();
  }

  if (data.description !== undefined) {
    task.description = data.description.trim();
  }

  if (data.status !== undefined) {
    task.status = data.status;
  }

  if (data.priority !== undefined) {
    task.priority = data.priority;
  }

  if (data.dueDate !== undefined) {
    task.dueDate = data.dueDate || null;
  }

  task.updatedAt = new Date().toISOString();

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    const error = new Error("Task not found.");
    error.statusCode = 404;
    throw error;
  }

  const deletedTask = tasks[index];

  tasks.splice(index, 1);

  return deletedTask;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};