import React, { Component } from 'react';

type ColorFormState = {
  color: string;
  displayColor: string;
};

export default class B2 extends Component<{}, ColorFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      color: '',
      displayColor: ''
    };
  }

  // Xử lý khi input thay đổi
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ color: e.target.value });
  };

  // Xử lý khi submit form
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ displayColor: this.state.color });
  };

  render() {
    const { color, displayColor } = this.state;

    return (
      <div style={{ padding: 20, fontFamily: 'Arial' }}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter color code:
            <input
              type="text"
              value={color}
              onChange={this.handleChange}
              style={{ marginLeft: 10 }}
            />
          </label>
          <button type="submit" style={{ marginLeft: 10 }}>Submit</button>
        </form>

        {displayColor && (
          <div style={{ marginTop: 20 }}>
            <p>Color code: {displayColor}</p>
          </div>
        )}
      </div>
    );
  }
}
