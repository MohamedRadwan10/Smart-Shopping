import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export default function Brands() {

  let { isLoading, data} = useQuery(
    "Brands",
    getBrands
  );

  function getBrands() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }


  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands Page" />
      </Helmet>
      <div className="row gx-3">
        <h2 className=' fs-1 fw-bolder'>All Brands</h2>
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spin fa-3x fa-spinner text-main"></i>
          </div>
        ) : (
          <>
            {data?.data.data.map((brand) => (
              <div key={brand._id} className="col-md-3">
                <div className="product overflow-hidden mt-5 cursor-pointer">
                  <div className="mb-4">
                    <img
                      className="w-100"
                      src={brand.image}
                      alt={brand.name}
                      draggable="false"
                    />
                    <h2 className="h6 mt-3 fs-4 fw-bolder text-center">{brand.name}</h2>
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

