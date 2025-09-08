import React, { useReducer, useState } from "react";

type Job = {
  id: number;
  title: string;
  completed: boolean;
};

export default function B8() {
  const [newTitle, setNewTitle] = useState("");
  const initialState: Job[] = [
    { id: 1, title: "Học C++", completed: true },
    { id: 2, title: "Học JS", completed: false },
  ];
  const [jobs, dispatch] = useReducer(
    (state: Job[], action: { type: string; payload?: any }) => {
      switch (action.type) {
        case "ADD":
          return [...state, { id: Date.now(), title: action.payload, completed: false }];
        case "TOGGLE":
          return state.map((job) =>
            job.id === action.payload ? { ...job, completed: !job.completed } : job
          );
        case "DELETE":
          const newJobs = [...state];
          const index = newJobs.findIndex((job) => job.id === action.payload);
          if (index !== -1) newJobs.splice(index, 1);
          return newJobs;
        default:
          return state;
      }
    },
    initialState
  );
  const handleAdd = () => {
    if (!newTitle.trim()) return;
    dispatch({ type: "ADD", payload: newTitle });
    setNewTitle("");
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Nhập công việc..."
      />
      <button onClick={handleAdd}>Thêm</button>

      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <span
              style={{
                textDecoration: job.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => dispatch({ type: "TOGGLE", payload: job.id })}
            >
              {job.title}
            </span>
           <button 
  onClick={() => dispatch({ type: "DELETE", payload: job.id })}
  style={{ backgroundColor: "red", color: "white" }}
>
  Xóa
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
