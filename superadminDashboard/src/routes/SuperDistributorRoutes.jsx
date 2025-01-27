import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

// Lazy-loaded components
const SuperDistributerDashboard = lazy(() =>
  import("../pages/SuperDistributerDashboard")
);
const SdWalletTransactionReport = lazy(() =>
  import("../components/SuperDistributer/SdWalletTransactionReport")
);
const SdWalletWithdrawReport = lazy(() =>
  import("../components/SuperDistributer/SdWalletWithdrawReport")
);
const SdStepVerification = lazy(() =>
  import("../components/SuperDistributer/SdStepVerification")
);
const CreateDistributor = lazy(() =>
  import("../components/SuperDistributer/CreateDistributor")
);
const AllDistributorList = lazy(() =>
  import("../components/SuperDistributer/AllDistributorList")
);
const SdBuyDistributorId = lazy(() =>
  import("../components/SuperDistributer/SdBuyDistributorId")
);
const SdBoughtSummery = lazy(() =>
  import("../components/SuperDistributer/SdBoughtSummery")
);
const SdUTIPanTransactionReport = lazy(() =>
  import("../components/SuperDistributer/SdUTIPanTransactionReport")
);
const SdDistributeCoupon = lazy(() =>
  import("../components/SuperDistributer/SdDistributeCoupon")
);
const SdUTICouponHistory = lazy(() =>
  import("../components/SuperDistributer/SdUTICouponHistory")
);
const SdPanTransactionReport = lazy(() =>
  import("../components/SuperDistributer/SdPanTransactionReport")
);
const AadharLinkingStatus = lazy(() =>
  import("../components/DashBoard/AadharLinkingStatus")
);
const TrainingVideo = lazy(() =>
  import("../components/DashBoard/TrainingVideo")
);
const SdAllOfflineForm = lazy(() =>
  import("../components/SuperDistributer/SdAllOfflineForm")
);
const SdAllCommissionHistory = lazy(() =>
  import("../components/SuperDistributer/SdAllCommissionHistory")
);
const SdCoupanCommissionHistory = lazy(() =>
  import("../components/SuperDistributer/SdCoupanCommissionHistory")
);
const SdSambalHistory = lazy(() =>
  import("../components/SuperDistributer/SdSambalHistory")
);
const SdProfile = lazy(() =>
  import("../components/SuperDistributer/SdProfile")
);
const SdActiveUsersList = lazy(() =>
  import("../components/SuperDistributer/SdActiveUsersList")
);
const SdDeactiveUsersList = lazy(() =>
  import("../components/SuperDistributer/SdDeactiveUsersList")
);
const SdPendingKycUsers = lazy(() =>
  import("../components/SuperDistributer/SdPendingKycUsers")
);
const SdPendingPaymentUsers = lazy(() =>
  import("../components/SuperDistributer/SdPendingPaymentUsers")
);
const SdAllUsersJoinedList = lazy(() =>
  import("../components/SuperDistributer/SdAllUsersJoinedList")
);
const SdPrepaidRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdPrepaidRechargeHistory")
);
const SdPostpaidRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdPostpaidRechargeHistory")
);

const SdDTHRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdDTHRechargeHistory")
);
const SdElectricityHistory = lazy(() =>
  import("../components/SuperDistributer/SdElectricityHistory")
);

const SdBroadbandHistory = lazy(() =>
  import("../components/SuperDistributer/SdBroadbandHistory ")
);
const SdRechargeRefundReport = lazy(() =>
  import("../components/SuperDistributer/SdRechargeRefundReport")
);
const SdMyCommission = lazy(() =>
  import("../components/SuperDistributer/SdMyCommission")
);
const SdEdistrict = lazy(() =>
  import("../components/SuperDistributer/SdEdistrict")
);
const SdVerifyDistrictHistory = lazy(() =>
  import("../components/SuperDistributer/SdVerifyDistrictHistory")
);
const SdPanFourHistory = lazy(() =>
  import("../components/SuperDistributer/SdPanFourHistory")
);

const SdPanCorrectionHistory = lazy(() =>
  import("../components/SuperDistributer/SdPanCorrectionHistory")
);
const SdOfflineRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdOfflineRechargeHistory")
);

const SdOfflineDthConnection = lazy(() =>
  import("../components/SuperDistributer/SdOfflineDthConnection")
);
const SdOnlineDthConnection = lazy(() =>
  import("../components/SuperDistributer/SdOnlineDthConnection")
);

const SdOnlineRecharges = lazy(() =>
  import("../components/SuperDistributer/SdOnlineRecharges")
);
const SdComplaints = lazy(() =>
  import("../components/SuperDistributer/SdComplaints")
);
const SdAllComplaintsList = lazy(() =>
  import("../components/SuperDistributer/SdAllComplaintsList")
);
const SdDownloadCertificate = lazy(() =>
  import("../components/SuperDistributer/SdDownloadCertificate")
);
const SdChangePassword = lazy(() =>
  import("../components/SuperDistributer/SdChangePassword")
);
const SdChangePrice = lazy(() =>
  import("../components/SuperDistributer/SdChangePrice")
);
const SdBankAccountSetup = lazy(() =>
  import("../components/SuperDistributer/SdBankAccountSetup")
);
const SdFundTransferStatus = lazy(() =>
  import("../components/SuperDistributer/SdFundTransferStatus")
);
const SdCreatePin = lazy(() =>
  import("../components/SuperDistributer/SdCreatePin")
);
const Certificate = lazy(() =>
  import("../components/SuperDistributer/Certificate")
);
const SdBankAccountVerify = lazy(() =>
  import("../components/SuperDistributer/SdBankAccountVerify")
);
const SdWalletWithdraw = lazy(() =>
  import("../components/SuperDistributer/SdWalletWithdraw")
);

const SdWalletToWalletTransfer = lazy(() =>
  import("../components/SuperDistributer/SdWalletToWalletTransfer")
);
const Profile = lazy(() => import("../pages/Profile"));

const SuperDistributorRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;
  const userId = currentUser?.userId;

  return (
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
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SuperDistributerDashboard />
            )
          }
        />
        <Route path="/update-profile" element={<Profile />} />
        <Route
          path="/aadhar-linking-status"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AadharLinkingStatus />
            )
          }
        />
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
          path="/prepaid-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPrepaidRechargeHistory />
            )
          }
        />
        <Route
          path="/postpaid-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPostpaidRechargeHistory />
            )
          }
        />

        <Route
          path="/dth-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdDTHRechargeHistory />
            )
          }
        />

        <Route
          path="/eletricity-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdElectricityHistory />
            )
          }
        />
        <Route
          path="/broadband-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdBroadbandHistory />
            )
          }
        />

        <Route
          path="/recharge-refund-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdRechargeRefundReport />
            )
          }
        />
        <Route
          path="/my-commission"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdMyCommission />
            )
          }
        />

        <Route
          path="/E-District-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdEdistrict />
            )
          }
        />

        <Route
          path="/verify-Edistrict-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdVerifyDistrictHistory />
            )
          }
        />

        <Route
          path="/pan-4.0-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPanFourHistory />
            )
          }
        />

        <Route
          path="/pan-correction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPanCorrectionHistory />
            )
          }
        />

        <Route
          path="/Offline-Recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdOfflineRechargeHistory />
            )
          }
        />
        <Route
          path="/wallet-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdWalletTransactionReport />
            )
          }
        />
        <Route
          path="/wallet-withdraw-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdWalletWithdrawReport />
            )
          }
        />
        <Route
          path="/view-all-offline-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdAllOfflineForm />
            )
          }
        />
        <Route
          path="/View-All-Commission-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdAllCommissionHistory />
            )
          }
        />

        <Route
          path="/Pan-Coupan-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdCoupanCommissionHistory />
            )
          }
        />

        <Route
          path="/Sambal-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdSambalHistory />
            )
          }
        />
        <Route
          path="/2-step-verification"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdStepVerification />
            )
          }
        />
        <Route
          path="/create-distributor"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <CreateDistributor />
            )
          }
        />

        <Route
          path="/All-Distributor-List"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AllDistributorList />
            )
          }
        />
        <Route
          path="/buy-distributor-id"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdBuyDistributorId />
            )
          }
        />
        <Route
          path="/UserId-Bought-summary"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdBoughtSummery />
            )
          }
        />
        <Route
          path="/uti-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdUTIPanTransactionReport />
            )
          }
        />

        <Route
          path="/Offline-dth-connection"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdOfflineDthConnection />
            )
          }
        />

        <Route
          path="/online-dth-connection-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdOnlineDthConnection />
            )
          }
        />
        <Route
          path="/online-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdOnlineRecharges />
            )
          }
        />
        <Route
          path="/distribute-uti-coupon"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdDistributeCoupon />
            )
          }
        />
        <Route
          path="/uti-coupon-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdUTICouponHistory />
            )
          }
        />
        <Route
          path="/pan-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPanTransactionReport />
            )
          }
        />
        <Route
          path="/active-users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdActiveUsersList />
            )
          }
        />
        <Route
          path="/deactive-users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdDeactiveUsersList />
            )
          }
        />
        <Route
          path="/pending-kyc-user"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPendingKycUsers />
            )
          }
        />
        <Route
          path="/pending-payment-users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdPendingPaymentUsers />
            )
          }
        />
        <Route
          path="/users-joining-list"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdAllUsersJoinedList />
            )
          }
        />
        <Route
          path="/change-price"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdChangePrice />
            )
          }
        />
        <Route
          path="/raise-complaint"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdComplaints />
            )
          }
        />
        <Route
          path="/complaint-raised-list"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdAllComplaintsList />
            )
          }
        />
        <Route
          path="/download-certificate"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdDownloadCertificate />
            )
          }
        />
        <Route
          path="/change-password"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdChangePassword />
            )
          }
        />
        <Route
          path="/bank-account-setup"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdBankAccountSetup />
            )
          }
        />
        <Route
          path="/bank-account-setup/verify/:bid"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdBankAccountVerify />
            )
          }
        />
        <Route
          path="/wallet-withdraw"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdWalletWithdraw />
            )
          }
        />

        <Route
          path="/wallet-to-wallet-transfer"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdWalletToWalletTransfer />
            )
          }
        />
        <Route
          // path="/fund-transfer-status"
          // path="/fund-transfer-status"
          path="/Wallet-TO-Wallet-Transfer-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdFundTransferStatus />
            )
          }
        />
        <Route
          path="/generate-pin"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <SdCreatePin />
            )
          }
        />
        <Route
          path="/download-certificate-print"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Certificate
                user="SUPER DISTRIBUTOR"
                name={currentUser?.username}
                address={`${currentUser?.City}, ${currentUser?.State}, ${currentUser?.PinCode}`}
                date="02-Jul-2024"
                id={currentUser?.userId}
              />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default SuperDistributorRoutes;
