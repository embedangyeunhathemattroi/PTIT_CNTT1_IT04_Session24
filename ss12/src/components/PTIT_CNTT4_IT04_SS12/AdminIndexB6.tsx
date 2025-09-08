import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import ManagerStudent from './ManagerStudent'

export default function AdminIndexB6() {
  return (
    <div><Header></Header>
    <div style={{display:"flex"}}>
         <Menu></Menu>
         <ManagerStudent></ManagerStudent>
       
    </div>
      <Footer></Footer>
   </div>
  )
}
