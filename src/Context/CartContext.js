import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [numsOfCartItems, setnumsOfCartItems] = useState(0);
  const [CartId, setCartId] = useState(null);

  function clearCartItem() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setnumsOfCartItems(0);
        return response;
      })
      .catch((error) => error);
  }

  function UpdateCartItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function removeCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      })
      .then((response) => {
        setnumsOfCartItems(response?.data?.numOfCartItems);
        setCartId(response?.data?.data._id);
        return response;
      })
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        UpdateCartItem,
        clearCartItem,
        numsOfCartItems,
        setnumsOfCartItems,
        CartId,
        setCartId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
