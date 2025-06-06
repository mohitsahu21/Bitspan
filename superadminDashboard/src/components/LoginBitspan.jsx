import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser, fetchWalletBalance } from "../redux/user/userSlice";
import axios from "axios";

const LoginBitspan = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [otp, setOtp] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => navigate("/"));

    return () => {
      window.removeEventListener("popstate", () => navigate("/"));
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/log-reg/loginWithOTP`,
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
          const token = response.data.token;
          dispatch(setUser({ user, token }));
          console.log(user);

          dispatch(fetchWalletBalance(user?.userId));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate("/dashboard");
        } else if (response.data.message === "User is Invalid") {
          console.error("Login error:", response.data.message);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Something went wrong!",
          });
        } else if (response.data.message === "User is Deactivate") {
          console.error("Login error:", response.data.message);
          Swal.fire({
            icon: "error",
            title: "User Deactivate",
            text: "Please Contact Admin",
          });
        } else if (response.data.message === "User Payment is Pending") {
          console.error("Login error:", response.data.message);
          // Swal.fire({
          //         icon: "error",
          //         title: "User Payment is Pending",
          //         text: "Please Make Payment First Or Contact Admin if Payment Done",
          //       });
          //       // dispatch(clearUser());

          //       navigate("/payment" , { state: { user: response.data.user } });
          // Navigate to the success page and pass the response data
          Swal.fire({
            title: "User Payment is Pending",
            text: "Please Make Payment First Or Contact Admin if Payment Done",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Pay Now",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              // Swal.fire("Saved!", "", "success");
              navigate("/payment", { state: { user: response.data.user } });
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        } else if (response.data.message === "User KYC is Pending") {
          console.error("Login error:", response.data.message);
          const user = response.data.user;
          const token = response.data.token;
          dispatch(setUser({ user, token }));
          // Swal.fire({
          //   icon: "error",
          //   title: "User KYC Pending",
          //   text: "Please Submit KYC to use Services",
          // });
          navigate("/update-profile");
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
      console.log(error);
      if (
        error?.response?.data?.status === "Failure" &&
        (error?.response?.data?.message === "User not found" ||
          error?.response?.data?.message === "Invalid password")
      ) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "The User Id or Password you entered is incorrect.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong!",
        });
      }
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Only digits
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if the current one is filled
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      newOtp[index] = ""; // Clear the current digit if value is empty
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];

      // Clear the current input value
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to the previous input and clear it
        inputsRef.current[index - 1].focus();
      }
    }

    // Allow users to navigate with the arrow keys
    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpVerification = async () => {
    const otpValue = otp.join("");
    if (!otpValue || otpValue.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Missing OTP",
        text: "Please enter the OTP sent to your number",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/log-reg/verifyOTP`,
        { UserId: userName, otp: otpValue }
      );

      if (response.data.status === "Success") {
        // dispatch(setUser(response.data.user));
        const user = response.data.user;
        const token = response.data.token;
        dispatch(setUser({ user, token }));
        console.log(user);
        dispatch(fetchWalletBalance(user.userId));
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
      setLoading(false);
    }
  };

  // const handlebutton = (e) => {
  //   if (e.key === "Enter") {
  //     handleLogin();
  //   }
  // };

  const handlebutton = (e) => {
    if (e.key === "Enter") {
      if (isOtpSent) {
        handleOtpVerification();
      } else {
        handleLogin();
      }
    }
  };

  // const handleOtpVerification = async () => {
  //   if (!otp) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Missing OTP",
  //       text: "Please enter the OTP sent to your number",
  //     });
  //     return;
  //   }

  //   setLoading(true); // Set loading to true before the API call
  //   try {
  //     const response = await axios.post(
  //       `https://2kadam.co.in/api/auth/log-reg/verifyOTP`,
  //       {
  //         UserId: userName,
  //         otp,
  //       }
  //     );

  //     if (response.data.status === "Success") {
  //       dispatch(setUser(response.data.user));
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Login Successful",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       navigate("/dashboard");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: response.data.message,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("OTP Verification error:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "OTP Verification Failed",
  //       text: "Invalid OTP or something went wrong!",
  //     });
  //   } finally {
  //     setLoading(false); // Set loading to false after the API call
  //   }
  // };

  useEffect(() => {
    if (isOtpSent && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [isOtpSent]);

  return (
    <Wrapper>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-4">
            <div className="card">
              {/* <div className="p-4"> */}
              <div className="space">
                {/* <div className="text-center">
                  <h3>Bitspan.com</h3>
                  <h4 className="text-muted mt-2 text-center fs-5">
                    Welcome Back!
                  </h4>
                  <p className="mb-5 text-center">
                    Sign in to continue to Bitspan.
                  </p>
                </div> */}
                <div className="text-center">
                  <h3>Welcome Back!</h3>
                  <h4 className="text-muted mt-2 text-center fs-5">
                    Sign in to continue to Dashboard
                  </h4>
                  <p className="mb-5 text-center"></p>
                </div>
                {/* <form onSubmit={(e) => e.preventDefault()}> */}
                <form onSubmit={handleLogin}>
                  {!isOtpSent ? (
                    <>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">
                          User ID
                        </label>
                        <input
                          type="text"
                          id="form2Example1"
                          className="form-control"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          onKeyDown={handlebutton}
                          required
                          placeholder="Enter your User ID"
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
                          onKeyDown={handlebutton}
                          required
                          placeholder="Enter your password"
                        />
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <Link to="/password-reset">Forgot password?</Link>
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <button
                          // type="button"
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                          // onClick={handleLogin}
                          disabled={loading}
                        >
                          {loading ? "Signing in..." : "Sign in"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <div className="form-outline mb-4">
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
                      </div> */}

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="otpInput">
                          Enter OTP
                        </label>
                        <div className="otp-inputs">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength="1"
                              value={digit}
                              ref={(el) => (inputsRef.current[index] = el)}
                              onChange={(e) => handleChange(e.target, index)}
                              // onKeyDown={(e) => handleKeyDown(e, index)}
                              onKeyDown={(e) => {
                                handleKeyDown(e, index);
                                handlebutton(e); // Also check for "Enter" key
                              }}
                              className="otp-input"
                            />
                          ))}
                        </div>
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
  background: linear-gradient(135deg, #0bb197, #00665c);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: black;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%; */
  .card {
    /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    margin-top: 8rem; */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.6s ease-out;
    border-radius: 16px;
    padding: 2rem;
    background: #fff;
    width: 100%;
  }
  .space {
    padding: 1.5rem;
    @media screen and (max-width: 768px) {
      padding: 0rem;
    }
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  h3 {
    color: #0bb197;
    font-weight: 700;
  }
  h4 {
    font-weight: 500;
    color: #6c757d;
  }
  label {
    font-weight: 500;
  }
  .form-control {
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }
  .form-control:focus {
    box-shadow: 0 0 0 0.15rem rgba(11, 177, 151, 0.25);
    border-color: #0bb197;
  }
  button {
    background-color: #0bb197;
    color: #ffffff;
    border: #0bb197;
    transition: background-color 0.5s ease;
    :hover {
      background-color: #92d6cc;
    }
  }
  @keyframes slideIn {
    from {
      transform: translateY(40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .otp-inputs {
    display: flex;
    justify-content: space-between;
    gap: 3px;
  }

  .otp-input {
    width: 40px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  .otp-input:focus {
    border-color: #0bb197;
    outline: none;
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
