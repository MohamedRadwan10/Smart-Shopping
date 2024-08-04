import React from "react";
import Slider from "react-slick";
import slide1 from "../../Assets/Images/slider-image-1.jpeg";
import slide2 from "../../Assets/Images/slider-image-2.jpeg";
import slide3 from "../../Assets/Images/slider-image-3.jpeg";
import blog1 from "../../Assets/Images/slider-2.jpeg";
import blog2 from "../../Assets/Images/grocery-banner-2.jpeg";
export default function MainSlider() {
  var settings = {
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
  };

  return (
    <>
      <div className="row gx-0 mb-5">
        <div className="col-md-8">
          <Slider {...settings}>
            <img src={blog2} height={420} alt="" className="w-100"  draggable='false'/>
            <img src={slide1} height={420} alt="" className="w-100"  draggable='false'/>
            <img src={slide3} height={420} alt="" className="w-100"  draggable='false'/>
          </Slider>
        </div>
        <div className="col-md-4 d-none d-lg-block">
          <img src={slide2} height={210}  alt="" className="w-100" draggable='false'/>
          <img src={blog1}  height={210} alt="" className="w-100"  draggable='false'/>
        </div>
      </div>
    </>
  );
}
