import React from "react";
import logo from '../../Assets/Images/illustration-vector-graphic-cartoon-character-404-network-disruption_516790-2319.avif'
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Not Found Page" />
      </Helmet>
      <div className="w-50 px-5 mx-auto">
        <img src={logo} alt="Not Found" className="w-100 " draggable="false"/>
      </div>
    </>
  );
}
