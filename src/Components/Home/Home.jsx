import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Smart Shopping</title>
        <meta name="description" content="User Smart Shopping Website"/>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}
