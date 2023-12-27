import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

import "../styles/ImagesCarousel.css";
function ImagesCarousel() {
  return (
    <Container className="ImagesCarouselContainer">
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/HomePage/Logo.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/HomePage/img1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/HomePage/img2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/HomePage/img7.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default ImagesCarousel;
