import { useEffect, useMemo, useState } from "react";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "../services/taskApi";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskDetailsModal from "../components/TaskDetailsModal";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [formLoading, setFormLoading] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("newest");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks();

      setTasks(response.data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(formData) {
    try {
      setFormLoading(true);
      setError("");

      if (editingTask) {
        const response =
          await updateTask(
            editingTask.id,
            formData
          );

        setTasks((previous) =>
          previous.map((task) =>
            task.id === editingTask.id
              ? response.data
              : task
          )
        );
      } else {
        const response =
          await createTask(formData);

        setTasks((previous) => [
          response.data,
          ...previous
        ]);
      }

      setFormOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError(
        err.message ||
          "Failed to save task."
      );
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(task) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTask(task.id);

      setTasks((previous) =>
        previous.filter(
          (item) => item.id !== task.id
        )
      );

      if (
        selectedTask?.id === task.id
      ) {
        setSelectedTask(null);
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to delete task."
      );
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function handleCreate() {
    setEditingTask(null);
    setFormOpen(true);
  }

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((task) => {
        return (
          task.title
            .toLowerCase()
            .includes(searchValue) ||
          task.description
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (task) =>
          task.status === statusFilter
      );
    }

    if (priorityFilter !== "all") {
      result = result.filter(
        (task) =>
          task.priority ===
          priorityFilter
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1
      };

      result.sort(
        (a, b) =>
          priorityOrder[b.priority] -
          priorityOrder[a.priority]
      );
    }

    if (sortBy === "dueAsc") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return (
          new Date(a.dueDate) -
          new Date(b.dueDate)
        );
      });
    }

    if (sortBy === "dueDesc") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return (
          new Date(b.dueDate) -
          new Date(a.dueDate)
        );
      });
    }

    return result;
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    sortBy
  ]);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Task Manager</h1>

          <p>
            Manage your tasks efficiently.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleCreate}
        >
          + New Task
        </button>
      </header>

      <main className="container">
        {error && (
          <div className="alert error-alert">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
            >
              ×
            </button>
          </div>
        )}

        <section className="toolbar">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search title or description..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              All statuses
            </option>

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

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              All priorities
            </option>

            <option value="high">
              High
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="low">
              Low
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="newest">
              Newest first
            </option>

            <option value="oldest">
              Oldest first
            </option>

            <option value="priority">
              Priority
            </option>

            <option value="dueAsc">
              Due date ↑
            </option>

            <option value="dueDesc">
              Due date ↓
            </option>
          </select>
        </section>

        {loading ? (
          <div className="state">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="state empty-state">
            <h2>No tasks found</h2>

            <p>
              {tasks.length === 0
                ? "Create your first task to get started."
                : "Try changing your search or filters."}
            </p>

            {tasks.length === 0 && (
              <button
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Create your first task
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="task-summary">
              Showing{" "}
              <strong>
                {filteredTasks.length}
              </strong>{" "}
              of{" "}
              <strong>{tasks.length}</strong>{" "}
              tasks
            </div>

            <section className="task-grid">
              {filteredTasks.map(
                (task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onView={
                      setSelectedTask
                    }
                    onEdit={
                      handleEdit
                    }
                    onDelete={
                      handleDelete
                    }
                  />
                )
              )}
            </section>
          </>
        )}
      </main>

      {formOpen && (
        <div
          className="modal-overlay"
          onClick={() =>
            !formLoading &&
            setFormOpen(false)
          }
        >
          <div
            className="modal form-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <h2>
                {editingTask
                  ? "Edit Task"
                  : "Create Task"}
              </h2>

              <button
                className="close-button"
                onClick={() =>
                  !formLoading &&
                  setFormOpen(false)
                }
              >
                ×
              </button>
            </div>

            <TaskForm
              task={editingTask}
              onSubmit={
                handleSubmit
              }
              onCancel={() =>
                setFormOpen(false)
              }
              loading={formLoading}
            />
          </div>
        </div>
      )}

      <TaskDetailsModal
        task={selectedTask}
        onClose={() =>
          setSelectedTask(null)
        }
      />
    </div>
  );
}

export default Dashboard;