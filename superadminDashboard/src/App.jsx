// import { Route, Routes, useLocation } from "react-router-dom";
// import LoginBitspan from "./components/LoginBitspan";
// import Sider from "./components/SideBar";
// import "./App.css";
// import { useEffect, useState } from "react";
// import SuperDistributorRoutes from "./routes/SuperDistributorRoutes";
// import RetailerRoutes from "./routes/RetailerRoutes";
// import Distributor from "./routes/Distributor";
// import WhiteLabelRoutes from "./routes/WhiteLabelRoutes";
// import { useDispatch, useSelector } from "react-redux";
// import SuperAdminRoutes from "./routes/SuperAdminRoutes";
// import ForgotPassword from "./components/ForgotPassword";

// function App() {
//   const { currentUser } = useSelector((state) => state.user);
//   const location = useLocation();
//   const [user, setUser] = useState(currentUser?.role);

//   // console.log(import.meta.env.VITE_userId)
//   useEffect(() => {
//     setUser(currentUser?.role);
//   }, [currentUser?.role]);
//   return (
//     <>
//       {location.pathname !== "/" &&
//         location.pathname !== "/password-reset" &&
//         location.pathname !== "/download-certificate-print" &&
//         location.pathname !== "/registration-page" && <Sider />}

//       <Routes>
//         <Route path="/" element={<LoginBitspan />} />
//         <Route path="/password-reset" element={<ForgotPassword />} />
//       </Routes>
//       {user === "Retailer" && <RetailerRoutes />}
//       {user === "SuperDistributor" && <SuperDistributorRoutes />}
//       {user === "Distributor" && <Distributor />}
//       {user === "WhiteLabel" && <WhiteLabelRoutes />}
//       {user === "SuperAdmin" && <SuperAdminRoutes />}
//     </>
//   );
// }

// export default App;
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import NotFound from "./components/NotFound";
import Payment from "./pages/Payment";
// Lazy routes
const LoginBitspan = lazy(() => import("./components/LoginBitspan"));
const Sider = lazy(() => import("./components/SideBar"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const SuperAdminRoutes = lazy(() => import("./routes/SuperAdminRoutes"));
const RetailerRoutes = lazy(() => import("./routes/RetailerRoutes"));
const Distributor = lazy(() => import("./routes/Distributor"));
const WhiteLabelRoutes = lazy(() => import("./routes/WhiteLabelRoutes"));
const SuperDistributorRoutes = lazy(() =>
  import("./routes/SuperDistributorRoutes")
);
const SuperAdminEmployeeRoutes = lazy(() =>
  import("./routes/SuperAdminEmployeeRoutes")
);

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [user, setUser] = useState(currentUser?.role);

  // console.log(import.meta.env.VITE_userId)
  useEffect(() => {
    setUser(currentUser?.role);
  }, [currentUser?.role]);
  return (
    <>
      <Wrapper>
        <Suspense
          fallback={
            <div className="loading-container">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        >
          {currentUser &&
            location.pathname !== "/" &&
            location.pathname !== "/password-reset" &&
            location.pathname !== "/download-certificate-print" &&
            location.pathname !== "/recharge-receipt" &&
            location.pathname !== "/registration-page" &&
            location.pathname !== "/payment" && <Sider />}

          <Routes>
            <Route
              path="/"
              element={
                currentUser ? <Navigate to="/dashboard" /> : <LoginBitspan />
              }
            />
            <Route
              path="/password-reset"
              element={
                currentUser ? <Navigate to="/dashboard" /> : <ForgotPassword />
              }
            />
            <Route
              path="/payment"
              element={currentUser ? <Navigate to="/" /> : <Payment />}
            />
            {/* {!currentUser && < Route path="/payment" element={<Payment user={user} />} />} */}
            {!currentUser && <Route path="*" element={<NotFound />} />}
          </Routes>
          {user === "Retailer" && <RetailerRoutes />}
          {user === "SuperDistributor" && <SuperDistributorRoutes />}
          {user === "Distributor" && <Distributor />}
          {user === "WhiteLabel" && <WhiteLabelRoutes />}
          {user === "SuperAdmin" && <SuperAdminRoutes />}
          {user === "SuperAdmin_Employee" && <SuperAdminEmployeeRoutes />}
        </Suspense>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  .loading-container {
    position: fixed; /* Sticks to the viewport */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /* Horizontally centers the content */
    align-items: center; /* Vertically centers the content */
    background-color: rgba(
      255,
      255,
      255,
      0.8
    ); /* Optional: Add a semi-transparent background */
    z-index: 9999; /* Ensures it stays above other content */
  }
`;
