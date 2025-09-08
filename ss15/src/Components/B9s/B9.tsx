import { Component } from "react";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

type InitialState = {
  tasks: Task[];
  taskName: string;
  error: string;
  deleteId: number | null;
};

export default class TodoList extends Component<{}, InitialState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [],
      taskName: "",
      error: "",
      deleteId: null,
    };
  }

  componentDidMount() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      this.setState({ tasks: JSON.parse(saved) });
    }
  }

  componentDidUpdate(_: {}, prevState: InitialState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ taskName: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { taskName, tasks } = this.state;

    if (!taskName.trim()) {
      this.setState({ error: "Tên công việc không được để trống" });
      return;
    }
    if (tasks.some((t) => t.name.toLowerCase() === taskName.trim().toLowerCase())) {
      this.setState({ error: "Tên công việc đã tồn tại" });
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: taskName.trim(),
      completed: false,
    };

    this.setState({
      tasks: [...tasks, newTask],
      taskName: "",
      error: "",
    });
  };

  handleToggle = (id: number) => {
    this.setState({
      tasks: this.state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  handleDelete = (id: number) => {
    this.setState({ deleteId: id });
  };

  confirmDelete = () => {
    if (this.state.deleteId !== null) {
      this.setState({
        tasks: this.state.tasks.filter((t) => t.id !== this.state.deleteId),
        deleteId: null,
      });
    }
  };

  handleEdit = (id: number) => {
    const task = this.state.tasks.find((t) => t.id === id);
    if (!task) return;
    const newName = prompt("Nhập tên mới:", task.name);
    if (newName && newName.trim()) {
      if (
        this.state.tasks.some(
          (t) => t.name.toLowerCase() === newName.toLowerCase()
        )
      ) {
        alert("Tên công việc đã tồn tại");
        return;
      }
      this.setState({
        tasks: this.state.tasks.map((t) =>
          t.id === id ? { ...t, name: newName.trim() } : t
        ),
      });
    }
  };

  render() {
    return (
      <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
        <h2>Danh sách công việc</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Nhập tên công việc"
            value={this.state.taskName}
            onChange={this.handleChange}
          />
          <button type="submit">Thêm</button>
        </form>

        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {this.state.tasks.map((task) => (
            <li key={task.id} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => this.handleToggle(task.id)}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
              <button
                style={{ color: "orange" }}
                onClick={() => this.handleEdit(task.id)}
              >
                Sửa
              </button>
              <button
                style={{ color: "red" }}
                onClick={() => this.handleDelete(task.id)}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>

        <p>
          Công việc đã hoàn thành:{" "}
          <b>
            {this.state.tasks.filter((t) => t.completed).length}/
            {this.state.tasks.length}
          </b>
        </p>
        {this.state.deleteId !== null && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
              <p>Bạn có chắc chắn muốn xóa công việc?</p>
              <button onClick={() => this.setState({ deleteId: null })}>
                Hủy
              </button>
              <button onClick={this.confirmDelete}>Đồng ý</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
