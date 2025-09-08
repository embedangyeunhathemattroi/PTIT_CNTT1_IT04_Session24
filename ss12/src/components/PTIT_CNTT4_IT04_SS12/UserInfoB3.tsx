import React from 'react'

export default function UserInfoB3() {
 
    const UserInfo={
        name: "Nguyen Văn A",
        email:"nva@gmail.com",
        gender:"nam",
        address:"thanh Xuan , Ha Noi",
        birthday:"06/03/2000"

    };
  return (
    <div>
      <h1>USERINFO </h1>
        <ul>
            <li>Ho va ten :{UserInfo.name}</li>
            <li>
              email:{UserInfo.email}
            </li>
            <li>
              gioi tinh:{UserInfo.gender}
            </li>
            <li>
              dia chi :{UserInfo.address}
            </li>
            <li>
              ngày sinh : {UserInfo.birthday}
            </li>
        </ul>
    </div>
  )
}
