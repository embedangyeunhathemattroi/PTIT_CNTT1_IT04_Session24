import React, { useReducer, useState } from 'react';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

// Hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, success: false, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, success: true, error: null };
    case 'ERROR':
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
}

// Component chính
export default function B7() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING' });

    // Giả lập API call
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        dispatch({ type: 'SUCCESS' });
      } else {
        dispatch({ type: 'ERROR', payload: 'Invalid credentials' });
      }
    }, 2000);
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={state.loading}>
          Đăng nhập
        </button>

        {state.loading && <p>Loading...</p>}
        {state.success && <p>Đăng nhập thành công!</p>}
        {state.error && <p>Error: {state.error}</p>}
      </form>
    </div>
  );
}
