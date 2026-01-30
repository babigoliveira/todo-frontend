import { TaskRow } from "./TaskRow";
import type { ToDo } from "../types/todo";

type TaskListProps = {
  tasks: ToDo[];
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};
export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) return <p className="mt-6 text-center text-sm text-gray-400">Nenhuma tarefa exite aqui.</p>;

  return (
    <div className="mx-4 mt-4 rounded-lg border border-gray-500">
      {tasks.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id, task.done)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task.id)}
        />
      ))}
    </div>
  );
}
