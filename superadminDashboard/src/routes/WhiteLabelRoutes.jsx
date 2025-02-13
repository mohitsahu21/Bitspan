import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

// Lazy-loaded components

const AadharLinkingStatus = lazy(() =>
  import("../components/DashBoard/AadharLinkingStatus")
);

const TrainingVideo = lazy(() =>
  import("../components/DashBoard/TrainingVideo")
);

const WhiteLabelDashboard = lazy(() => import("../pages/WhiteLabelDashboard"));

import WLProfile from "../components/WhiteLabel/WLProfile";

const WLWalletTransactionReport = lazy(() =>
  import("../components/WhiteLabel/WLWalletTransactionReport")
);

const WLAllOfflineForm = lazy(() =>
  import("../components/WhiteLabel/WLAllOfflineForm")
);
const WLStepVerification = lazy(() =>
  import("../components/WhiteLabel/WLStepVerification")
);

const WLUTIPanTransactionReport = lazy(() =>
  import("../components/WhiteLabel/WLUTIPanTransactionReport")
);

const WLDistributeCoupon = lazy(() =>
  import("../components/WhiteLabel/WLDistributeCoupon")
);

const WLUTICouponHistory = lazy(() =>
  import("../components/WhiteLabel/WLUTICouponHistory")
);

const WLPanTransactionReport = lazy(() =>
  import("../components/WhiteLabel/WLPanTransactionReport")
);

const WLActiveUsersList = lazy(() =>
  import("../components/WhiteLabel/WLActiveUsersList")
);

const WLDeactiveUsersList = lazy(() =>
  import("../components/WhiteLabel/WLDeactiveUsersList")
);

const WLAllUsersJoinedList = lazy(() =>
  import("../components/WhiteLabel/WLAllUsersJoinedList")
);

const WLChangePrice = lazy(() =>
  import("../components/WhiteLabel/WLChangePrice")
);

const WLComplaints = lazy(() =>
  import("../components/WhiteLabel/WLComplaints")
);

const WLAllComplaintsList = lazy(() =>
  import("../components/WhiteLabel/WLAllComplaintsList")
);

const WLDownloadCertificate = lazy(() =>
  import("../components/WhiteLabel/WLDownloadCertificate")
);

const WLChangePassword = lazy(() =>
  import("../components/WhiteLabel/WLChangePassword")
);

const WLBankAccountSetup = lazy(() =>
  import("../components/WhiteLabel/WLBankAccountSetup")
);

const WLBankAccountVerify = lazy(() =>
  import("../components/WhiteLabel/WLBankAccountVerify")
);

const WLWalletWithdraw = lazy(() =>
  import("../components/WhiteLabel/WLWalletWithdraw")
);

const WLFundTransferStatus = lazy(() =>
  import("../components/WhiteLabel/WLFundTransferStatus")
);

const Certificate = lazy(() =>
  import("../components/SuperDistributer/Certificate")
);

const WebsiteSetting = lazy(() =>
  import("../components/WhiteLabel/WebsiteSetting")
);

const CreateWhiteLabel = lazy(() =>
  import("../components/WhiteLabel/CreateWhiteLabel")
);

const BuyUserId = lazy(() => import("../components/WhiteLabel/BuyUserId"));

const CreateSuperDistributor = lazy(() =>
  import("../components/WhiteLabel/CreateSuperDistributor")
);

const WLPendingPaymentUsers = lazy(() =>
  import("../components/WhiteLabel/WLPendingPaymentUsers")
);

const WhiteLabelJoiningList = lazy(() =>
  import("../components/WhiteLabel/WhiteLabelJoiningList")
);

const BuyUserIdSummary = lazy(() =>
  import("../components/WhiteLabel/BuyUserIdSummary")
);

const ChangeIdSetRate = lazy(() =>
  import("../components/WhiteLabel/ChangeIdSetRate")
);

const ChangeUTINewCouponPrice = lazy(() =>
  import("../components/WhiteLabel/ChangeUTINewCouponPrice")
);

const ChangeNSDLPrice = lazy(() =>
  import("../components/WhiteLabel/ChangeNSDLPrice")
);

const ChangeUTIPanPrice = lazy(() =>
  import("../components/WhiteLabel/ChangeUTIPanPrice")
);

const WLWalletToWalletTransfer = lazy(() =>
  import("../components/WhiteLabel/WLWalletToWalletTransfer")
);

const WLWalletWithdrawReport = lazy(() =>
  import("../components/WhiteLabel/WLWalletWithdrawReport")
);

const WLSambalHistory = lazy(() =>
  import("../components/WhiteLabel/WLSambalHistory")
);

const WLOfflineDthConnection = lazy(() =>
  import("../components/WhiteLabel/WLOfflineDthConnection")
);

const WLOfflineRechargeHistory = lazy(() =>
  import("../components/WhiteLabel/WLOfflineRechargeHistory")
);

const WLMyCommission = lazy(() =>
  import("../components/WhiteLabel/WLMyCommission")
);

const WLAllCommissionHistory = lazy(() =>
  import("../components/WhiteLabel/WLAllCommissionHistory")
);

const WLOnlineDthConnection = lazy(() =>
  import("../components/WhiteLabel/WLOnlineDthConnection")
);

const WLOnlineRecharges = lazy(() =>
  import("../components/WhiteLabel/WLOnlineRecharges")
);

const WLEdistrict = lazy(() => import("../components/WhiteLabel/WLEdistrict"));

const WLVerifyDistrictHistory = lazy(() =>
  import("../components/WhiteLabel/WLVerifyDistrictHistory")
);

const WLCoupanCommissionHistory = lazy(() =>
  import("../components/WhiteLabel/WLCoupanCommissionHistory")
);

const WLPanFourHistory = lazy(() =>
  import("../components/WhiteLabel/WLPanFourHistory")
);

const WLPanCorrectionHistory = lazy(() =>
  import("../components/WhiteLabel/WLPanCorrectionHistory")
);

const WLPendingKycUsers = lazy(() =>
  import("../components/WhiteLabel/WLPendingKycUsers")
);

const WLCreatePin = lazy(() => import("../components/WhiteLabel/WLCreatePin"));

const WLTransferId = lazy(() =>
  import("../components/WhiteLabel/WLTransferId")
);

const WLShareIDsSummary = lazy(() =>
  import("../components/WhiteLabel/WLShareIDsSummary")
);

const WLCreateDistributor = lazy(() =>
  import("../components/WhiteLabel/WLCreateDistributor")
);

const WLCreateRetailer = lazy(() =>
  import("../components/WhiteLabel/WLCreateRetailer")
);

const WLCreatedUsers = lazy(() =>
  import("../components/WhiteLabel/WLCreatedUsers")
);

const WLBoughtSummery = lazy(() =>
  import("../components/WhiteLabel/WLBoughtSummery")
);

const WhiteLabelRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;
  const userId = currentUser?.userId;

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/dashboard"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WhiteLabelDashboard />
            )
          }
        />
        <Route path="/update-profile" element={<WLProfile />} />

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
          path="/wallet-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLWalletTransactionReport />
            )
          }
        />

        <Route
          path="/wallet-to-wallet-transfer"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLWalletToWalletTransfer />
            )
          }
        />

        <Route
          path="/Wallet-TO-Wallet-Transfer-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLFundTransferStatus />
            )
          }
        />

        <Route
          path="/view-all-offline-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLAllOfflineForm />
            )
          }
        />

        <Route
          path="/Offline-dth-connection"
          element={<WLOfflineDthConnection />}
        />

        <Route
          path="/Offline-Recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLOfflineRechargeHistory />
            )
          }
        />

        <Route
          path="/Sambal-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLSambalHistory />
            )
          }
        />

        <Route
          path="/2-step-verification"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLStepVerification />
            )
          }
        />
        <Route
          path="/website-setting"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WebsiteSetting />
            )
          }
        />

        <Route
          path="/my-commission"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLMyCommission />
            )
          }
        />

        <Route
          path="/View-All-Commission-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLAllCommissionHistory />
            )
          }
        />

        <Route
          path="/online-dth-connection-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLOnlineDthConnection />
            )
          }
        />

        <Route
          path="/online-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLOnlineRecharges />
            )
          }
        />

        <Route
          path="/E-District-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLEdistrict />
            )
          }
        />

        <Route
          path="/verify-Edistrict-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLVerifyDistrictHistory />
            )
          }
        />

        <Route
          path="/Pan-Coupan-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLCoupanCommissionHistory />
            )
          }
        />

        <Route
          path="/pan-4.0-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLPanFourHistory />
            )
          }
        />

        <Route
          path="/create-super-distributor"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <CreateSuperDistributor />
            )
          }
        />
        <Route
          path="/create-white-label"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <CreateWhiteLabel />
            )
          }
        />
        <Route
          path="/Transfer-IDs"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLTransferId />
            )
          }
        />
        <Route
          path="/Transfer-IDs-Summary"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLShareIDsSummary />
            )
          }
        />
        <Route
          path="/create-retailer"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLCreateRetailer />
            )
          }
        />
        <Route
          path="/create-distributor"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLCreateDistributor />
            )
          }
        />
        <Route
          path="/Created-Users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLCreatedUsers />
            )
          }
        />
        <Route
          path="/buy-id"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <BuyUserId />
            )
          }
        />
        <Route
          path="/UserId-Bought-summary"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLBoughtSummery />
            )
          }
        />

        <Route
          path="/uti-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLUTIPanTransactionReport />
            )
          }
        />

        <Route
          path="/distribute-uti-coupon"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLDistributeCoupon />
            )
          }
        />

        <Route
          path="/uti-coupon-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLUTICouponHistory />
            )
          }
        />

        <Route
          path="/active-users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLActiveUsersList />
            )
          }
        />
        <Route
          path="/deactive-users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLDeactiveUsersList />
            )
          }
        />
        <Route
          path="/users-joining-list"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLAllUsersJoinedList />
            )
          }
        />
        <Route
          path="/pending-payment-users"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLPendingPaymentUsers />
            )
          }
        />
        <Route
          path="/white-label-joining-list"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WhiteLabelJoiningList />
            )
          }
        />

        <Route
          path="/pending-kyc-user"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLPendingKycUsers />
            )
          }
        />

        <Route
          path="/buy-user-id-summary"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <BuyUserIdSummary />
            )
          }
        />
        <Route
          path="/pan-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLPanTransactionReport />
            )
          }
        />

        <Route
          path="/pan-correction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLPanCorrectionHistory />
            )
          }
        />

        <Route
          path="/change-price"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLChangePrice />
            )
          }
        />
        <Route
          path="/raise-complaint"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLComplaints />
            )
          }
        />
        <Route
          path="/complaint-raised-list"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLAllComplaintsList />
            )
          }
        />
        <Route
          path="/download-certificate"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLDownloadCertificate />
            )
          }
        />
        <Route
          path="/change-coupon-price"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ChangeIdSetRate />
            )
          }
        />
        <Route
          path="/change-nsdl-price"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ChangeNSDLPrice />
            )
          }
        />
        <Route
          path="/change-uti-price"
          eelement={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ChangeUTIPanPrice />
            )
          }
        />
        <Route
          path="/change-uti-new-price"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ChangeUTINewCouponPrice />
            )
          }
        />
        <Route
          path="/change-password"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLChangePassword />
            )
          }
        />
        <Route
          path="/bank-account-setup"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLBankAccountSetup />
            )
          }
        />
        <Route
          path="/bank-account-setup/:bank_id/:bid"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLBankAccountVerify />
            )
          }
        />
        <Route
          path="/wallet-withdraw"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLWalletWithdraw />
            )
          }
        />

        <Route
          path="/wallet-withdraw-History"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLWalletWithdrawReport />
            )
          }
        />

        <Route
          path="/fund-transfer-status"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLFundTransferStatus />
            )
          }
        />

        <Route
          path="/generate-pin"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WLCreatePin />
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
                user="WHITE LABEL"
                // name={currentUser?.username}
                name={currentUser?.username?.toUpperCase()}
                address={`${currentUser?.City}, ${currentUser?.State}, ${currentUser?.PinCode}`}
                date="02-Jul-2024"
                id={currentUser?.userId}
              />
            )
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default WhiteLabelRoutes;
