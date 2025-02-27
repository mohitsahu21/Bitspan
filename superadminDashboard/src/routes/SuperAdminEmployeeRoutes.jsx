import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { clearUser } from "../redux/user/userSlice";

const SuperAdminEmployeeDashboard = lazy(() =>
  import("../components/SuperAdminEmployee/SuperAdminEmployeeDashboard")
);

const SAEProfile = lazy(() =>
  import("../components/SuperAdminEmployee/SAEProfile")
);

const SAEOfflineRechargeHistory = lazy(() =>
  import("../components/SuperAdminEmployee/SAEOfflineRechargeHistory")
);
const SAEOfflineDthConnection = lazy(() =>
  import("../components/SuperAdminEmployee/SAEOfflineDthConnection")
);

const SAEAllOfflineForm = lazy(() =>
  import("../components/SuperAdminEmployee/SAEAllOfflineForm")
);

const SAEPanOfflineHistory = lazy(() =>
  import("../components/SuperAdminEmployee/SAEPanOfflineHistory")
);

const SAEPanTransactionReport = lazy(() =>
  import("../components/SuperAdminEmployee/SAEPanTransactionReport")
);

const SAEPanCorrectionReport = lazy(() =>
  import("../components/SuperAdminEmployee/SAEPanCorrectionReport")
);

const SAEBankIdForms = lazy(() =>
  import("../components/SuperAdminEmployee/SAEBankIdForms")
);

const SAEEdistrictHistory = lazy(() =>
  import("../components/SuperAdminEmployee/SAEEdistrictHistory")
);

const SAEVerifyEdistrictHistory = lazy(() =>
  import("../components/SuperAdminEmployee/SAEVerifyEdistrictHistory")
);
const SAESambalHistory = lazy(() =>
  import("../components/SuperAdminEmployee/SAESambalHistory")
);

const SAEChangePassword = lazy(() =>
  import("../components/SuperAdminEmployee/SAEChangePassword")
);

const SAEAllComplaintsList = lazy(() =>
  import("../components/SuperAdminEmployee/SAEAllComplaintsList")
);

const SAEPanCouponRequests = lazy(() =>
  import("../components/SuperAdminEmployee/SAEPanCouponRequests")
);

const SuperAdminEmployeeRoutes = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const pathname = window.location.pathname;
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  // const userStatus = currentUser?.Status;

  // Logging the current user and token for debugging
  console.log("Current User:", currentUser);
  console.log("Token:", token);
  console.log(status);

  // UseEffect hook to call the API once when the component mounts
  useEffect(() => {
    if (currentUser?.userId && token) {
      fetchUserData();
    } else {
      console.log("Missing userId or token, cannot fetch data.");
    }
  }, [currentUser, token, pathname]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getUserDetails/${currentUser?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Details:", response.data?.data);
      const userStatus = response.data?.data?.Status; // API response se status fetch kar rahe hain
      if (userStatus == "Deactive") {
        Swal.fire({
          icon: "error",
          title: "User Deactive",
          text: "Please contact Admin!",
        });
        dispatch(clearUser());
        navigate("/");
      }
      console.log("Fetched User Status:", userStatus);

      setStatus(userStatus); // Status ko state mein set karenge
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show Loading State Before Redirects
  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Wrapper>
    );
  }

  return (
    <React.Fragment>
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
          <Routes>
            <Route
              path="/dashboard"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SuperAdminEmployeeDashboard />
                )
              }
            />

            <Route path="/update-profile" element={<SAEProfile />} />

            <Route
              path="/Offline-Recharge-history"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEOfflineRechargeHistory />
                )
              }
            />
            <Route
              path="/Offline-dth-connection"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEOfflineDthConnection />
                )
              }
            />

            <Route
              path="/view-all-offline-history"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEAllOfflineForm />
                )
              }
            />

            <Route
              path="/Pan-offline-history"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEPanOfflineHistory />
                )
              }
            />

            <Route
              path="/pan-transaction-report"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEPanTransactionReport />
                )
              }
            />

            <Route
              path="/pan-correction-report"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEPanCorrectionReport />
                )
              }
            />

            <Route path="/Bank-Id-history" element={<SAEBankIdForms />} />

            <Route
              path="/E-district-history"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEEdistrictHistory />
                )
              }
            />

            <Route
              path="/verify-E-district-form-history"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEVerifyEdistrictHistory />
                )
              }
            />

            <Route
              path="/sambal-form-history"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAESambalHistory />
                )
              }
            />

            <Route
              path="/change-password"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEChangePassword />
                )
              }
            />

            <Route
              path="/complaint-raised-list"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEAllComplaintsList />
                )
              }
            />

            <Route
              path="/pan-coupon-requests"
              element={
                status === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <SAEPanCouponRequests />
                )
              }
            />
          </Routes>
        </Suspense>
      </Wrapper>
    </React.Fragment>
  );
};

export default SuperAdminEmployeeRoutes;

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
    /* background-color: rgba(255, 255, 255, 0.8); */
    /* Optional: Add a semi-transparent background */
    z-index: 9999; /* Ensures it stays above other content */
    background-color: transparent;
  }
`;
