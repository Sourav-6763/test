import React, { useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const useremail = useRef();
  const username = useRef();
  const userpassword = useRef();
  const navigate = useNavigate(); // Corrected variable name from 'history' to 'navigate'

  const signupHandle = async (e) => {
    e.preventDefault();

    const Uemail = useremail.current.value;
    const Username = username.current.value;
    const Upassword = userpassword.current.value;
    const payload = { email: Uemail, username: Username, password: Upassword };

    try {
      const response = await axios.post(`${window.location.origin}/register`, payload);

      if (response.data.message === "Email already exists") {
        toast.error(response.data.message);
      } else if (response.data.message === "Signup successful") {
        toast.success(response.data.message);
        setTimeout(() => {
          // Clear input fields
          useremail.current.value = "";
          username.current.value = "";
          userpassword.current.value = "";
          // Navigate to the sign-in page
          navigate("/signin");
        }, 500);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
    }
  };

  return (
    <>
      <Toaster />
      <div className="container d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin w-100 m-auto">
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <form onSubmit={signupHandle}>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                ref={useremail}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingUsername"
                placeholder="Username"
                name="username"
                ref={username}
              />
              <label htmlFor="floatingUsername">Username</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                ref={userpassword}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="submit" // Ensure button is of type "submit" for form handling
            >
              Sign up
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Signup;
