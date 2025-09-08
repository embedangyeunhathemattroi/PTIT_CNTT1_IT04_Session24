import React, { useState } from 'react';

const quotes = [
  "Học, học nữa, học mãi.",
  "Thất bại là mẹ thành công.",
  "Không gì là không thể.",
  "Kiến tha lâu đầy tổ.",
  "Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau."
];

export default function B5() {
  const [quote, setQuote] = useState(quotes[0]);
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div>
      <p>{quote}</p>
      <button onClick={getRandomQuote}>Lấy câu nói mới</button>
    </div>
  );
}