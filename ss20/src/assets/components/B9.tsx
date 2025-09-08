import React, { useState } from "react";

export default function B9() {
  const data = [
    {
      id: 1,
      name: "Apple iPhone 13",
      description: "Smartphone mới nhất của Apple",
      img: "https://cdn8.web4s.vn/media/products/iphone%2013/9techvn-iphone-13-00002-cutout.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      description: "Smartphone flagship của Samsung",
      img: "https://cdn2.cellphones.com.vn/x/media/catalog/product/s/m/sm-g990_s21fe_backfront_zw_7_1_2.png",
    },
    {
      id: 3,
      name: "OnePlus 9 Pro",
      description: "Smartphone hiệu suất cao từ OnePlus",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrl106cLxybVkbfc0QJZUfKu1jmUyJkzahQQ&s",
    },
    {
      id: 4,
      name: "Google Pixel 6",
      description: "Điện thoại thông minh của Google",
      img: "https://www.xtsmart.vn/vnt_upload/news/03_2021/maxresdefault_14.jpg",
    },
    {
      id: 5,
      name: "Xiaomi Mi 11",
      description: "Điện thoại thông minh giá rẻ",
      img: "https://cdn.tgdd.vn/Products/Images/42/230769/xiaomi-mi-11-pro-600x600-3-600x600.jpg",
    },
  ];

  const [keyword, setKeyword] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.description.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Tìm kiếm sản phẩm</h2>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          margin: "15px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {keyword && (
        <p>
          {filteredData.length} kết quả tìm thấy cho "<b>{keyword}</b>"
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredData.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
