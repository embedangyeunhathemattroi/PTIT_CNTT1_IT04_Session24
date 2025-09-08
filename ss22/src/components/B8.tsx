import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

export default function B8() {
  return (
    <Form style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 className="text-center mb-4">Dang Ky Tai Khoan</h1>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Nhap email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mat Khau</Form.Label>
            <Form.Control type="password" placeholder="Nhap Password" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Ho va Ten</Form.Label>
        <Form.Control type="text" placeholder="Vi du: Nguyen Van A" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Dia Chi</Form.Label>
        <Form.Control type="text" placeholder="Vi du: Thanh Xuan, Ha Noi" />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCity">
            <Form.Label>Thanh Pho</Form.Label>
            <Form.Select aria-label="Chon Thanh Pho">
              <option value="1">Ha Noi</option>
              <option value="2">Ho Chi Minh</option>
              <option value="3">Da Nang</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDistrict">
            <Form.Label>Quan</Form.Label>
            <Form.Select aria-label="Chon Quan">
              <option value="1">Thanh Xuan</option>
              <option value="2">Hai Chau</option>
              <option value="3">Ben Nghe</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formZip">
            <Form.Label>Ma Buu Dien</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
      </Row>

      <div className="text-center">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
