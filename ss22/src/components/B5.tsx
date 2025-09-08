import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function B5() {
  // trạng thái để quản lý hiển thị từng alert
  const [show, setShow] = useState({
    success: true,
    danger: true,
    warning: true,
  });

  return (
    <>
      {show.success && (
        <Alert 
          variant="success" 
          dismissible 
          onClose={() => setShow({ ...show, success: false })}
        >
          Them tai khoan thanh cong
        </Alert>
      )}

      {show.danger && (
        <Alert 
          variant="danger" 
          dismissible 
          onClose={() => setShow({ ...show, danger: false })}
        >
          Them tai khoan that bai
        </Alert>
      )}

      {show.warning && (
        <Alert 
          variant="warning" 
          dismissible 
          onClose={() => setShow({ ...show, warning: false })}
        >
          Ten khong duoc de trong
        </Alert>
      )}
    </>
  );
}
