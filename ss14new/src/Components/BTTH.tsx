import React, { Component } from 'react'
import "./BTTT.css"
export default class BTTH extends Component {
  render() {
    return (
        <div className="timer-container">
            <div className="timer-header">
                <h1 className="timer-title">Đồng Hồ Đếm Thời Gian</h1>
            </div>
            <div className="mode-selector">
                <button className="mode-btn active" data-mode="stopwatch">
                Bấm Giờ
                </button>
            </div>
            <div className="time-display" id="timeDisplay">
                00:00:00
            </div>
            <div className="progress-bar">
                <div className="progress-fill" id="progressFill" />
            </div>
            <div className="controls">
                <button className="control-btn start-btn" id="startBtn">
                Bắt Đầu
                </button>
                <button
                className="control-btn pause-btn"
                id="pauseBtn"
                style={{ display: "none" }}
                >
                Tạm Dừng
                </button>
                <button className="control-btn reset-btn" id="resetBtn">
                Đặt Lại
                </button>
            </div>
            <div className="status-message" id="statusMessage" />
        </div>

    )
  }
}
