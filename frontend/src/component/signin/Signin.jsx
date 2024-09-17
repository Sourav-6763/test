import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {authActions} from "../../store"

function Signin() {
 const dispatch = useDispatch();
    const useremail = useRef();
    const userpassword = useRef();
    const history = useNavigate();

    const signinHandel = async (e) => {
      e.preventDefault();
  
      const Uemail = useremail.current.value;
      const Upassword = userpassword.current.value;
      const a = {email: Uemail, password: Upassword};
      await axios.post(`${window.location.origin}/signin`,a).then((Response) => {
        sessionStorage.setItem("id",Response.data.others._id);
        dispatch(authActions.login())
        history("/todo");
      });
    };

  




  return (
    <>
      <div className="container d-flex align-items-center py-4 bg-body-tertiary ">
        <main className="form-signin w-100 m-auto">
          <form  onClick={signinHandel}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                ref={useremail}
              />
              <label for="floatingInput">Email address</label>
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
              <label for="floatingPassword">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Signin;
