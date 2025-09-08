import React, { Component } from 'react';

type BirthdayFormState = {
  birthday: string;
  submittedBirthday: string;
};

export default class BirthdayForm extends Component<{}, BirthdayFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      birthday: '',
      submittedBirthday: ''
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ birthday: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ submittedBirthday: this.state.birthday });
  };

  render() {
    const { birthday, submittedBirthday } = this.state;

    return (
      <div >
        <form onSubmit={this.handleSubmit}>
          <label>
            Ngày sinh:
            <input type="date"  value={birthday}   onChange={this.handleChange} />
          </label>
          <button type="submit">Gửi</button>
        </form>

        {submittedBirthday && (
          <div >
            Ngày sinh đã nhập: {submittedBirthday}
          </div>
        )}
      </div>
    );
  }
}
