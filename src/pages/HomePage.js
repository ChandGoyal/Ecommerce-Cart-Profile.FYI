import React from "react";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;
