import React from 'react'
import { Button, Rate,Calendar } from 'antd';
import DefaultLayout from './layouts/DefaultLayout';
import B1 from './components/B1';
import B2 from './components/B2';
import B3 from './components/B3';
import B4 from './components/B4';
import B5 from './components/B5';
import B6 from './components/B6';
import B7 from './components/B7';
import B8 from './components/B8';
export default function App() {
  return (
    <div>
      {/* <h1 className='font-semibold text-center bg-red-600 p-9 m-9'>Hello TNL</h1>

      <Button type='primary' >Button Primary</Button>
      <Rate></Rate>
      <Calendar></Calendar> */}
      {/* <DefaultLayout></DefaultLayout> */}
      <B1></B1>
      <B2></B2>
      <B3></B3>
     <B4></B4>
      <B5></B5>
      <B6></B6>
      <hr />
      <B7></B7>
      <hr />
      <B8></B8>
    
    </div>
  )
}