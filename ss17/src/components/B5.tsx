import React, { useState } from "react"; 
export default function B5() {
  const [title, setTitle] = useState(""); 
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập nội dung"
        value={title}
        onChange={handleChange}
      />
      <p>{title}</p>
    </div>
  );
}
