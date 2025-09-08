import React, { Component } from "react";

type State = {
  theme: "light" | "dark";
  language: "english" | "vietnamese";
};

export default class App extends Component<{}, State> {
  state: State = {
    theme: "light",
    language: "vietnamese",
  };

  // Hàm đổi theme
  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  // Hàm đổi language
  toggleLanguage = () => {
    this.setState((prevState) => ({
      language:
        prevState.language === "vietnamese" ? "english" : "vietnamese",
    }));
  };

  render() {
    const { theme, language } = this.state;
    const styles = {
      backgroundColor: theme === "light" ? "white" : "black",
      color: theme === "light" ? "black" : "white",
      padding: "20px",
      minHeight: "200px",
      fontSize: "20px",
      fontWeight: "bold" as const,
    };

    return (
      <div style={styles}>
        <p>Nền: {theme === "light" ? "Sáng" : "Tối"}</p>
        <p>Ngôn ngữ: {language === "vietnamese" ? "Tiếng Việt" : "English"}</p>
        <button onClick={this.toggleTheme} style={{ marginRight: "10px" }}>
          Đổi nền
        </button>
        <button onClick={this.toggleLanguage}>Đổi ngôn ngữ</button>
      </div>
    );
  }
}
