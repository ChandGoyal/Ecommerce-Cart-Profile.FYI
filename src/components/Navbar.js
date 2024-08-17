import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          My Store
        </Link>
        <Link to="/cart" className="flex items-center">
          <FontAwesomeIcon icon={faCartShopping} className="h-6" />
          <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {totalQuantity}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
