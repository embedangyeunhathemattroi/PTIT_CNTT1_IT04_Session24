import React, { Component } from "react";

type Todo = {
  id: number;
  name: string;
  assign: string;
  status: boolean; // true = hoàn thành, false = chưa hoàn thành
  created_at: Date;
};

type State = {
  todos: Todo[];
};

export default class TodoList extends Component<{}, State> {
  state: State = {
    todos: [
      {
        id: 1,
        name: "Thiết kế giao diện Header",
        assign: "Nguyễn Văn A",
        status: false,
        created_at: new Date("2024-03-21T13:12:12"),
      },
      {
        id: 2,
        name: "Thiết kế giao diện Footer",
        assign: "Nguyễn Văn B",
        status: true,
        created_at: new Date("2024-03-21T15:10:50"),
      },
    ],
  };

  // Hàm format ngày giờ
  formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    const ss = date.getSeconds().toString().padStart(2, "0");
    return `${d}/${m}/${y} ${hh}:${mm}:${ss}`;
  };

  render() {
    return (
      <div>
        <h2>Danh sách công việc</h2>
        <table
          border={1}
          cellPadding={10}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên công việc</th>
              <th>Người thực hiện</th>
              <th>Trạng thái</th>
              <th>Thời gian tạo</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{index + 1}</td>
                <td>{todo.name}</td>
                <td>{todo.assign}</td>
                <td>
                  {todo.status ? (
                    <span
                      style={{
                        color: "green",
                        background: "#d4f8d4",
                        padding: "3px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      Hoàn thành
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "red",
                        background: "#fcdcdc",
                        padding: "3px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      Chưa hoàn thành
                    </span>
                  )}
                </td>
                <td>{this.formatDate(todo.created_at)}</td>
                <td>
                  <button
                    style={{
                      marginRight: "5px",
                      background: "orange",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
