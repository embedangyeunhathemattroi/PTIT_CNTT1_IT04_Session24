import React, { useReducer } from "react";

export default function B1() {
  // state khởi tạo
  const initialState = {
    count: 0,
  };

  // reducer: nhận state và action, trả về state mới
  const countReducer = (state: typeof initialState, action: any) => {
    console.log("action1", action);

    switch (action.type) {
      case "Increase":
        return { count: state.count + action.payload };
      case "Decrease":
        return { count: state.count - action.payload };
      default:
        return state;
    }
  };

  // khai báo useReducer
  const [state, dispatch] = useReducer(countReducer, initialState);

  // các hàm xử lý
  const increase = () => {
    dispatch({ type: "Increase", payload: 3 });
  };

  const decrease = () => {
    dispatch({ type: "Decrease", payload: 1 });
  };

  return (
    <div>
      UseReducer
      <h1>Giá trị count: {state.count}</h1>
      <button onClick={increase}>Tăng</button>
      <button onClick={decrease}>Giảm</button>
    </div>
  );
}
