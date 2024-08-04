import Style from "./FeaturedProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  let { data, isLoading } = useQuery(
    "featuredProduct",
    getProducts
  );
  let { addToCart, setnumsOfCartItems } = useContext(cartContext);

  async function addProduct(productId) {
    let { data } = await addToCart(productId);
   
    if (data?.status === "success") {
      toast.success("Product Succsefully added", {
        duration: 5000,
        position: "bottom-left",
        className: "bg-success text-white",
      });
      setnumsOfCartItems(data?.numOfCartItems);
    } else {
      toast.error("Error adding");
    }
     
  }

  function getProducts() {
    window.scrollTo({ top:0, left:0, behavior: "smooth" })
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    
  }
  
  return (
    <div className="row gx-3">
      {isLoading ? (
        <div className="text-center">
          <i className="fas fa-spin fa-3x fa-spinner text-main"></i>
        </div>
      ) : (
        <>
          {data?.data.data.map((product) => (
            <div className="col-md-3 " key={product.id}>
              <div className="product overflow-hidden mt-5">
                <Link
                  className=" text-decoration-none "
                  to={`/productdetails/${product.id}`}
                >
                  <span className="text-main px-2 py-3  text-center fw-bold ">
                    {product.category.name}
                  </span>
                  <div className=" px-2 ">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                      draggable="false"
                    ></img>

                    <h3 className="h6  fw-bolder text-dark px-2  ">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                  </div>
                  <div className="d-flex justify-content-between mt-3 px-2 ">
                    <span className="text-muted mx-2">{product.price} EGP</span>
                    <div className="ms-auto ">
                      <i className="fa fa-star rating-color"></i>
                      <i className="fa fa-star rating-color"></i>
                      <i className="fa fa-star rating-color"></i>
                      <i className="fa fa-star rating-color"></i>
                      <i className="fa fa-star rating-color"></i>
                      <span className="mx-2 text-dark ">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="container py-3 ">
                  <button
                    onClick={() => addProduct(product.id)}
                    className={`${Style.CartBtn}  ${"btn1"}`}
                  >
                    <span className={Style.IconContainer}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                        fill="#fff"
                        className={Style.cart}
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </span>
                    <p className={Style.text}>Add to Cart</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
{
  /* <div className=" px-2 py-2">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-100"
                           draggable='false'
                        ></img>
                        <span className="text-main fw-bold font-sm">
                          {product.category.name}
                        </span>
                        <h3 className="h6 fw-bolder text-dark ">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <span className="text-muted mx-2">{product.price} EGP</span>
                        <div className="ms-auto ">
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <span className="mx-2 text-dark ">
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div> */
}
{
  /* <button className="btn  bg-main text-white w-100 mt-2 mb-2">
                            +Add
                          </button> */
}
{
  /* <div className="product overflow-hidden mt-5">
                        </div> */
}
