import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouter(Props) {
  if (localStorage.getItem('userToken') !== null) {
    return Props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
