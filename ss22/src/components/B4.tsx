import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function B4() {
  return (
    <div style={{ margin: '50px' }}>
      <Dropdown drop="down">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Nguyen Van Nam
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ top: '100%' }}>
          <Dropdown.Item href="#/action-1">Cai Dat</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Doi Mat Khau</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Dang xuat</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
