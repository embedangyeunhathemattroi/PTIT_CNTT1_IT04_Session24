import React, { Component } from "react";
import Demo from "./Components/Demo";
import Controll from "./Components/Controll";
import B5Them from "./Components/B5Them";
import Exercise01 from "./Components/Exersice01";
import BTTH from "./Components/BTTH";
import B3 from "./Components/B3";
import B4 from "./Components/B4";
import B6 from "./Components/B6";
import B7 from "./Components/B7";
import B8 from "./Components/B8";
import Notification from "./Components/Notificion";
import B9 from "./Components/B9s/B9";
import Apps from "./Components/B10s/Apps";
export default class App extends Component {
  render() {
    return (
      <>
        <Demo />
        <Controll />
        <B5Them />
        <Exercise01 />
        <Notification />
        <hr />
        <BTTH />
        <hr />
        <B3 />
        <hr />
        <B4 />
        <hr />
        <B6 />
        <hr />
        <B7 />
        <hr />
        <B8 />
        <hr />
        <B9 />
        <hr />
        <Apps />
      </>
    );
  }
}
