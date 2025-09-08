import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function B6() {
  return (
    <div  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      
    </div>
  );
}
