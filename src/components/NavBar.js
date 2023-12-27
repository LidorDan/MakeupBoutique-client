import "../styles/NavBar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Container, Navbar, Offcanvas, Nav, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

function NavBar() {
  const [showed, setShowed] = useState("none");
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedin;
  console.log("logged???? " + isLoggedin);
  console.log("logged???" + typeof isLoggedin);
  return (
    <React.Fragment>
      <Navbar expand={"md"} className="mb-3 header_navbar">
        <Container fluid>
          <Navbar.Brand href="/" className="navbar_brand">
            <img
              src="/Images/HomePage/makeupIcon.png"
              width="45"
              height="45"
              className="d-inline-block"
              alt="logo"
            />
            &nbsp;&nbsp;&nbsp;Makeup Boutique
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            {/* for toggler close */}
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {isLoggedin === "true" ? (
                  <Nav.Link href="/logout">
                    <Button variant="dark" onClick>
                      Log out{" "}
                    </Button>
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login">
                    <label className="">&nbsp;LogIn</label>
                  </Nav.Link>
                )}
                <Nav.Link href="/userProfile">
                  <PersonIcon className="nav_icon" />
                  <label className="d-md-none">&nbsp;Your Account</label>
                </Nav.Link>
                <Nav.Link href="/wishList">
                  <FavoriteIcon className="nav_icon" />
                  <label className="d-md-none">&nbsp;WishList</label>
                </Nav.Link>
                <Nav.Link href="/shoppingBag">
                  <ShoppingCartIcon className="nav_icon" />
                  <label className="d-md-none">&nbsp;Cart</label>
                </Nav.Link>
                {location.pathname !== "/productsPage" && (
                  <Dropdown className="d-md-none nav_dropdown">
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      Categories
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {" "}
                        <Link to="/productsPage" state={{ from: "" }}>
                          All Products
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/productsPage" state={{ from: "Make Up" }}>
                          Make Up
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/productsPage" state={{ from: "Skin Care" }}>
                          Skin Care
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {" "}
                        <Link to="/productsPage" state={{ from: "Fragrance" }}>
                          Fragrance
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {" "}
                        <Link to="/productsPage" state={{ from: "Hair" }}>
                          Hair
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {" "}
                        <Link
                          to="/productsPage"
                          state={{ from: "Bath and Body" }}
                        >
                          Bath and Body
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {location.pathname !== "/productsPage" && (
                  <Button
                    id="categories_menu_btn"
                    className="md-display categories_menu_btn"
                    onClick={() => {
                      if (showed === "block") setShowed("none");
                      else {
                        setShowed("block");
                      }
                    }}
                  >
                    <MenuIcon className="categories_menu_icon"></MenuIcon>
                  </Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container
        id="menu_Categories_Container"
        className="categories_menu_container"
        style={{ display: showed }}
        fluid
      >
        <ul className="categoriesUl">
          <li>
            <Link to="/productsPage" state={{ from: "" }}>
              All Products
            </Link>
          </li>
          <li>
            <Link to="/productsPage" state={{ from: "Make Up" }}>
              Make Up
            </Link>
          </li>
          <li>
            <Link to="/productsPage" state={{ from: "Skin Care" }}>
              Skin Care
            </Link>
          </li>
          <li>
            <Link to="/productsPage" state={{ from: "Fragrance" }}>
              Fragrance
            </Link>
          </li>
          <li>
            <Link to="/productsPage" state={{ from: "Hair" }}>
              Hair
            </Link>
          </li>
          <li>
            <Link to="/productsPage" state={{ from: "Bath and Body" }}>
              Bath and Body
            </Link>
          </li>
        </ul>
        <img id="img1_menu" src="/Images/HomePage/img9.jpg" alt="" />
        <img className="img2_menu" src="/Images/HomePage/img8.jpg" alt="" />
        <img className="img3_menu" src="/Images/HomePage/img10.jpg" alt="" />
      </Container>
    </React.Fragment>
  );
}
export default NavBar;
