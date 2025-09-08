import React, { Component } from "react";
import DetailPost from "./Bai6Detail";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

type State = {
  posts: Post[];
};

export default class ListPost extends Component<{}, State> {
  state: State = {
    posts: [
      {
        id: 1,
        title: "Tại sao nên học ReactJs",
        content: "Học ReactJs để đi làm",
        author: "David",
      },
      {
        id: 2,
        title: "Props trong ReactJs",
        content:
          "Props giúp truyền dữ liệu từ component cha xuống component con",
        author: "Linda",
      },
      {
        id: 3,
        title: "State trong ReactJs là gì",
        content: "State giúp trữ trạng thái dữ liệu trong 1 component",
        author: "David",
      },
    ],
  };

  render() {
    return (
      <div>
        <h2>Danh sách bài viết</h2>
        {this.state.posts.map((post) => (
          <DetailPost key={post.id} post={post} />
        ))}
      </div>
    );
  }
}
