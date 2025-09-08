import React, { useState, useEffect } from 'react';
export default function B5() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
     
      setCount(prevCount => prevCount + 1);
    }, 1000); 

    return () => {
      clearInterval(timerId); 
      console.log("Bộ hẹn giờ đã bị dừng."); 
    };
  }, []); 
  return (
    <div>
      <h1>Bộ hẹn giờ</h1>
      <p>Thời gian đã trôi qua: {count} giây</p>
    </div>
  );
}
