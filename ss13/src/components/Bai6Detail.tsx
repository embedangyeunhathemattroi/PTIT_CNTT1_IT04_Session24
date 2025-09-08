import React, { Component } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

type Props = {
  post: Post;
};

export default class DetailPost extends Component<Props> {
  render() {
    const { id, title, content, author } = this.props.post;
    return (
      <div style={{ marginBottom: "20px" }}>
        <p><b>ID:</b> {id}</p>
        <p><b>Title:</b> {title}</p>
        <p><b>Content:</b> {content}</p>
        <p><b>Author:</b> {author}</p>
        <hr />
      </div>
    );
  }
}
