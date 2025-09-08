import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function B9() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ và tên</th>
          <th>Giới tính</th>
          <th>Ngày Sinh</th>
          <th>Email</th>
          <th>Địa Chỉ</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Nguyễn Văn A</td>
          <td>Nam</td>
          <td>01/01/1990</td>
          <td>nguyenvana@gmail.com</td>
          <td>Hà Nội</td>
          <td>
            <Button
              style={{ backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
              className="me-2"
            >
              Sửa
            </Button>
            <Button
              style={{ backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
            >
              Xóa
            </Button>
          </td>
        </tr>

        <tr>
          <td>2</td>
          <td>Trần Thị B</td>
          <td>Nữ</td>
          <td>02/02/1990</td>
          <td>tranthib@gmail.com</td>
          <td>TP.Hồ Chí Minh</td>
          <td>
            <Button
              style={{ backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
              className="me-2"
            >
              Sửa
            </Button>
            <Button
              style={{ backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
            >
              Xóa
            </Button>
          </td>
        </tr>

        <tr>
          <td>3</td>
          <td>Phạm Văn C</td>
          <td>Nam</td>
          <td>03/03/1992</td>
          <td>phamvanc@gmail.com</td>
          <td>Đà Nẵng</td>
          <td>
            <Button
              style={{ backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
              className="me-2"
            >
              Sửa
            </Button>
            <Button
              style={{ backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
            >
              Xóa
            </Button>
          </td>
        </tr>

        <tr>
          <td>4</td>
          <td>Lê Thị D</td>
          <td>Nữ</td>
          <td>04/04/1993</td>
          <td>lethid@gmail.com</td>
          <td>Hải Phòng</td>
          <td>
            <Button
              style={{ backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
              className="me-2"
            >
              Sửa
            </Button>
            <Button
              style={{ backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px' }}
              size="sm"
            >
              Xóa
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
