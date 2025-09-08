import React, { useState } from "react";

type User = {
  email?: string;
  password?: string;
  address?: string;
};

export default function UserState() {
  // Gom tất cả state vào một object
  const [userInfo, setUserInfo] = useState<User>({
    address: "",
    email: "",
    password: "",
  });

  const [count, setCount] = useState(0);

  console.log("re-render");

  // Tăng count nhiều lần
  const handleIncrease = (): void => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 2);
    setCount((prev) => prev + 3);
  };

  // Khi submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit", userInfo);
  };

  // Khi nhập dữ liệu vào input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Email: {userInfo.email}</h2>
      <h2>Address: {userInfo.address}</h2>
      <h2>Password: {userInfo.password}</h2>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrease}>Increase</button>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          onChange={handleChange}
          placeholder="Enter email"
        />
        <input
          name="address"
          type="text"
          onChange={handleChange}
          placeholder="Enter address"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
