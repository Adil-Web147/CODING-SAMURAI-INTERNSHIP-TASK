import Header from "./components/hearder.jsx";
import TaskInput from "./components/task-input.jsx";
import FilterButtons from "./components/filter-buttons.jsx";
import TaskSummary from "./components/task-summary.jsx";
import TaskList from "./components/task-list.jsx";
import ThemeToggle from "./components/theme-toggle.jsx";
import "../src/styles/App.css";
import "../src/styles/golbals.css";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const addTask = (text) => {
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app-container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="main-content-wrapper">
        <Header />
        <TaskInput addTask={addTask} />
        <FilterButtons currentFilter={filter} setFilter={setFilter} />
        <TaskSummary
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
