import React, { useState } from 'react';

export default function B3() {
  const [textColor, setTextColor] = useState("black");

  const handleChangeColor = () => {
    setTextColor(prevColor => (prevColor === "black" ? "red" : "black"));
  };

  return (
    <div>
      B3
      <p style={{ color: textColor }}>Tieu de van ban</p>
      <button onClick={handleChangeColor}>Thay doi mau</button>
    </div>
  );
}