import React, { useState, useCallback } from 'react';

export default function B4() {
  // State lưu màu được chọn, mặc định là đen
  const [selectedColor, setSelectedColor] = useState('#000000');

  // Hàm xử lý khi người dùng chọn màu mới
  const handleChangeColor = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  }, []);

  return (
    <div>
      <label htmlFor="colorPicker">Choose a color:</label>
      <input
        type="color"
        id="colorPicker"
        value={selectedColor}
        onChange={handleChangeColor}
      />
      <p>You picked: {selectedColor}</p>
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: selectedColor,
          border: '1px solid black',
        }}
      ></div>
    </div>
  );
}
