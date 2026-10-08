const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong."
    );

    error.status = response.status;
    error.details = data.errors;

    throw error;
  }

  return data;
}

export async function getTasks() {
  return request("/tasks");
}

export async function getTask(id) {
  return request(`/tasks/${id}`);
}

export async function createTask(task) {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(task)
  });
}

export async function updateTask(id, task) {
  return request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task)
  });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: "DELETE"
  });
}