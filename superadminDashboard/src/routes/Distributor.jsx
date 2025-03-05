import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import DStepVerification from "../components/Distributor/DStepVerification";
import CreateRetailer from "../components/Distributor/CreateRetailer";
import DUTIPanTransactionReport from "../components/Distributor/DUTIPanTransactionReport";
import DDistributeCoupon from "../components/Distributor/DDistributeCoupon";

import DUTICouponHistory from "../components/Distributor/DUTICouponHistory";
import DChangePrice from "../components/Distributor/DChangePrice";

import Certificate from "../components/Distributor/Certificate";
import Swal from "sweetalert2";
import { clearUser } from "../redux/user/userSlice";

// Lazy-loaded components
const DistributorDashboard = lazy(() =>
  import("../pages/DistributorDashboard")
);

const TrainingVideo = lazy(() =>
  import("../components/DashBoard/TrainingVideo")
);
const DWalletTransactionReport = lazy(() =>
  import("../components/Distributor/DWalletTransactionReport")
);
const DWalletToWalletTransfer = lazy(() =>
  import("../components/Distributor/DWalletToWalletTransfer")
);
const DFundTransferStatus = lazy(() =>
  import("../components/Distributor/DFundTransferStatus")
);

const DWalletWithdrawReport = lazy(() =>
  import("../components/Distributor/DWalletWithdrawReport")
);
const DWalletWithdraw = lazy(() =>
  import("../components/Distributor/DWalletWithdraw")
);
const DAllOfflineForm = lazy(() =>
  import("../components/Distributor/DAllOfflineForm")
);
const DSambalHistory = lazy(() =>
  import("../components/Distributor/DSambalHistory")
);

const DOfflineDthConnection = lazy(() =>
  import("../components/Distributor/DOfflineDthConnection")
);
const DOfflineRechargeHistory = lazy(() =>
  import("../components/Distributor/DOfflineRechargeHistory")
);
const DMyCommission = lazy(() =>
  import("../components/Distributor/DMyCommission")
);
const DAllCommissionHistory = lazy(() =>
  import("../components/Distributor/DAllCommissionHistory")
);
const DOnlineDthConnection = lazy(() =>
  import("../components/Distributor/DOnlineDthConnection")
);
const DOnlineRecharges = lazy(() =>
  import("../components/Distributor/DOnlineRecharges")
);
const DEdistrict = lazy(() => import("../components/Distributor/DEdistrict"));
const DVerifyDistrictHistory = lazy(() =>
  import("../components/Distributor/DVerifyDistrictHistory")
);

const DCoupanCommissionHistory = lazy(() =>
  import("../components/Distributor/DCoupanCommissionHistory")
);
const DCreateDistributor = lazy(() =>
  import("../components/Distributor/DCreateDistributor")
);
const DAllDistributorList = lazy(() =>
  import("../components/Distributor/DAllDistributorList")
);
const DBuyDistributorId = lazy(() =>
  import("../components/Distributor/DBuyDistributorId")
);
const DBoughtSummery = lazy(() =>
  import("../components/Distributor/DBoughtSummery")
);
const DActiveUsersList = lazy(() =>
  import("../components/Distributor/DActiveUsersList")
);
const DDeactiveUsersList = lazy(() =>
  import("../components/Distributor/DDeactiveUsersList")
);
const DAllUsersJoinedList = lazy(() =>
  import("../components/Distributor/DAllUsersJoinedList")
);
const DPendingKycUsers = lazy(() =>
  import("../components/Distributor/DPendingKycUsers")
);
const DPendingPaymentUsers = lazy(() =>
  import("../components/Distributor/DPendingPaymentUsers")
);
const DComplaints = lazy(() => import("../components/Distributor/DComplaints"));

const DAllComplaintsList = lazy(() =>
  import("../components/Distributor/DAllComplaintsList")
);
const DDownloadCertificate = lazy(() =>
  import("../components/Distributor/DDownloadCertificate")
);
const DChangePassword = lazy(() =>
  import("../components/Distributor/DChangePassword")
);

const DBankAccountSetup = lazy(() =>
  import("../components/Distributor/DBankAccountSetup")
);
const DBankAccountVerify = lazy(() =>
  import("../components/Distributor/DBankAccountVerify")
);
const DPanFourHistory = lazy(() =>
  import("../components/Distributor/DPanFourHistory")
);

const DPanTransactionReport = lazy(() =>
  import("../components/Distributor/DPanTransactionReport")
);
const DPanCorrectionHistory = lazy(() =>
  import("../components/Distributor/DPanCorrectionHistory")
);
const DCreatePin = lazy(() => import("../components/Distributor/DCreatePin"));

// const DtProfile = lazy(() => import("../components/Distributor/DtProfile"));
const Profile = lazy(() => import("../pages/Profile"));

const Distributor = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;
  const userId = currentUser?.userId;

  const pathname = window.location.pathname;
  const fullUrl = window.location.href;
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
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
  }, [currentUser, token, fullUrl]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/superDistributor/getUserDetails/${currentUser?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Details:", response.data?.data);
      const userStatus = response.data?.data?.Status; // API response se status fetch kar rahe hain
      const PaymentStatus = response.data?.data?.payment_status;
      setUser(response.data?.data);
      if (userStatus == "Deactive") {
        Swal.fire({
          icon: "error",
          title: "User Deactive",
          text: "Please contact Admin!",
        });
        dispatch(clearUser());
        navigate("/");
      } else if (PaymentStatus == "Pending") {
        Swal.fire({
          icon: "error",
          title: "User Payment is Pending",
          text: "Please Make Payment First Or Contact Admin if Payment Done",
        });
        // dispatch(clearUser());

        navigate("/payment");
      } else if (userStatus == "Pending") {
        Swal.fire({
          icon: "error",
          title: "User KYC is Pending",
          text: "Please Update KYC details First Or Contact Admin if Already Submitted Kyc details",
        });
        // dispatch(clearUser());
        navigate("/update-profile");
      }

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

  return (
    <>
      <Suspense
        fallback={
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
      ></Suspense>
      <Routes>
        <Route path="/dashboard" element={<DistributorDashboard />} />
        <Route path="/" element={<DistributorDashboard />} />
        <Route path="/update-profile" element={<Profile />} />
        {/* <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        /> */}
        <Route path="/training-video" element={<TrainingVideo />} />
        <Route
          path="/wallet-transaction-report"
          element={<DWalletTransactionReport />}
        />
        <Route
          path="/wallet-to-wallet-transfer"
          element={<DWalletToWalletTransfer />}
        />

        <Route
          path="/Wallet-TO-Wallet-Transfer-History"
          element={<DFundTransferStatus />}
        />
        <Route
          path="/wallet-withdraw-History"
          element={<DWalletWithdrawReport />}
        />

        <Route path="/wallet-withdraw" element={<DWalletWithdraw />} />
        <Route path="/view-all-offline-history" element={<DAllOfflineForm />} />
        <Route path="/Sambal-History" element={<DSambalHistory />} />
        <Route
          path="/Offline-dth-connection"
          element={<DOfflineDthConnection />}
        />

        <Route
          path="/Offline-Recharge-history"
          element={<DOfflineRechargeHistory />}
        />
        <Route path="/my-commission" element={<DMyCommission />} />
        <Route
          path="/View-All-Commission-History"
          element={<DAllCommissionHistory />}
        />

        <Route
          path="/online-dth-connection-history"
          element={<DOnlineDthConnection />}
        />

        <Route path="/online-recharge-history" element={<DOnlineRecharges />} />
        <Route path="/E-District-history" element={<DEdistrict />} />

        <Route
          path="/verify-Edistrict-History"
          element={<DVerifyDistrictHistory />}
        />

        <Route
          path="/Pan-Coupan-History"
          element={<DCoupanCommissionHistory />}
        />
        <Route path="/create-retailer" element={<DCreateDistributor />} />

        <Route path="/All-Retailer-List" element={<DAllDistributorList />} />

        <Route path="/buy-retailer-id" element={<DBuyDistributorId />} />

        <Route path="/UserId-Bought-summary" element={<DBoughtSummery />} />

        <Route path="/active-users" element={<DActiveUsersList />} />

        <Route path="/deactive-users" element={<DDeactiveUsersList />} />

        <Route path="/users-joining-list" element={<DAllUsersJoinedList />} />

        <Route path="/pending-kyc-user" element={<DPendingKycUsers />} />

        <Route
          path="/pending-payment-users"
          element={<DPendingPaymentUsers />}
        />

        <Route path="/raise-complaint" element={<DComplaints />} />

        <Route path="/complaint-raised-list" element={<DAllComplaintsList />} />
        <Route
          path="/download-certificate"
          element={<DDownloadCertificate />}
        />
        <Route path="/change-password" element={<DChangePassword />} />

        <Route path="/bank-account-setup" element={<DBankAccountSetup />} />

        <Route
          path="/bank-account-setup/verify/:bid"
          element={<DBankAccountVerify />}
        />
        <Route path="/pan-4.0-history" element={<DPanFourHistory />} />

        <Route
          path="/pan-transaction-report"
          element={<DPanTransactionReport />}
        />

        <Route
          path="/pan-correction-report"
          element={<DPanCorrectionHistory />}
        />
        <Route path="/generate-pin" element={<DCreatePin />} />

        <Route path="/2-step-verification" element={<DStepVerification />} />

        <Route
          path="/uti-transaction-report"
          element={<DUTIPanTransactionReport />}
        />
        <Route path="/distribute-uti-coupon" element={<DDistributeCoupon />} />
        <Route path="/uti-coupon-history" element={<DUTICouponHistory />} />

        <Route path="/change-price" element={<DChangePrice />} />
        

        <Route
          path="/download-certificate-print"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <Certificate
              user="DISTRIBUTOR"
              name={currentUser?.username}
              address={`${currentUser?.City}, ${currentUser?.State}, ${currentUser?.PinCode}`}
              date={currentUser?.CreateAt}
              // date={new Date(currentUser?.CreateAt).toISOString().split("T")[0]}
              id={currentUser?.userId}
            />
            // )
          }
        />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Distributor;
