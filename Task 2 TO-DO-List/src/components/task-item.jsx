import { useState } from "react";
import { CheckSquare, Edit, Trash, Save, X } from "lucide-react";
import "../styles/task-item.css";

export default function TaskItem({
  task,
  toggleTaskCompletion,
  editTask,
  deleteTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditSave = () => {
    if (editedText.trim() !== "") {
      editTask(task.id, editedText);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <button
          className="task-checkbox"
          onClick={() => toggleTaskCompletion(task.id)}
          aria-label={`Mark task "${task.text}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
        >
          {task.completed && <CheckSquare className="checkbox-icon" />}
        </button>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="task-edit-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSave();
              if (e.key === "Escape") handleEditCancel();
            }}
          />
        ) : (
          <span className="task-text">{task.text}</span>
        )}
      </div>
      <div className="task-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleEditSave}
              className="action-button save-button"
              aria-label="Save changes"
            >
              <Save className="action-icon" />
            </button>
            <button
              onClick={handleEditCancel}
              className="action-button cancel-button"
              aria-label="Cancel editing"
            >
              <X className="action-icon" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="action-button edit-button"
              aria-label={`Edit task "${task.text}"`}
            >
              <Edit className="action-icon" />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="action-button delete-button"
              aria-label={`Delete task "${task.text}"`}
            >
              <Trash className="action-icon" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
