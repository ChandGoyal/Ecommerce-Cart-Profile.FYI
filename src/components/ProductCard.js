import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!");
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
      <p className="text-gray-600 mt-2">
        {product.description.substring(0, 100)}...
      </p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
