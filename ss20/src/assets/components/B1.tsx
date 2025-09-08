import React, { useState } from 'react';
export default function B1() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 5) {
      setMessage('Chuỗi nhập vào dài hơn 5 ký tự.');
    } else {
      setMessage('');
    }
  };

  return (
    <div>
      <input   type="text"  value={inputValue}  onChange={handleChange}/>
      {message && <p>{message}</p>}
    </div>
  );
}

