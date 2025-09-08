import React, { useReducer } from 'react';

export default function InputText() {
  // State ban đầu
  const initialState = {
    text: ""
  };

  // Reducer
  const textReducer = (state, action) => {
    if (action.type === "SET_TEXT") {
      return { text: action.payload };
    }
    return state;
  };

  // useReducer
  const [state, dispatch] = useReducer(textReducer, initialState);

  return (
    <div>
      <h1>{state.text || "Input change"}</h1>
      <input
        type="text"
        value={state.text}
        placeholder="Nhập chuỗi..."
        onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
      />
    </div>
  );
}
