import React from 'react'

export default function FormatName() {
    const user={
        firstName:"Nguyễn Văn",
        lastName:"Nam",
    };

    function formatName(user:{firstName:string;lastName:string}) {
        return user. firstName+""+user.lastName;
    }
  return (
    <div>
    <h1>Thong tin người dùng</h1>
    <p>Họ và tên :{formatName(user)}</p>
    </div>
  )
}
