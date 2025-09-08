import React, { useState } from "react";

// Component con, được bọc React.memo để tránh re-render không cần thiết
const Item = React.memo(function Item({ index, isSelected, onSelect }) {
  console.log("Render item:", index);
  return (
    <div
      onClick={() => onSelect(index)}
      style={{
        cursor: "pointer",
        border: "1px solid gray",
        backgroundColor: isSelected ? "lightgreen" : "white",
        padding: "4px",
        margin: "2px",
      }}
    >
      Item {index}
    </div>
  );
});

export default function B7() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <h2>Danh sách 100 items</h2>
      {[...Array(100)].map((_, i) => (
        <Item
          key={i}
          index={i}
          isSelected={selectedIndex === i}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
