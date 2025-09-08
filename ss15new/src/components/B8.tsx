import React, { Component } from 'react';

type CounterState = {
  count: number;
};

export default class Counter extends Component<{}, CounterState> {
  timerID: number | null = null; // lưu ID interval kiểu number

  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };
  }

  // Khi component mount → bắt đầu đếm
  componentDidMount() {
    this.timerID = window.setInterval(() => this.tick(), 1000);
  }

  // Khi component unmount → dọn dẹp interval
  componentWillUnmount() {
    if (this.timerID !== null) {
      clearInterval(this.timerID);
    }
  }

  // Hàm tăng count
  tick() {
    this.setState(prevState => ({
      count: prevState.count < 10 ? prevState.count + 1 : 0
    }));
  }

  render() {
    const { count } = this.state;
    return (
      <div style={{ fontFamily: 'Arial', fontSize: '24px', margin: '20px' }}>
        <h2>Counter: {count}</h2>
      </div>
    );
  }
}
