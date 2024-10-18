import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import axios from "axios";

// const LoginBitspan = () => {
//   const dispatch = useDispatch();
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/loginWithOTP`,
//         {
//           UserId: userName,
//           password,
//         }
//       );

//       console.log("Full Response:", response);
//       console.log("Response Data:", response.data);
//       console.log("Response User:", response.data.user);

//       if (response?.data?.status === "Success") {
//         if (response.data.message === "OTP sent to your registered email") {
//           setIsOtpSent(true);
//         } else if (response.data.message === "Login successful") {
//           dispatch(setUser(user));
//         }
//         // const user = response?.data?.user;

//         // console.log(user);

//         // if (user && user.role) {
//         //   console.log("User role:", role);
//         //   const { role } = user;

//         //   setUserRole(role);

//         //   if (role === "Retailer" || role === "SuperAdmin") {
//         //     Swal.fire({
//         //       position: "center",
//         //       icon: "success",
//         //       title: "OTP sent to your registered number",
//         //       showConfirmButton: false,
//         //       timer: 1500,
//         //     });
//         //     setIsOtpSent(true);
//         //   } else {
//         //     dispatch(setUser(user));
//         //     Swal.fire({
//         //       position: "center",
//         //       icon: "success",
//         //       title: "Login Successful",
//         //       showConfirmButton: false,
//         //       timer: 1500,
//         //     });
//         //     navigate("/dashboard");
//         //   }
//         // } else {
//         //   Swal.fire({
//         //     icon: "error",
//         //     title: "Login Failed",
//         //     text: "User role information is missing",
//         //   });
//         // }
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: response?.data?.message || "Login failed",
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error.message);
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: "Something went wrong!",
//       });
//     }
//   };

//   const handleOtpVerification = async () => {
//     if (!otp) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing OTP",
//         text: "Please enter the OTP sent to your number",
//       });
//       return;
//     }

//     setLoading(true); // Set loading to true before API call
//     try {
//       const response = await axios.post(
//         `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verifyOTP`,
//         {
//           UserId: userName,
//           otp,
//         }
//       );

//       if (response.data.status === "Success") {
//         dispatch(setUser(response.data.user));
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Login Successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate("/dashboard");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: response.data.message,
//         });
//       }
//     } catch (error) {
//       console.error("OTP Verification error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "OTP Verification Failed",
//         text: "Invalid OTP or something went wrong!",
//       });
//     } finally {
//       setLoading(false); // Set loading to false after API call
//     }
//   };

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
//                       Welcome Back!
//                     </h4>
//                     <p className="mb-5 text-center">
//                       Sign in to continue to Bitspan.
//                     </p>
//                   </div>
//                   <form>
//                     {!isOtpSent ? (
//                       <>
//                         <div data-mdb-input-init className="form-outline mb-4">
//                           <label className="form-label" htmlFor="form2Example1">
//                             User Name
//                           </label>
//                           <input
//                             type="email"
//                             id="form2Example1"
//                             className="form-control"
//                             value={userName}
//                             onChange={(e) => setUserName(e.target.value)}
//                           />
//                         </div>

//                         <div data-mdb-input-init className="form-outline mb-4">
//                           <label className="form-label" htmlFor="form2Example2">
//                             Password
//                           </label>
//                           <input
//                             type="password"
//                             id="form2Example2"
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                           />
//                         </div>

//                         <div className="row mb-4">
//                           <div className="col">
//                             <a href="#!">Forgot password?</a>
//                           </div>
//                         </div>

//                         <div className="d-grid gap-2">
//                           <button
//                             data-mdb-ripple-init
//                             type="button"
//                             className="btn btn-primary btn-block mb-4"
//                             onClick={handleLogin}
//                             disabled={loading} // Disable button while loading
//                           >
//                             {loading ? "Signing in..." : "Sign in"}
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="form-outline mb-4">
//                           <label className="form-label" htmlFor="otpInput">
//                             Enter OTP
//                           </label>
//                           <input
//                             type="text"
//                             id="otpInput"
//                             className="form-control"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                           />
//                         </div>

//                         <div className="d-grid gap-2">
//                           <button
//                             type="button"
//                             className="btn btn-primary btn-block mb-4"
//                             onClick={handleOtpVerification}
//                             disabled={loading} // Disable button while loading
//                           >
//                             {loading ? "Verifying..." : "Verify OTP"}
//                           </button>
//                         </div>
//                       </>
//                     )}
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

// export default LoginBitspan;

const LoginBitspan = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/loginWithOTP`,
        {
          UserId: userName,
          password,
        }
      );

      if (response?.data?.status === "Success") {
        if (response.data.message === "OTP sent to your registered email") {
          setIsOtpSent(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "OTP sent to your registered email",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (response.data.message === "Login successful") {
          const user = response.data.user;
          dispatch(setUser(user));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.data?.message || "Login failed",
        });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const handleOtpVerification = async () => {
    if (!otp) {
      Swal.fire({
        icon: "warning",
        title: "Missing OTP",
        text: "Please enter the OTP sent to your number",
      });
      return;
    }

    setLoading(true); // Set loading to true before the API call
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verifyOTP`,
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
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-4">
            <div className="card">
              <div className="p-4">
                <div className="text-center">
                  <h3>Bitspan.com</h3>
                  <h4 className="text-muted mt-2 text-center fs-5">
                    Welcome Back!
                  </h4>
                  <p className="mb-5 text-center">
                    Sign in to continue to Bitspan.
                  </p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  {!isOtpSent ? (
                    <>
                      <div className="form-outline mb-4">
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

                      <div className="form-outline mb-4">
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
                          <a href="#!">Forgot password?</a>
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <button
                          type="button"
                          className="btn btn-primary btn-block mb-4"
                          onClick={handleLogin}
                          disabled={loading}
                        >
                          {loading ? "Signing in..." : "Sign in"}
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
                          disabled={loading}
                        >
                          {loading ? "Verifying..." : "Verify OTP"}
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
  .otp-inputs {
    display: flex;
    justify-content: space-between;
  }

  .otp-box {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    text-align: center;
    border: 1px solid #ced4da;
    border-radius: 4px;
    margin-right: 5px;
  }

  .otp-box:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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
//                     <p class="mb-5 text-center">
//                       Sign in to continue to Bitspan.
//                     </p>
//                   </div>
//                   <form>
//                     <div data-mdb-input-init class="form-outline mb-4">
//                       <label class="form-label" for="form2Example1">
//                         User Name
//                       </label>
//                       <input
//                         type="email"
//                         id="form2Example1"
//                         class="form-control"
//                         value={userName}
//                         onChange={(e)=> setUserName(e.target.value)}
//                       />
//                     </div>

//                     <div data-mdb-input-init class="form-outline mb-4">
//                       <label class="form-label" for="form2Example2">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         id="form2Example2"
//                         class="form-control"
//                         value={password}
//                         onChange={(e)=> setPassword(e.target.value)}
//                       />
//                     </div>

//                     <div class="row mb-4">
//                       <div class="col d-flex justify-content-center">
//                         <div class="form-check">
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="form2Example34"
//                             checked
//                           />
//                           <label class="form-check-label" for="form2Example34">
//                             {" "}
//                             Remember me{" "}
//                           </label>
//                         </div>
//                       </div>

//                       <div class="col">
//                         <a href="#!">Forgot password?</a>
//                       </div>
//                     </div>

//                     <div className="d-grid gap-2">
//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         class="btn btn-primary btn-block mb-4"
//                         onClick={handelLogin}
//                       >
//                         Sign in
//                       </button>

//                     </div>

//                     {/* <div class="text-center">
//                       <p>
//                         Not a member? <a href="#!">Register</a>
//                       </p>
//                       <p>or sign up with:</p>
//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         class="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i class="fab fa-facebook-f"></i>
//                       </button>

//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         class="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i class="fab fa-google"></i>
//                       </button>

//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         class="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i class="fab fa-twitter"></i>
//                       </button>

//                       <button
//                         data-mdb-ripple-init
//                         type="button"
//                         class="btn btn-secondary btn-floating mx-1"
//                       >
//                         <i class="fab fa-github"></i>
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
