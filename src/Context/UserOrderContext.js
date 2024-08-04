import axios from "axios";
import { createContext} from "react";

export let UserOrderContext = createContext();



export default function UserOrderContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };

  

  function cashPayment(cartId, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  }

  function getUserOrder(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <UserOrderContext.Provider value={{ getUserOrder, cashPayment }}>
      {props.children}
    </UserOrderContext.Provider>
  );
}
