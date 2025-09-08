import React, { Component } from 'react';

type RangeFormState = {
  rangeValue: number;
  submittedValue: number | null;
};

export default class RangeForm extends Component<{}, RangeFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rangeValue: 50,       // giá trị hiện tại của thanh range
      submittedValue: null  // giá trị đã submit
    };
  }

  // Xử lý khi thanh range thay đổi
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rangeValue: Number(e.target.value) });
  };

  // Xử lý khi submit form
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ submittedValue: this.state.rangeValue });
  };

  render() {
    const { rangeValue, submittedValue } = this.state;

    return (
      <div style={{ padding: 20, fontFamily: 'Arial' }}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Progress:
            <input
              type="range"
              min="0"
              max="100"
              value={rangeValue}
              onChange={this.handleChange}
        
            />
          </label>
          <p>Value: {rangeValue}</p>
          <button type="submit">Submit</button>
        </form>

        {submittedValue !== null && (
          <div>
            Submitted Value: {submittedValue}
          </div>
        )}
      </div>
    );
  }
}
