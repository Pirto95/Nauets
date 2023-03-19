import React from 'react';
import users from '../data/user.json';
import { Navbar, Nav, Image } from 'react-bootstrap';
import logo from '../assets/img/logo.png';

function NavbarComponent() {
  const user = users.admin;
  const imgLogo = logo

  return (
    <Navbar bg="white" expand="lg" className='d-flex justify-content-between mr-2 py-0 navbar-home'>
      <Navbar.Brand className="col-2 container-logo">
        <Image src={imgLogo} className="logo"/> 
      </Navbar.Brand>
        <Nav className="me-5">
          <div className="d-flex align-items-right">
            <div className='text-end mx-3'>
              <p className="name-operator m-0">{user.name} {user.surname}</p>
              <p className="operator m-0">{user.operator}</p>
            </div>
            <div >
              <Image src={user.img} alt={user.name + ' ' + user.surname} roundedCircle width={30} height={30} />
            </div>
          </div>
        </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
