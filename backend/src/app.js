const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigin =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task API is running."
  });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

app.use(errorHandler);

module.exports = app;