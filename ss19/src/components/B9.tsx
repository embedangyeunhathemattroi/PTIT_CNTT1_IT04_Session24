import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export default function B9() {
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  function LanguageSelector() {
    const { language, changeLanguage } = useContext(LanguageContext);
    return (
      <div>
        <label>
           Ngôn ngữ hiện tại:
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </label>
        <h2 style={{ marginTop: "20px" }}>
          {language === "en" ? "Welcome!" : "Xin chào!"}
        </h2>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <LanguageSelector />
    </LanguageContext.Provider>
  );
}

