import { useState } from "react";
import { Plus } from "lucide-react";
import "../styles/task-input.css";

export default function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskText);
    setTaskText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-card">
      <input
        type="text"
        placeholder="What needs to be done today?"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="task-input-field"
      />
      <button type="submit" className="add-task-button">
        <Plus className="add-task-icon" />
        Add Task
      </button>
    </form>
  );
}
