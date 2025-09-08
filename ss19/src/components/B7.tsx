import React, { useRef } from 'react';

export default function B7() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
        <h1><b>Cuon toi noi dung trang</b></h1>
      <button onClick={scrollToSection}>Di toi noi dung trang</button>
      <div style={{ height: '800px' }}>
        <p>
         Tạo một component có tên RandomQuote. Khi người dùng nhấn nút "Lấy câu nói mới", ứng dụng sẽ hiển thị một câu quote ngẫu nhiên từ một danh sách đã cho trước.
Danh sách câu nói mẫu:
 "Học, học nữa, học mãi.",
  "Thất bại là mẹ thành công.",
  "Không gì là không thể.",
  "Kiến tha lâu đầy tổ.",
  "Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau."
Yêu cầu: 
Mỗi lần click nút → lấy ngẫu nhiên 1 câu khác (không cần loại trừ câu cũ).
Sử dụng useState để lưu quote.
Giao diện đơn giản, dễ nhìn.
        </p>
      </div>

      <div ref={sectionRef}>
        <h2><b>Noi dung trang</b></h2>
        <p>
         Hello,guys!
        </p>
      </div>
    </div>
  );
}
