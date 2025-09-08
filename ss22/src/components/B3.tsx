import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function B3() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Img 
          variant="top" 
          src="https://kenh14cdn.com/zoom/700_438/203336854389633024/2022/6/11/photo1654915563381-1654915563894191343666.jpg" 
        />
        <Card.Body>
          <Card.Title>MacBook Air 2018</Card.Title>
          <Card.Text>
            The reason I am selling the machine is because it is too much power for what I need.
          </Card.Text>
          <Button variant="primary">Xem chi tiết</Button>
             <span style={{ padding:'20px', fontSize: '1 rem' }}>30.000.000 ₫</span>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img 
          variant="top" 
          src="https://cdn.tgdd.vn/Files/2020/07/22/1272660/apple-macbook-pro-16-inch-01-_1680x964-800-resize.jpg" 
        />
        <Card.Body>
          <Card.Title>MacBook Air 2019</Card.Title>
          <Card.Text>
            The reason I am selling the machine is because it is too much power for what I need.
          </Card.Text>
          <Button variant="primary">Xem chi tiết</Button>
          <span style={{ padding:'20px', fontSize: '1 rem' }}>30.000.000 ₫</span>
        </Card.Body>
      </Card>
    </div>
  );
}
