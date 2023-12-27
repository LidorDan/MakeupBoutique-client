import NavBar from "../components/NavBar";
import ImagesCarousel from "../components/ImagesCarousel";
import "../styles/HomePage.css";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import AdPopup from "../components/AdPopup";
import { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const [usersAmount, setUsersAmount] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      setUsersAmount(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <NavBar></NavBar>
      {isAdmin === "true" ? (
        <h3 className="clients_in_homepage">
          {usersAmount} {usersAmount !== "1" ? " clients " : " client"}
          {usersAmount !== "1" ? "are " : " is "}
          currently using homepage{" "}
        </h3>
      ) : (
        ""
      )}
      <AdPopup></AdPopup>;
      <ImagesCarousel />
      <br></br>
      <br></br>
      <Container className="aboutContainer">
        <h2>About Us:</h2>
        <p>
          Welcome to our website! On our Makeup Boutique website you can find
          makeup and beauty products.
          <br></br>
          Our vision is to help pepole feel more confident and beauty by using
          our products. We offer products such as:
          <br></br>
          <br></br>- Makeup
          <br></br> - Skin care
          <br></br> - Fragrance
          <br></br> - Nails care
          <br></br> - Hair and beuty products
        </p>
        <br></br>
        <br></br>
        <Row className="imagesRow justify-content-center">
          <img className="col-3" src="/Images/HomePage/img4.jpg" alt=""></img>
          <img className="col-3" src="/Images/HomePage/img5.jpg" alt=""></img>
          <img className="col-3" src="/Images/HomePage/img6.jpg" alt=""></img>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
