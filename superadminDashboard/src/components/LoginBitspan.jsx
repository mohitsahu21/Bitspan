import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { setUser } from '../redux/user/userSlice';



const LoginBitspan = () => {
  
  const dispatch = useDispatch();
  const [userName,setUserName] = useState("")
  const [password, setPassword] = useState("");

  const users = [{
    id: 1,
    name: "Mohit Sahu",
    userName : "MOHIT0001",
    password: "mohit",
    email: "mohit@gmail.com",
    role: "WhiteLabel"
  },
  {
    id: 2,
    name: "Dev ansh",
    userName : "DEV0002",
    password: "dev",
    email: "dev@gmail.com",
    role: "Retailer"
  },
  {
    id: 3,
    name: "Shubham Soni",
    userName : "SHUBH0003",
    password: "shubh",
    email: "shubh@gmail.com",
    role: "Distributor"
  },
  {
    id: 4,
    name: "Vinay dhariya",
    userName : "VINAY0003",
    password: "vinay",
    email: "vinay@gmail.com",
    role: "SuperDistributor"
  },
  {
    id: 5,
    name: "Rahul Tiwari",
    userName : "RAHUL0004",
    password: "rahul",
    email: "rahul@gmail.com",
    role: "SuperAdmin"
  },

]

  const navigate = useNavigate();
  const handelLogin = ()=>{

    const  getUser = ()=>{
      const user = users.find((user)=> user.userName === userName && user.password === password)
      console.log(user)
      if(user){
        dispatch(setUser(user))
        Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successfull",
      showConfirmButton: false,
      timer: 1500
    });
    navigate("/dashboard")
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        
      });
    }
    
  }
  getUser()
  }
  return (
    <>
      <Wrapper>
      
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xl-4">
              <div className="card">
                <div className="p-4">
                  <div className="text-center">
                    <h3>Bitspan.com</h3>
                    <h4 className="text-muted mt-2 text-center fs-5">
                      Welcome Back !
                    </h4>
                    <p class="mb-5 text-center">
                      Sign in to continue to Bitspan.
                    </p>
                  </div>
                  <form>
                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="form2Example1">
                        User Name
                      </label>
                      <input
                        type="email"
                        id="form2Example1"
                        class="form-control"
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                      />
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="form2Example2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form2Example2"
                        class="form-control"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                      />
                    </div>

                    <div class="row mb-4">
                      <div class="col d-flex justify-content-center">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="form2Example34"
                            checked
                          />
                          <label class="form-check-label" for="form2Example34">
                            {" "}
                            Remember me{" "}
                          </label>
                        </div>
                      </div>

                      <div class="col">
                        <a href="#!">Forgot password?</a>
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        data-mdb-ripple-init
                        type="button"
                        class="btn btn-primary btn-block mb-4"
                        onClick={handelLogin}
                      >
                        Sign in
                      </button>
                    
                    </div>

                    {/* <div class="text-center">
                      <p>
                        Not a member? <a href="#!">Register</a>
                      </p>
                      <p>or sign up with:</p>
                      <button
                        data-mdb-ripple-init
                        type="button"
                        class="btn btn-secondary btn-floating mx-1"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </button>

                      <button
                        data-mdb-ripple-init
                        type="button"
                        class="btn btn-secondary btn-floating mx-1"
                      >
                        <i class="fab fa-google"></i>
                      </button>

                      <button
                        data-mdb-ripple-init
                        type="button"
                        class="btn btn-secondary btn-floating mx-1"
                      >
                        <i class="fab fa-twitter"></i>
                      </button>

                      <button
                        data-mdb-ripple-init
                        type="button"
                        class="btn btn-secondary btn-floating mx-1"
                      >
                        <i class="fab fa-github"></i>
                      </button>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default LoginBitspan;
const Wrapper = styled.div`
  background-color: black;
  bottom: 0;
  height: 100%;
  left: 0;
  /* opacity: 0.; */
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  .card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    margin-top: 8rem;
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  h3 {
    color: #0bb197;
  }
  button {
    background-color: #0bb197;
    color: #ffffff;
    border: #0bb197;
    :hover {
      background-color: #92d6cc;
    }
  }
`;
