import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Flag } from "./Flag";

type TaskRowProps = {
  task: ToDo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export function TaskRow({ task, onToggle, onDelete, onEdit }: TaskRowProps) {
  return (
    <div className="flex items-center justify-between px-3 py-3 border-gray-500 border-b last:border-b-0">
      <div className="flex items-center gap-2">
        <input type="checkbox" className="accent-emerald-500" checked={!!task.done} onChange={onToggle} />

        <span className={`text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>{task.task}</span>
      </div>

      <div className="flex items-center gap-4">
        <Flag flag={task.flag} />

        <button onClick={onEdit}>
          <FiEdit2 className="text-gray-400 hover:text-gray-600" />
        </button>

        <button onClick={onDelete}>
          <FaRegTrashAlt className="text-gray-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}
