import React, { useState, useRef, useEffect } from "react";
export default function B6() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (inputRef.current) {
      alert(`Xin chào, ${inputRef.current.value}!`);
    }
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Modal với useRef + useEffect</h2>
      <button  onClick={handleOpen} >
        Mở Modal
      </button>

      {isOpen && (
        <div  >
          <div   >
            <h3>Đăng nhập</h3>
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập tên người dùng"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={handleClose}>Đóng</button>
              <button
                style={{ backgroundColor: "green", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px" }}
                onClick={handleSubmit}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
