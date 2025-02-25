/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getAllTasks, addTask, updateTask, removeTask } from "./services/todo-service";
import Home from "./page";

jest.mock("./services/todo-service", () => ({
  getAllTasks: jest.fn(() => {}),
  addTask: jest.fn(),
  updateTask: jest.fn(),
  removeTask: jest.fn()
}));

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page title", async () => {
    (getAllTasks as jest.Mock).mockResolvedValue([]);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/to do list/i)).toBeInTheDocument();
    });
  });

  it("should load and display tasks", async () => {
    (getAllTasks as jest.Mock).mockResolvedValue([{ id: "1", task: "Test Task", done: false }]);
    render(<Home />);
    await waitFor(() => expect(screen.getByText("Test Task")).toBeInTheDocument());
  });

  it("should add a new task", async () => {
    (getAllTasks as jest.Mock).mockResolvedValue([]);
    (addTask as jest.Mock).mockResolvedValue({ id: "2", task: "New Task", done: false });

    render(<Home />);

    const input = screen.getByPlaceholderText("Nova tarefa");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(screen.getByText("Adicionar tarefa"));

    await waitFor(() => expect(screen.getByText("New Task")).toBeInTheDocument());
  });

  it("should prevent adding duplicate tasks", async () => {
    (getAllTasks as jest.Mock).mockResolvedValue([{ id: "1", task: "Existing Task", done: false }]);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Existing Task")).toBeVisible();
    });

    const input = screen.getByPlaceholderText("Nova tarefa");

    fireEvent.change(input, { target: { value: "Existing Task" } });
    fireEvent.click(screen.getByText("Adicionar tarefa"));

    await waitFor(() => expect(screen.getByText("Já existe uma tarefa com esse nome!"))); // Toast
  });

  it("should mark a task as done", async () => {
    (getAllTasks as jest.Mock).mockResolvedValue([{ id: "3", task: "Complete Task", done: false }]);
    (updateTask as jest.Mock).mockResolvedValue({});
    render(<Home />);

    await waitFor(() => screen.getByText("Complete Task"));
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => expect(updateTask).toHaveBeenCalledWith("3", true));
  });

  it("should delete a task", async () => {
    (getAllTasks as jest.Mock).mockResolvedValue([{ id: "4", task: "Delete Task", done: false }]);
    (removeTask as jest.Mock).mockResolvedValue({});
    render(<Home />);

    await waitFor(() => screen.getByText("Delete Task"));
    fireEvent.click(screen.getByTitle("Delete ToDo"));

    await waitFor(() => expect(removeTask).toHaveBeenCalledWith("4"));
  });
});
