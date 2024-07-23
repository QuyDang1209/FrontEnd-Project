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
    { id: 1, url: 'https://demo-source.imgix.net/house.jpg?fit=max&w=944&h=351.333&dpr=2&q=50&auto=format%2Ccompress&cacheID=3432356195' },
    { id: 2, url: 'https://th.bing.com/th/id/OIP.K2XHZApjhJtr7KaMROuZiQHaE7?rs=1&pid=ImgDetMain' },
    { id: 3, url: 'https://th.bing.com/th/id/OIP.ci1E7m8wCISyHZ6um8z01gHaDt?rs=1&pid=ImgDetMain' },
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
