import React, { useState } from "react";

export default function B6() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <textarea
        placeholder="Nhập nội dung..."
        value={text}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
        }}
      ></textarea>
      <p>Số ký tự: {text.length}</p>
    </div>
  );
}
