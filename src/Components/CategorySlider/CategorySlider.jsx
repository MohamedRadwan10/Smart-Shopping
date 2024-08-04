import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  let { isLoading, data} = useQuery(
    "CategorySlider",
    getCategory
  );

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 7000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    autoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const categories = data?.data.data;
  return (
    <>
      <div className="my-5 ">
        <Link
          to="/categories"
          className="text-decoration-none text-dark text-center "
        >
          {isLoading ? (
            <div className="text-center mb-5">
              <i className="fas fa-spin fa-3x fa-spinner text-main"></i>
            </div>
          ) : (
            <>
              <div className="my-5">
                <h2 className="h5 text-start fw-semibold">Shop Popular Categories</h2>
                <Slider {...settings}>
                  {categories
                    ? categories.map((catg) => {
                        return (
                          <div key={catg._id}>
                            <img
                              src={catg.image}
                              alt={catg.name}
                              className="w-100 cursor-pointer"
                              height={200}
                            />
                            <h3 className="h6 mt-2">{catg.name}</h3>
                          </div>
                        );
                      })
                    : ""}
                </Slider>
              </div>
            </>
          )}
        </Link>
      </div>
    </>
  );
}
