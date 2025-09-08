import React, { useState } from "react";

export default function B4() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  // Hàm validate
  const validate = () => {
    let isValid = true;
    let newErrors = { name: "", email: "" };

    if (!fullName.trim()) {
      newErrors.name = "Trường này là bắt buộc";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Trường này là bắt buộc";
      isValid = false;
    } else {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Email không hợp lệ";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Gửi thành công!");
      setFullName("");
      setEmail("");
    }
  };

  return (
    <>
      {/* CSS để trong 1 file chung */}
      <style>{`
        .container04 {
          display: flex;
          flex-direction: column;
          padding: 20px;
          border: 1px solid black;
          border-radius: 7px;
          width: 300px;
          gap: 15px;
          margin: 20px auto;
        }
        .form04 {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form04 input {
          padding: 5px 10px;
        }
        .container04 button {
          padding: 5px 0px;
        }
      `}</style>

      <div className="container04">
        <form className="form04" onSubmit={handleSubmit}>
          <h2>Đăng ký thông tin</h2>

          <label>Họ tên</label>
          <input
            type="text"
            placeholder="Nhập họ tên..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <button type="submit">Gửi</button>
        </form>
      </div>
    </>
  );
}
