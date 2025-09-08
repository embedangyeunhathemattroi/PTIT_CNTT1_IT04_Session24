import React, { useState } from "react"; // thêm useState

export default function B7() {
  const [selectedCity, setSelectedCity] = useState("");
git remote add origin https://github.com/embedangyeunhathemattroi/PTIT_CNTT1_IT04_Session17s.git
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Chọn thành phố</option>
        <option value="Hà Nội">Hà Nội</option>
        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
        <option value="Đà Nẵng">Đà Nẵng</option>
        <option value="Hải Phòng">Hải Phòng</option>
      </select>

      {selectedCity && <p>Bạn đã chọn: {selectedCity}</p>}
    </div>
  );
}
