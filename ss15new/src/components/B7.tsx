import React, { Component } from 'react';

type ClockState = {
  time: Date;
};

export default class Clock extends Component<{}, ClockState> {
  timerID: number | null = null; // lưu ID interval kiểu number

  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date()
    };
  }
  componentDidMount() {
    this.timerID = window.setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    if (this.timerID !== null) {
      clearInterval(this.timerID);
    }
  }

  // Hàm cập nhật thời gian
  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    const { time } = this.state;
    const formattedTime = time.toLocaleTimeString(); // HH:MM:SS

    return (
      <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
        <h2>Thời gian hiện tại: {formattedTime}</h2>
      </div>
    );
  }
}
