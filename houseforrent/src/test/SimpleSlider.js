import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slidesData = [
    { id: 1, url: 'https://via.placeholder.com/800x400?text=Slide+1' },
    { id: 2, url: 'https://via.placeholder.com/800x400?text=Slide+2' },
    { id: 3, url: 'https://via.placeholder.com/800x400?text=Slide+3' },
  ];

  return (
    <div className="slide-container">
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div key={slide.id}>
            <img src={slide.url} alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
