import React, { useReducer } from "react";

export default function B8() {
  const initialState = {
    name: "",
    email: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        background: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Information Form
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Tên:</label>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "SET_NAME", payload: e.target.value })
          }
          style={{ width: "100%", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Email:</label>
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          style={{ width: "100%", marginTop: "5px" }}
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          borderRadius: "5px",
          background: "#f8f9fa",
        }}
      >
        <h4>Thông tin người dùng:</h4>
        <p>
          <strong>Tên:</strong> {state.name || "(Chưa nhập)"}
        </p>
        <p>
          <strong>Email:</strong> {state.email || "(Chưa nhập)"}
        </p>
      </div>
    </div>
  );
}
