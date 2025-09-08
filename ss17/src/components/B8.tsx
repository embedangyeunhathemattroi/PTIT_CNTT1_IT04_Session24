import React, { useState } from "react";

export default function Checkbox() {
  const [hobbies, setHobbies] = useState([]);
  const options = ["Đi chơi", "Code", "Bơi lội", "Nhảy dây"];

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setHobbies((prev) =>
      checked ? [...prev, value] : prev.filter((h) => h !== value)
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>Sở thích: [{hobbies.map((h) => `"${h}"`).join(", ")}]</p>
      {options.map((opt) => (
        <label key={opt} style={{ display: "block" }}>
          <input
            type="checkbox"
            value={opt}
            checked={hobbies.includes(opt)}
            onChange={handleChange}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

