import TaskItem from "./task-item.jsx";
import { FileText, ListTodo } from "lucide-react";
import "../styles/task-list.css";

export default function TaskList({
  tasks,
  toggleTaskCompletion,
  editTask,
  deleteTask,
}) {
  return (
    <div className="task-list-card">
      <h2 className="task-list-title">
        <FileText className="task-list-title-icon" />
        Your Tasks
      </h2>
      {tasks.length === 0 ? (
        <div className="no-tasks-message">
          <div className="no-tasks-icon-wrapper">
            <ListTodo className="no-tasks-icon" />
          </div>
          <p className="no-tasks-text">No tasks yet</p>
          <p className="no-tasks-subtext">
            Add your first task to get started!
          </p>
        </div>
      ) : (
        <ul className="task-items-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
