import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import { UserTokenContext } from "./Context/UserTokenContext";
import { useContext, useEffect } from "react";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import CartContextProvider, { cartContext } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Order from "./Components/Order/Order";
import Address from "./Components/Address/Address";
import UserOrderContextProvider from "./Context/UserOrderContext";
import Profile from "./Components/Profile/Profile";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRouter>
            <Categories />
          </ProtectedRouter>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRouter>
            <ProductsDetails />
          </ProtectedRouter>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRouter>
            <Products />
          </ProtectedRouter>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRouter>
            <Brands />
          </ProtectedRouter>
        ),
      },
      {
        path: "address",
        element: (
          <ProtectedRouter>
            <Address />
          </ProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },

      {
        path: "order",
        element: (
          <ProtectedRouter>
            <Order />
          </ProtectedRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  let { setUserToken, setUserData } = useContext(UserTokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
    if (localStorage.getItem("userData") !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  return (
    <>
      <CartContextProvider>
        <UserOrderContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </UserOrderContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
