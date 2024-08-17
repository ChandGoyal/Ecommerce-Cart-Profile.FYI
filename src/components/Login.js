import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { USER_AVATAR } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleUserLogin = () => {
    // Validate the Form Data
    const nameValue = name.current ? name.current.value : "";
    const message = checkValidData(
      nameValue,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/products");
            })
            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(`${errorCode} : ${errorMessage}`);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} : ${errorMessage}`);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          navigate("/products");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} : ${errorMessage}`);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded w-full"
              required
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="border p-3 rounded w-full"
            required
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="border p-3 rounded w-full"
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleUserLogin}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          {isSignInForm ? (
            <p className="text-center text-sm mt-4">
              <span className="text-gray-600">New to Netflix? </span>
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={toggleSignInForm}
              >
                Sign up now.
              </span>
            </p>
          ) : (
            <p className="text-center text-sm mt-4">
              <span className="text-gray-600">Already registered? </span>
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={toggleSignInForm}
              >
                Sign in now.
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
