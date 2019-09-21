import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../img/logopkub.png";

export const Navigation = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="60"
          height="50"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/clients">Klienci</Nav.Link>
        <Nav.Link href="/orders">Wpisy</Nav.Link>
        <Nav.Link href="/manage">Import/Eksport</Nav.Link>
      </Nav>
    </Navbar>
  );
};
