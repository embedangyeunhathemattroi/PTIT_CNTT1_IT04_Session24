import React from "react";

export default function UserLayout() {
  const layoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const headerStyle: React.CSSProperties = {
    background: "#cdd6e0",
    textAlign: "center",
    padding: "20px",
  };

  const navStyle: React.CSSProperties = {
    background: "#7c8796",
    textAlign: "center",
    padding: "15px",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flex: 1,
  };

  const menuStyle: React.CSSProperties = {
    background: "#19a34a",
    flex: 1,
    padding: "20px",
    textAlign: "center",
  };

  const mainStyle: React.CSSProperties = {
    background: "#fdeaea",
    flex: 3,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    padding: "20px",
  };

  const articleStyle: React.CSSProperties = {
    background: "#8fc7fb",
    flex: 1,
    padding: "20px",
    textAlign: "center",
  };

  const cartStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "30px",
    textAlign: "center",
  };

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>Header</header>
      <nav style={navStyle}>Navigation</nav>
      <div style={contentStyle}>
        <aside style={menuStyle}>Menu</aside>
        <main style={mainStyle}>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
          <div style={cartStyle}>Cart</div>
        </main>
        <aside style={articleStyle}>Article</aside>
      </div>
    </div>
  );
}
