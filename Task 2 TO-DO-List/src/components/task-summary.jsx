import { ListTodo, CheckCircle, Hourglass } from "lucide-react";
import "../styles/task-summary.css";

export default function TaskSummary({
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  return (
    <div className="task-summary-grid">
      <div className="summary-card">
        <div className="summary-icon-wrapper icon-total">
          <ListTodo className="summary-icon" />
        </div>
        <span className="summary-count">{totalTasks}</span>
        <span className="summary-label">Total Tasks</span>
      </div>
      <div className="summary-card">
        <div className="summary-icon-wrapper icon-completed">
          <CheckCircle className="summary-icon" />
        </div>
        <span className="summary-count">{completedTasks}</span>
        <span className="summary-label">Completed</span>
      </div>
      <div className="summary-card">
        <div className="summary-icon-wrapper icon-pending">
          <Hourglass className="summary-icon" />
        </div>
        <span className="summary-count">{pendingTasks}</span>
        <span className="summary-label">Pending</span>
      </div>
    </div>
  );
}
