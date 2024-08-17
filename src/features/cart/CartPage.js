import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
  applyCoupon,
} from "./cartSlice";
import formatCurrency from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import CartItem from "../../components/CartItem";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const discount = useSelector((state) => state.cart.discount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");

  const handleCheckout = () => {
    toast.success("Order Placed!");
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleApplyCoupon = () => {
    dispatch(applyCoupon({ coupon: couponCode }));
  };

  const discountedAmount = totalAmount * (1 - discount);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={(quantity) =>
                dispatch(updateQuantity({ id: item.id, quantity }))
              }
              removeFromCart={() => dispatch(removeFromCart(item.id))}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">
          Subtotal: {formatCurrency(totalAmount)}
        </h2>
        <div className="mt-4 flex items-center justify-end">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Use '15OFF' or '25OFF' for Discounts"
            className="border p-2 rounded w-1/4"
          />
          <button
            onClick={handleApplyCoupon}
            className="ml-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Apply Coupon
          </button>
        </div>
        {discount > 0 && (
          <h2 className="mt-4 text-2xl font-bold">
            Total: {formatCurrency(discountedAmount)}
          </h2>
        )}
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
