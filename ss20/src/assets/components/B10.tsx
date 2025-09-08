import React, { useState } from "react";

export default function B10() {
  const initialArticles = [
    { id: 1, title: "Hướng dẫn sử dụng React", tag: "React" },
    { id: 2, title: "Tìm hiểu về JavaScript ES6", tag: "JavaScript" },
    { id: 3, title: "CSS Grid vs Flexbox", tag: "CSS" },
    { id: 4, title: "Hướng dẫn tối ưu hóa hiệu suất web", tag: "Performance" },
  ];

  const [unreadArticles, setUnreadArticles] = useState(initialArticles);
  const [readArticles, setReadArticles] = useState([]);

  const markAsRead = (id) => {
    const article = unreadArticles.find((a) => a.id === id);
    if (article) {
      setUnreadArticles(unreadArticles.filter((a) => a.id !== id));
      setReadArticles([...readArticles, article]);
    }
  };

  const total = initialArticles.length;
  const readCount = readArticles.length;
  const percent = ((readCount / total) * 100).toFixed(0);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#0070f3" }}>Quản lý bài viết</h2>
      <p style={{ textAlign: "center", color: "#555" }}>
        Đã đọc: {readCount}/{total} bài viết ({percent}%)
      </p>
      <div
        style={{
          background: "#f9f9f9",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Bài viết chưa đọc{" "}
          <span style={{ color: "#0070f3" }}> {unreadArticles.length} </span>
        </h3>
        {unreadArticles.length === 0 ? (
          <p>Tất cả bài viết đã được đọc </p>
        ) : (
          unreadArticles.map((article) => (
            <div
              key={article.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                margin: "8px 0",
                background: "#fff",
              }}
            >
              <div>
                <strong>{article.title}</strong>
                <p
                  style={{
                    display: "inline-block",
                    background: "#eee",
                    padding: "2px 8px",
                    borderRadius: "5px",
                    marginLeft: "5px",
                    fontSize: "12px",
                    color: "#555",
                  }}
                >
                  {article.tag}
                </p>
              </div>
              <button
                onClick={() => markAsRead(article.id)}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Đánh dấu đã đọc
              </button>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          background: "#f9f9f9",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <h3>
          Bài viết đã đọc <span style={{ color: "green" }}>{readCount}</span>
        </h3>
        {readArticles.length === 0 ? (
          <p style={{ color: "#777" }}>Chưa có bài viết nào được đọc</p>
        ) : (
          readArticles.map((article) => (
            <div
              key={article.id}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                margin: "8px 0",
                background: "#fff",
              }}
            >
              <strong>{article.title}</strong>
              <p
                style={{
                  display: "inline-block",
                  background: "#eee",
                  padding: "2px 8px",
                  borderRadius: "5px",
                  marginLeft: "5px",
                  fontSize: "12px",
                  color: "#555",
                }}
              >
                {article.tag}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
