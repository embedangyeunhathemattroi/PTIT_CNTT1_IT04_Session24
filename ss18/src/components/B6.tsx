import React, { useReducer } from "react";
export default function B6() {
  const initialState = { gender: "male" };
  const reducer = (state, action) => {
    if (action.type === "SET_GENDER") {
      return { gender: action.payload };
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h3>Chọn giới tính:</h3>
      <label>
        <input
          type="radio"
          value="male"
          checked={state.gender === "male"}
          onChange={(e) =>
            dispatch({ type: "SET_GENDER", payload: e.target.value })
          }
        />
        Nam
      </label>

      <label>
        <input
          type="radio"
          value="female"
          checked={state.gender === "female"}
          onChange={(e) =>
            dispatch({ type: "SET_GENDER", payload: e.target.value })
          }
        />
        Nữ
      </label>

      <label>
        <input
          type="radio"
          value="other"
          checked={state.gender === "other"}
          onChange={(e) =>
            dispatch({ type: "SET_GENDER", payload: e.target.value })
          }
        />
        Khác
      </label>

      <p>Giới tính đã chọn: <b>{state.gender}</b></p>
    </div>
  );
}
