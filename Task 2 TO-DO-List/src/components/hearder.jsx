import { CheckSquare } from "lucide-react";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="header-card">
      <div className="header-content">
        <CheckSquare className="header-icon" />
        <h1 className="header-title">TaskFlow</h1>
      </div>
      <p className="header-description">
        Organize your tasks with style and efficiency
      </p>
    </div>
  );
}
