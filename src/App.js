import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./features/cart/CartPage";
import Notification from "./components/Notification";
import Login from "./components/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Navbar />
          <HomePage />
          <Notification />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar />
          <CartPage />
          <Notification />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
