import React, { Component } from 'react';

type CounterState = {
  count: number;
};

export default class B8 extends Component<{}, CounterState> {
  timerID: number | null = null; 

  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
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

  tick() {
    this.setState(prevState => ({
      count: prevState.count < 10 ? prevState.count + 1 : 0
    }));
  }

  render() {
    const { count } = this.state;
    return (
      <div >
        <h2>Counter: {count}</h2>
      </div>
    );
  }
}
