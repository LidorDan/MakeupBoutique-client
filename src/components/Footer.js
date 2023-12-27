import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";
import {useContext, useRef } from 'react';
import { useState } from "react";
import AuthContext from '../store/auth-context';



function Footer() {

  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;

  return (

    <Container className="footerContainer" fluid>
      <Row className="footerRow">
        <Col>
          <img
            src="/Images/HomePage/makeupIcon.png"
            width="90"
            height="90"
            className="d-inline-block"
            alt="logo"
          />
        </Col>
        <Col>
          <a href="/">Home Page</a>
          <br></br>
          <a href="/stores">Our stores</a>ּ
          <br></br>
          {isAdmin==="true" && <a href="/users">Users</a>}
        </Col>
        <Col>
          <a href="/shoppingBag">Cart</a>
          <br></br>
          <a href="/wishList">Wish List</a>
        </Col>

        <Col>
          <a href="/productsPage">Products</a>
          <br></br>
          {isAdmin==="true" && <a href="/ordersPage">Orders</a>}
        </Col>
      </Row>
    </Container>
  );
}
export default Footer;
