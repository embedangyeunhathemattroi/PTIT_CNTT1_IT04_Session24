import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container } from "react-bootstrap";
export default function B2() {
  return (
    <div>B2
        <Container className="mt-4">
      <Form.Group className="mb-3" controlId="inputLarge">
        <Form.Control size="lg" placeholder="Input cỡ lớn" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="inputMedium">
        <Form.Control placeholder="Input cỡ trung bình" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="inputSmall">
        <Form.Control size="sm" placeholder="Input cỡ bé" />
      </Form.Group>
    </Container>
    </div>
  )
}

