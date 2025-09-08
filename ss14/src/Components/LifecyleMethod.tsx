import { Component } from "react";

type ProTypes = {
  random?: number;
};

type StateTypes = {
  email?: string;
};

export default class LifecyleMethod extends Component<ProTypes, StateTypes> {
  // 1. Mounting: constructor
  constructor(props: ProTypes) {
    super(props);
    console.log("constructor được gọi");
    this.state = {
      email: "",
    };
  }

  // 2. Mounting: đồng bộ state với props
  static getDerivedStateFromProps(
    nextProps: Readonly<ProTypes>,
    prevState: Readonly<StateTypes>
  ) {
    console.log("getDerivedStateFromProps được gọi");
    if (nextProps.random !== undefined) {
      return {
        email: "random_" + nextProps.random,
      };
    }
    return null; // không thay đổi state
  }

  // 3. Updating: kiểm soát có nên render lại không
  shouldComponentUpdate(nextProps: Readonly<ProTypes>, nextState: Readonly<StateTypes>) {
    console.log("shouldComponentUpdate được gọi");
    return true; // nếu return false => không render lại
  }

  // 4. Render (chung cho cả Mounting & Updating)
  render() {
    console.log("render được gọi");
    return (
      <div>
        <h1>LifecyleMethod Component</h1>
        <h2>Random: {this.props.random}</h2>
        <h3>Email state: {this.state.email}</h3>
      </div>
    );
  }

  // 5. Mounting: gọi sau khi render lần đầu
  componentDidMount(): void {
    console.log("componentDidMount được gọi - gọi API, setTimeout...");
  }

  // 6. Updating: chạy sau khi component cập nhật xong
  componentDidUpdate(prevProps: Readonly<ProTypes>, prevState: Readonly<StateTypes>) {
    console.log("componentDidUpdate được gọi");
    console.log("prevProps:", prevProps, "prevState:", prevState);
  }

  // 7. Unmounting: gọi khi component bị xoá khỏi DOM
  componentWillUnmount(): void {
    console.log("componentWillUnmount được gọi - cleanup (clearInterval, removeEventListener...)");
  }

  // 8. Error Handling: khi con component bị lỗi
  static getDerivedStateFromError(error: Error) {
    console.log("getDerivedStateFromError được gọi - bắt lỗi");
    return { email: "Error xảy ra!" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("componentDidCatch:", error, info);
  }
}
