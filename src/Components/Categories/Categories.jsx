import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Categories() {
  let { isLoading, data} = useQuery(
    "Category",
    getCategory
  );

  function getCategory() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Categories Page" />
      </Helmet>
      <div className="row gx-3">
      <h2 className=' fs-1 fw-bolder'>Our Categories</h2>
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spin fa-3x fa-spinner text-main"></i>
          </div>
        ) : (
          <>
            {data?.data.data.map((category) => (
              <div key={category._id} className="col-md-3">
                <div className="product overflow-hidden mt-5 cursor-pointer">
                  <div className="mb-4">
                    <img
                      height={350}
                      className="w-100"
                      src={category.image}
                      alt={category.name}
                      draggable="false"
                    />
                    <h2 className="h6 mt-3 fw-bolder text-center">{category.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
