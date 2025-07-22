import { ListTodo, Clock, Check } from "lucide-react";
import "../styles/filter-buttons.css";

export default function FilterButtons({ currentFilter, setFilter }) {
  return (
    <div className="filter-buttons-card">
      <button
        className={`filter-button ${currentFilter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}
      >
        <ListTodo className="filter-icon" />
        All Tasks
      </button>
      <button
        className={`filter-button ${
          currentFilter === "pending" ? "active" : ""
        }`}
        onClick={() => setFilter("pending")}
      >
        <Clock className="filter-icon" />
        Pending
      </button>
      <button
        className={`filter-button ${
          currentFilter === "completed" ? "active" : ""
        }`}
        onClick={() => setFilter("completed")}
      >
        <Check className="filter-icon" />
        Completed
      </button>
    </div>
  );
}
