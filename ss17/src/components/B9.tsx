import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

export default function B9() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      Swal.fire("Lỗi", "Tên công việc không được để trống", "error");
      return;
    }
    if (tasks.includes(taskInput.trim())) {
      Swal.fire("Lỗi", "Tên công việc đã tồn tại", "error");
      return;
    }
    setTasks([...tasks, taskInput.trim()]);
    setTaskInput("");
  };

  const handleDeleteTask = (index: number) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Công việc sẽ bị xóa vĩnh viễn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTasks = tasks.filter((task, idx) => idx !== index);
        setTasks(newTasks);
        Swal.fire("Đã xóa!", "Công việc đã được xóa.", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Todo App</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nhập công việc..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Thêm
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteTask(index)}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
