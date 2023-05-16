import React from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselComponent({ itemsCarousel }) {
  return (
    <div>
      <Carousel variant="dark" style={{ width: 700, margin: "auto" }}>
        {itemsCarousel?.map((item) => (
          <Carousel.Item>
            <img className="" src={item.img} style={{ width: 700 }} alt="" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
