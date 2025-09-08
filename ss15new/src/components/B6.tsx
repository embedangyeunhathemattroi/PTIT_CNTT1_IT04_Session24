import React, { Component } from 'react';
class DetailPost extends Component<{
  id: number;
  title: string;
  content: string;
  author: string;
}> {
  render() {
    const { id, title, content, author } = this.props;

    return (
      <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
        <p><strong>Id:</strong> {id}</p>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Content:</strong> {content}</p>
        <p><strong>Author:</strong> {author}</p>
      </div>
    );
  }
}


export class ListPost extends Component<{}, { posts: { id: number; title: string; content: string; author: string }[] }> {
  constructor(props: {}) {
    super(props);

    // Khởi tạo state với danh sách bài viết
    this.state = {
      posts: [
        {
          id: 1,
          title: 'Tại sao nên học ReactJS',
          content: 'Học ReactJS để đi làm',
          author: 'David'
        },
        {
          id: 2,
          title: 'Props trong ReactJS',
          content: 'Props giúp truyền dữ liệu từ component cha xuống component con',
          author: 'Linda'
        },
        {
          id: 3,
          title: 'State trong ReactJS là gì?',
          content: 'State giúp trữ trạng thái dữ liệu bên trong một component',
          author: 'David'
        }
      ]
    };
  }

  render() {
    const { posts } = this.state;

    return (
      <div style={{ fontFamily: 'Arial', fontSize: '18px' }}>
        <h2>Danh sách bài viết</h2>
        {/* Lặp qua danh sách bài viết, render từng bài bằng DetailPost */}
        {posts.map(post => (
          <DetailPost
            key={post.id} // key giúp React quản lý danh sách hiệu quả
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
          />
        ))}
      </div>
    );
  }
}
