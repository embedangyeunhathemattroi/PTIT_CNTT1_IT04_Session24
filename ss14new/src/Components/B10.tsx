import React, { Component } from "react";

// Định nghĩa kiểu dữ liệu cho 1 công việc
type Todo = {
  id: number;
  title: string;
};

// Định nghĩa state
type StateType = {
  todos: Todo[]; // danh sách công việc
  newTask: string; // công việc mới đang nhập
  error: string; // thông báo lỗi
};

export default class TodoList extends Component<object, StateType> {
  constructor(props: object) {
    super(props);
    this.state = {
      todos: [],
      newTask: "",
      error: "",
    };
  }

  // Xử lý thay đổi ô input
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTask: e.target.value, error: "" });
  };

  // Xử lý thêm công việc
  handleAddTask = () => {
    const { newTask, todos } = this.state;

    // validate dữ liệu
    if (!newTask.trim()) {
      this.setState({ error: "Tên công việc không được để trống!" });
      return;
    }

    const isDuplicate = todos.some(
      (task) => task.title.toLowerCase() === newTask.toLowerCase()
    );
    if (isDuplicate) {
      this.setState({ error: "Tên công việc đã tồn tại!" });
      return;
    }

    // Nếu hợp lệ -> thêm công việc
    const newTodo: Todo = {
      id: Date.now(),
      title: newTask,
    };

    this.setState({
      todos: [...todos, newTodo],
      newTask: "",
      error: "",
    });
  };

  // Xóa công việc
  handleDelete = (id: number) => {
    this.setState({
      todos: this.state.todos.filter((task) => task.id !== id),
    });
  };

  render() {
    const { todos, newTask, error } = this.state;

    return (
      <div style={{ maxWidth: "400px", margin: "20px auto" }}>
        <h2>Todo List</h2>
        <input
          type="text"
          value={newTask}
          onChange={this.handleChange}
          placeholder="Nhập công việc..."
        />
        <button onClick={this.handleAddTask}>Thêm</button>

        {/* Thông báo lỗi */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul>
          {todos.map((task) => (
            <li key={task.id}>
              {task.title}{" "}
              <button onClick={() => this.handleDelete(task.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
