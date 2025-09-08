import React, { useState, useCallback } from 'react';

export default function B3() {
  // Khai báo state cho email và password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hàm xử lý submit form
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Ngăn reload trang
      console.log('Email:', email);
      console.log('Password:', password);
    },
    [email, password]
  );

  return (
    <>
      <h2>B3</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
