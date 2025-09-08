import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function B10() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const handleAddTask = () => {
    const title = taskInput.trim();
    if (!title) {
      Swal.fire("Lỗi", "Tên công việc không được để trống", "error");
      return;
    }
    if (tasks.some((t) => t.title === title)) {
      Swal.fire("Lỗi", "Tên công việc đã tồn tại", "error");
      return;
    }
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    setTaskInput("");
  };

  const handleDeleteTask = (id: number) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const title = editTitle.trim();
    if (!title) {
      Swal.fire("Lỗi", "Tên công việc không được để trống", "error");
      return;
    }
    if (tasks.some((t) => t.title === title && t.id !== editTask?.id)) {
      Swal.fire("Lỗi", "Tên công việc đã tồn tại", "error");
      return;
    }
    setTasks(
      tasks.map((t) =>
        t.id === editTask?.id ? { ...t, title } : t
      )
    );
    setShowModal(false);
    setEditTask(null);
    setEditTitle("");
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="container mt-4">
      <h2>Quản lý công việc</h2>
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
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditTask(task)}
              >
                Sửa
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTask(task.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3">
        Hoàn thành: {completedCount}/{tasks.length}
      </p>
      {tasks.length > 0 && completedCount === tasks.length && (
        <div className="alert alert-success">Hoàn thành công việc</div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Nhập tên công việc..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
