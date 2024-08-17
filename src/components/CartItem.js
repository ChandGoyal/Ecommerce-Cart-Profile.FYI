import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-12 p-2 border rounded"
        />
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
