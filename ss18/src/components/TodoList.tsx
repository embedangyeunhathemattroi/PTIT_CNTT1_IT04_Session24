import React, { useReducer } from "react";
import { FaHeartPulse } from "react-icons/fa6";

type Job = {
  id: number;
  title: string;
  completed: boolean;
};

type State = {
  jobs: Job[];
  new_title: string;
};

type Action =
  | { type: "ADD"; payload: Job }
  | { type: "EDIT"; payload: Job }
  | { type: "DELETE"; payload: number }
  | { type: "CHANGE_TITLE"; payload: string };

export default function TodoList() {
  const initial: State = {
    jobs: [
      {
        id: 1,
        title: "hoc C++",
        completed: true,
      },
      {
        id: 2,
        title: "hoc JS",
        completed: false,
      },
    ],
    new_title: "",
  };

  const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "CHANGE_TITLE":
        return { ...state, new_title: action.payload };

      case "ADD":
        return {
          ...state,
          jobs: [...state.jobs, action.payload],
          new_title: "",
        };

      case "EDIT":
        return {
          ...state,
          jobs: state.jobs.map((job) =>
            job.id === action.payload.id ? action.payload : job
          ),
        };

      case "DELETE":
        return {
          ...state,
          jobs: state.jobs.filter((job) => job.id !== action.payload),
        };

      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(todoReducer, initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_TITLE", payload: e.target.value });
  };

  const addTodo = () => {
    if (!todos.new_title.trim()) return;
    const newTodo: Job = {
      id: Math.floor(Math.random() * 9999),
      title: todos.new_title,
      completed: false,
    };
    dispatch({ type: "ADD", payload: newTodo });
  };

  const deleteJob = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const fixJob = (item: Job) => {
    const newTitle = prompt("Nhập tiêu đề mới:", item.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      const updatedJob: Job = { ...item, title: newTitle };
      dispatch({ type: "EDIT", payload: updatedJob });
    }
  };

  return (
    <div>
      <h2>TodoList</h2>
      <input onChange={handleChange} value={todos.new_title} type="text" />
      <button onClick={addTodo}>Thêm công việc</button>

      <h3>DANH SÁCH CÔNG VIỆC</h3>
      <ul>
        {todos.jobs.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => deleteJob(item.id)}>Xoá</button>
            <button onClick={() => fixJob(item)}>Sửa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
