import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import axios from "axios";

const LoginBitspan = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7171/api/auth/log-reg/loginWithOTP`,
        {
          UserId: userName,
          password,
        }
      );

      console.log(response.data);

      if (response.data.status === "Success") {
        const role = response.data.user;

        setUserRole(role);
        console.log(role);
        setIsOtpSent(true);
        dispatch(setUser(response.data.user));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong!",
      });
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7171/api/auth/log-reg/verifyOTP`,
        {
          UserId: userName,
          otp,
        }
      );

      if (response.data.status === "Success") {
        dispatch(setUser(response.data.user));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("OTP Verification error:", error);
      Swal.fire({
        icon: "error",
        title: "OTP Verification Failed",
        text: "Invalid OTP or something went wrong!",
      });
    }
  };

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
                    <p className="mb-5 text-center">
                      Sign in to continue to Bitspan.
                    </p>
                  </div>
                  <form>
                    {!isOtpSent ? (
                      <>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example1">
                            User Name
                          </label>
                          <input
                            type="email"
                            id="form2Example1"
                            className="form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example2">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example2"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <Link to="/password-reset">Forgot password?</Link>
                          </div>
                        </div>

                        <div className="d-grid gap-2">
                          <button
                            data-mdb-ripple-init
                            type="button"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleLogin}
                          >
                            Sign in
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="otpInput">
                            Enter OTP
                          </label>
                          <input
                            type="text"
                            id="otpInput"
                            className="form-control"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>

                        <div className="d-grid gap-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleOtpVerification}
                          >
                            Verify OTP
                          </button>
                        </div>
                      </>
                    )}
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

// const LoginBitspan = () => {

//   const dispatch = useDispatch();
//   const [userName,setUserName] = useState("")
//   const [password, setPassword] = useState("");

//   const users = [{
//     id: 1,
//     name: "Mohit Sahu",
//     userName : "MOHIT0001",
//     password: "mohit",
//     email: "mohit@gmail.com",
//     role: "WhiteLabel"
//   },
//   {
//     id: 2,
//     name: "Dev ansh",
//     userName : "DEV0002",
//     password: "dev",
//     email: "dev@gmail.com",
//     role: "Retailer"
//   },
//   {
//     id: 3,
//     name: "Shubham Soni",
//     userName : "SHUBH0003",
//     password: "shubh",
//     email: "shubh@gmail.com",
//     role: "Distributor"
//   },
//   {
//     id: 4,
//     name: "Vinay dhariya",
//     userName : "VINAY0003",
//     password: "vinay",
//     email: "vinay@gmail.com",
//     role: "SuperDistributor"
//   },
//   {
//     id: 5,
//     name: "Rahul Tiwari",
//     userName : "RAHUL0004",
//     password: "rahul",
//     email: "rahul@gmail.com",
//     role: "SuperAdmin"
//   },

// ]

//   const navigate = useNavigate();
//   const handelLogin = ()=>{

//     const  getUser = ()=>{
//       const user = users.find((user)=> user.userName === userName && user.password === password)
//       console.log(user)
//       if(user){
//         dispatch(setUser(user))
//         Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Login Successfull",
//       showConfirmButton: false,
//       timer: 1500
//     });
//     navigate("/dashboard")
//     }
//     else{
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!",

//       });
//     }

//   }
//   getUser()
//   }
//   return (
//     <>
//       <Wrapper>

//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-md-8 col-lg-8 col-xl-4">
//               <div className="card">
//                 <div className="p-4">
//                   <div className="text-center">
//                     <h3>Bitspan.com</h3>
//                     <h4 className="text-muted mt-2 text-center fs-5">
//                       Welcome Back !
//                     </h4>
//                     <p className="mb-5 text-center">
//                       Sign in to continue to Bitspan.
//                     </p>
//                   </div>
//                   <form>
//                     <div data-mdb-input-init className="form-outline mb-4">
//                       <label className="form-label" htmlFor="form2Example1">
//                         User Name
//                       </label>
//                       <input
//                         type="email"
//                         id="form2Example1"
//                         className="form-control"
//                         value={userName}
//                         onChange={(e)=> setUserName(e.target.value)}
//                       />
//                     </div>

//                     <div data-mdb-input-init className="form-outline mb-4">
//                       <label className="form-label" htmlFor="form2Example2">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         id="form2Example2"
//                         className="form-control"
//                         value={password}
//                         onChange={(e)=> setPassword(e.target.value)}
//                       />
//                     </div>

//                     <div className="row mb-4">
//                       <div className="col d-flex justify-content-center">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="form2Example34"
//                             checked
//                           />
//                           <label className="form-check-label" htmlFor="form2Example34">
//                             {" "}
//                             Remember me{" "}
//                           </label>
//                         </div>
//                       </div>

//                       <div className="col">
//                         <a href="#!">Forgot password?</a>
//                       </div>
//                     </div>

//                     <div className="d-grid gap-2">
//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         className="btn btn-primary btn-block mb-4"
//                         onClick={handelLogin}
//                       >
//                         Sign in
//                       </button>

//                     </div>

//                     {/* <div className="text-center">
//                       <p>
//                         Not a member? <a href="#!">Register</a>
//                       </p>
//                       <p>or sign up with:</p>
//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         className="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i className="fab fa-facebook-f"></i>
//                       </button>

//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         className="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i className="fab fa-google"></i>
//                       </button>

//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         className="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i className="fab fa-twitter"></i>
//                       </button>

//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         className="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i className="fab fa-github"></i>
//                       </button>
//                     </div> */}
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Wrapper>
//     </>
//   );
// };
