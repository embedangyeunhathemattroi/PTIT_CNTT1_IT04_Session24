import React, { useState, useEffect } from 'react';
 export default function B4() {
  const [pageTitle, setPageTitle] = useState('Tiêu đề mặc định');  
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleTitleChange = (event) => {
    setPageTitle(event.target.value); 
  };

  return (
    <div>
      <h1>Quản lý Tiêu đề Trang</h1>
      <label>
        Nhập tiêu đề mới:
        <input
          type="text"
          value={pageTitle} 
          onChange={handleTitleChange} 
        />
      </label>
      <p>Giá trị tiêu đề hiện tại trong state: {pageTitle}</p>
    </div>
  );
}
