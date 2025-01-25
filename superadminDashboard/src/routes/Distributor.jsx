import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

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

import DStepVerification from "../components/Distributor/DStepVerification";
import CreateRetailer from "../components/Distributor/CreateRetailer";
import DUTIPanTransactionReport from "../components/Distributor/DUTIPanTransactionReport";
import DDistributeCoupon from "../components/Distributor/DDistributeCoupon";

import DUTICouponHistory from "../components/Distributor/DUTICouponHistory";
import DChangePrice from "../components/Distributor/DChangePrice";

import Certificate from "../components/Distributor/Certificate";

const DtProfile = lazy(() => import("../components/Distributor/DtProfile"));

const Distributor = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;
  const userId = currentUser?.userId;
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
        <Route
          path="/dashboard"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DistributorDashboard />
            // )
          }
        />
        <Route path="/update-profile" element={<DtProfile />} />
        {/* <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        /> */}
        <Route
          path="/training-video"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <TrainingVideo />
            )
          }
        />
        <Route
          path="/wallet-transaction-report"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DWalletTransactionReport />
            // )
          }
        />
        <Route
          path="/wallet-to-wallet-transfer"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DWalletToWalletTransfer />
            // )
          }
        />

        <Route
          path="/Wallet-TO-Wallet-Transfer-History"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DFundTransferStatus />
            // )
          }
        />
        <Route
          path="/wallet-withdraw-History"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DWalletWithdrawReport />
            // )
          }
        />

        <Route
          path="/wallet-withdraw"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DWalletWithdraw />
            // )
          }
        />
        <Route
          path="/view-all-offline-history"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DAllOfflineForm />
            // )
          }
        />
        <Route
          path="/Sambal-History"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DSambalHistory />
            // )
          }
        />
        <Route
          path="/Offline-dth-connection"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DOfflineDthConnection />
            // )
          }
        />

        <Route
          path="/Offline-Recharge-history"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DOfflineRechargeHistory />
            // )
          }
        />
        <Route
          path="/my-commission"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DMyCommission />
            // )
          }
        />
        <Route
          path="/View-All-Commission-History"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DAllCommissionHistory />
            // )
          }
        />

        <Route
          path="/online-dth-connection-history"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DOnlineDthConnection />
            // )
          }
        />

        <Route
          path="/online-recharge-history"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DOnlineRecharges />
            // )
          }
        />
        <Route
          path="/E-District-history"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DEdistrict />
            // )
          }
        />

        <Route
          path="/verify-Edistrict-History"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DVerifyDistrictHistory />
            // )
          }
        />

        <Route
          path="/Pan-Coupan-History"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DCoupanCommissionHistory />
            // )
          }
        />
        <Route
          path="/create-retailer"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DCreateDistributor />
            // )
          }
        />

        <Route
          path="/All-Retailer-List"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DAllDistributorList />
            // )
          }
        />

        <Route
          path="/buy-retailer-id"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DBuyDistributorId />
            // )
          }
        />

        <Route
          path="/UserId-Bought-summary"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DBoughtSummery />
            // )
          }
        />

        <Route
          path="/active-users"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DActiveUsersList />
            // )
          }
        />

        <Route
          path="/deactive-users"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DDeactiveUsersList />
            // )
          }
        />

        <Route
          path="/users-joining-list"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DAllUsersJoinedList />
            // )
          }
        />

        <Route
          path="/pending-kyc-user"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DPendingKycUsers />
            // )
          }
        />

        <Route
          path="/pending-payment-users"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DPendingPaymentUsers />
            // )
          }
        />

        <Route
          path="/raise-complaint"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DComplaints />
            // )
          }
        />

        <Route
          path="/complaint-raised-list"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DAllComplaintsList />
            // )
          }
        />
        <Route
          path="/download-certificate"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DDownloadCertificate />
            // )
          }
        />
        <Route
          path="/change-password"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DChangePassword />
            // )
          }
        />

        <Route
          path="/bank-account-setup"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DBankAccountSetup />
            // )
          }
        />

        <Route
          path="/bank-account-setup/verify/:bid"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DBankAccountVerify />
          }
        />
        <Route
          path="/pan-4.0-history"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DPanFourHistory />
            // )
          }
        />

        <Route
          path="/pan-transaction-report"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DPanTransactionReport />
            // )
          }
        />

        <Route
          path="/pan-correction-report"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DPanCorrectionHistory />
            // )
          }
        />
        <Route
          path="/generate-pin"
          element={
            // userStatus === "Pending" || userStatus === "Deactive" ? (
            //   <Navigate to="/update-profile" />
            // ) : (
            <DCreatePin />
            // )
          }
        />

        <Route path="/2-step-verification" element={<DStepVerification />} />

        <Route path="/create-retailer" element={<CreateRetailer />} />
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
              date="02-Jul-2024"
              id={currentUser?.userId}
            />
            // )
          }
        />
      </Routes>
    </>
  );
};

export default Distributor;
