import React, { Component } from "react";
import Swal from "sweetalert2";

type Task = {
  id: number;
  taskName: string;
  completed: boolean;
};

type InitialState = {
  tasks: Task[];
  taskName: string;
  editId: number | null;
};

export default class B9 extends Component<{}, InitialState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, taskName: "công việc 1", completed: true },
        { id: 2, taskName: "công việc 2", completed: true },
        { id: 3, taskName: "công việc 3", completed: false },
      ],
      taskName: "",
      editId: null,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ taskName: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { taskName, tasks, editId } = this.state;
    const trimmedName = taskName.trim();

    if (!trimmedName) {
      Swal.fire("Lỗi", "Tên công việc không được để trống", "error");
      return;
    }

    if (
      tasks.some(
        (t) =>
          t.taskName.toLowerCase() === trimmedName.toLowerCase() &&
          t.id !== editId
      )
    ) {
      Swal.fire("Lỗi", "Tên công việc đã tồn tại", "error");
      return;
    }

    if (editId !== null) {
      // Sửa công việc
      Swal.fire({
        title: "Bạn có muốn cập nhật công việc này?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setState({
            tasks: tasks.map((t) =>
              t.id === editId ? { ...t, taskName: trimmedName } : t
            ),
            taskName: "",
            editId: null,
          });
          Swal.fire("Thành công", "Cập nhật công việc thành công", "success");
        }
      });
    } else {
      // Thêm công việc mới
      const newTask: Task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        taskName: trimmedName,
        completed: false,
      };
      this.setState({ tasks: [...tasks, newTask], taskName: "" });
      Swal.fire("Thành công", "Thêm công việc thành công", "success");
    }
  };

  handleDLte=(id:number)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    
    this.setState({tasks:this.state.tasks.filter((t)=>t.id!=id)})
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

  }

  handleEdit = (task: Task) => {
    this.setState({ taskName: task.taskName, editId: task.id });
  };

  toggleComplete = (id: number) => {
    this.setState({
      tasks: this.state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  render() {
    const { tasks, taskName } = this.state;
    const completedCount = tasks.filter((t) => t.completed).length;

    return (
      <div style={{ padding: "20px" }}>
        <h1>DANH SÁCH CÔNG VIỆC</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Thêm công việc"
            value={taskName}
            onChange={this.handleChange}
          />
          <button type="submit">
            {this.state.editId !== null ? "Cập nhật" : "Thêm"}
          </button>
        </form>
        <ul>
          {tasks.map((item) => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => this.toggleComplete(item.id)}
              />
              {item.completed ? (
                <span style={{ textDecoration: "line-through", marginLeft: "8px" }}>
                  {item.taskName}
                </span>
              ) : (
                <span style={{ marginLeft: "8px" }}>{item.taskName}</span>
              )}
              <button onClick={() => this.handleEdit(item)} style={{ marginLeft: "8px" }}>
                Sửa
              </button>
              <button onClick={()=>this.handleDLte(item.id)}>
                Xóa
              </button>


             

              
            </li>
          ))}
        </ul>
        <p>
          Số lượng công việc hoàn thành: {completedCount} / {tasks.length}
        </p>
      </div>
    );
  }
}
