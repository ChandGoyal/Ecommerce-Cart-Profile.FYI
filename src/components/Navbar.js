import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/products" className="text-2xl font-bold">
          My Store
        </Link>
        <div className="flex items-center">
          <Link to="/cart" className="flex items-center mr-4">
            <FontAwesomeIcon icon={faCartShopping} className="h-6" />
            {totalQuantity > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
          {user && (
            <>
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full mr-4 cursor-pointer"
              />
              <button
                className="text-white bg-red-600 py-1 px-3 rounded hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
