import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import NotFound from "../components/NotFound.jsx";
// Lazy imports
const SuperAdminDashboard = lazy(() => import("../pages/SuperAdminDashboard"));
const SAProfile = lazy(() => import("../components/SuperAdmin/SAProfile"));
const SAWalletTransactionReport = lazy(() => import("../components/SuperAdmin/SAWalletTransactionReport"));
const SAAllOfflineForm = lazy(() => import("../components/SuperAdmin/SAAllOfflineForm"));
const SAStepVerification = lazy(() => import("../components/SuperAdmin/SAStepVerification"));
const SAWebsiteSetting = lazy(() => import("../components/SuperAdmin/SAWebsiteSetting"));
const SAUTIPanTransactionReport = lazy(() => import("../components/SuperAdmin/SAUTIPanTransactionReport"));
const SACreateWhiteLabel = lazy(() => import("../components/SuperAdmin/SACreateWhiteLabel"));
const SADistributeCoupon = lazy(() => import("../components/SuperAdmin/SADistributeCoupon"));
const SAUTICouponHistory = lazy(() => import("../components/SuperAdmin/SAUTICouponHistory"));
const SAActiveUsersList = lazy(() => import("../components/SuperAdmin/SAActiveUsersList"));
const SADeactiveUsersList = lazy(() => import("../components/SuperAdmin/SADeactiveUsersList"));
const SAAllUsersJoinedList = lazy(() => import("../components/SuperAdmin/SAAllUsersJoinedList"));
const SAPendingPaymentUsers = lazy(() => import("../components/SuperAdmin/SAPendingPaymentUsers"));
const SAWhiteLabelJoiningList = lazy(() => import("../components/SuperAdmin/SAWhiteLabelJoiningList"));
const SABuyUserIdSummary = lazy(() => import("../components/SuperAdmin/SABuyUserIdSummary"));
const SAPanTransactionReport = lazy(() => import("../components/SuperAdmin/SAPanTransactionReport"));
const SAChangePrice = lazy(() => import("../components/SuperAdmin/SAChangePrice"));
const SAAllComplaintsList = lazy(() => import("../components/SuperAdmin/SAAllComplaintsList"));
const SAChangeIdSetRate = lazy(() => import("../components/SuperAdmin/SAChangeIdSetRate"));
const SAChangeNSDLPrice = lazy(() => import("../components/SuperAdmin/SAChangeNSDLPrice"));
const SAChangeUTIPanPrice = lazy(() => import("../components/SuperAdmin/SAChangeUTIPanPrice"));
const SAChangeUTINewCouponPrice = lazy(() => import("../components/SuperAdmin/SAChangeUTINewCouponPrice"));
const SAChangePassword = lazy(() => import("../components/SuperAdmin/SAChangePassword"));
const SABankAccountSetup = lazy(() => import("../components/SuperAdmin/SABankAccountSetup"));
const SABankAccountVerify = lazy(() => import("../components/SuperAdmin/SABankAccountVerify"));
const SAWalletWithdraw = lazy(() => import("../components/SuperAdmin/SAWalletWithdraw"));
const SAFundTransferStatus = lazy(() => import("../components/SuperAdmin/SAFundTransferStatus"));
const SAWalletWithdrawRequests = lazy(() => import("../components/SuperAdmin/SAWalletWithdrawRequests"));
const SACommisionSummary = lazy(() => import("../components/SuperAdmin/SACommisionSummary.jsx"));
const SACreateSuperDistributor = lazy(() => import("../components/SuperAdmin/SACreateSuperDistributor.jsx"));
const SACreateDistributor = lazy(() => import("../components/SuperAdmin/SACreateDistributor.jsx"));
const SACreateRetailer = lazy(() => import("../components/SuperAdmin/SACreateRetailer.jsx"));
const SACreatePackages = lazy(() => import("../components/SuperAdmin/SACreatePackages.jsx"));
const SAViewPackages = lazy(() => import("../components/SuperAdmin/SAViewPackages.jsx"));
const SATodayAllTransaction = lazy(() => import("../components/SuperAdmin/SATodayAllTransaction.jsx"));
const SAAllTransaction = lazy(() => import("../components/SuperAdmin/SAAllTransaction.jsx"));
const SAChangeUserNotification = lazy(() => import("../components/SuperAdmin/SAChangeUserNotification.jsx"));
const SAWalletWithdrawSummary = lazy(() => import("../components/SuperAdmin/SAWalletWithdrawSummary.jsx"));
const SASetWhiteLabelIdPrice = lazy(() => import("../components/SuperAdmin/SASetWhiteLabelIdPrice.jsx"));
const SAActiveDeactiveApi = lazy(() => import("../components/SuperAdmin/SAActiveDeactiveApi.jsx"));
const PanForm = lazy(() => import("../components/SuperAdmin/PanForm.jsx"));
const SARegisterEmployee = lazy(() => import("../components/SuperAdmin/SARegisterEmployee.jsx"));
const SAPendingKycUsers = lazy(() => import("../components/SuperAdmin/SAPendingKycUsers.jsx"));
const SAEmployeeList = lazy(() => import("../components/SuperAdmin/SAEmployeeList.jsx"));
const SAPanOfflineHistory = lazy(() => import("../components/SuperAdmin/SAPanOfflineHistory.jsx"));
const SABankIdForms = lazy(() => import("../components/SuperAdmin/SABankIdForms.jsx"));
const SAEdistrictHistory = lazy(() => import("../components/SuperAdmin/SAEdistrictHistory.jsx"));
const SAOfflineRechargeHistory = lazy(() => import("../components/SuperAdmin/SAOfflineRechargeHistory.jsx"));
const SAOfflineDthConnection = lazy(() => import("../components/SuperAdmin/SAOfflineDthConnection.jsx"));
const SAAddWalletMoneyRequests = lazy(() => import("../components/SuperAdmin/SAAddWalletMoneyRequests.jsx"));
const SAAddWalletMoneySummary = lazy(() => import("../components/SuperAdmin/SAAddWalletMoneySummary.jsx"));
const SAActiveDeactiveServices = lazy(() => import("../components/SuperAdmin/SAActiveDeactiveServices.jsx"));
const SAAddWalletMoneyDirect = lazy(() => import("../components/SuperAdmin/SAAddWalletMoneyDirect.jsx"));
const SAWithdrawWalletMoneyDirect = lazy(() => import("../components/SuperAdmin/SAWithdrawWalletMoneyDirect.jsx"));
const SAVerifyEdistrictHistory = lazy(() => import("../components/SuperAdmin/SAVerifyEdistrictHistory.jsx"));
const SASambalHistory = lazy(() => import("../components/SuperAdmin/SASambalHistory.jsx"));
const SAOnlineRecharges = lazy(() => import("../components/SuperAdmin/SAOnlineRecharges.jsx"));
const SAOnlineDthConnection = lazy(() => import("../components/SuperAdmin/SAOnlineDthConnection.jsx"));
const SAPanCouponRequests = lazy(() => import("../components/SuperAdmin/SAPanCouponRequests.jsx"));
const SAUserRelation = lazy(() => import("../components/SuperAdmin/SAUserRelation.jsx"));
const SAPanCorrectionHistory = lazy(() => import("../components/SuperAdmin/SAPanCorrectionHistory.jsx"));
const SASetDTHPlans = lazy(() => import("../components/SuperAdmin/SASetDTHPlans.jsx"));
const SAPanUploadedDocsList = lazy(()=> import("../components/SuperAdmin/SAPanUploadedDocsList.jsx"));


const SuperAdminRoutes = () => {
   const { currentUser, token } = useSelector((state) => state.user);
    // const userStatus = currentUser?.Status;
  return (
    <React.Fragment>
      <Wrapper>
      <Suspense fallback={ <div className="loading-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>}>
      <Routes>
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/update-profile" element={<SAProfile />} />
        {/* <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        /> */}
        {/* <Route path="/training-video" element={<TrainingVideo />} /> */}

        <Route
          path="/wallet-transaction-report"
          element={<SAWalletTransactionReport />}
        />
        <Route
          path="/wallet-withdraw-summary"
          element={<SAWalletWithdrawSummary />}
        />
        <Route
          path="wallet-withdraw-requests"
          element={<SAWalletWithdrawRequests />}
        />
        <Route
          path="add-wallet-money-requests"
          element={<SAAddWalletMoneyRequests />}
        />
        <Route
          path="add-wallet-money-direct"
          element={<SAAddWalletMoneyDirect />}
        />
        <Route
          path="withdraw-wallet-money-direct"
          element={<SAWithdrawWalletMoneyDirect />}
        />
        <Route
          path="add-wallet-money-summary"
          element={<SAAddWalletMoneySummary />}
        />
        <Route path="commision-full-summary" element={<SACommisionSummary />} />
        <Route path="create-package" element={<SACreatePackages />} />
        <Route path="view-packages" element={<SAViewPackages />} />

        <Route
          path="/view-all-offline-history"
          element={<SAAllOfflineForm />}
        />
        <Route path="/Pan-offline-history" element={<SAPanOfflineHistory />} />
        <Route path="/Bank-Id-history" element={<SABankIdForms />} />
        <Route path="/E-district-history" element={<SAEdistrictHistory />} />
        <Route path="/verify-E-district-form-history" element={<SAVerifyEdistrictHistory />} />
        <Route path="/sambal-form-history" element={<SASambalHistory />} />
        <Route
          path="/Offline-Recharge-history"
          element={<SAOfflineRechargeHistory />}
        />
        <Route
          path="/Offline-dth-connection"
          element={<SAOfflineDthConnection />}
        />

        <Route path="/2-step-verification" element={<SAStepVerification />} />
        <Route path="/website-setting" element={<SAWebsiteSetting />} />

        <Route
          path="/create-super-distributor"
          element={<SACreateSuperDistributor />}
        />
        <Route path="/create-white-label" element={<SACreateWhiteLabel />} />
        <Route path="/create-distributor" element={<SACreateDistributor />} />
        <Route path="/create-retailer" element={<SACreateRetailer />} />
        <Route
          path="/create-superadmin-employee"
          element={<SARegisterEmployee />}
        />
        {/* <Route path="/buy-admin-id" element={<BuyUserId />} /> */}

        <Route
          path="/uti-transaction-report"
          element={<SAUTIPanTransactionReport />}
        />

        <Route path="/distribute-uti-coupon" element={<SADistributeCoupon />} />

        <Route path="/uti-coupon-history" element={<SAUTICouponHistory />} />

        <Route path="/active-users" element={<SAActiveUsersList />} />
        <Route path="/deactive-users" element={<SADeactiveUsersList />} />
        <Route path="/pending-kyc-user" element={<SAPendingKycUsers />} />
        <Route path="/users-joining-list" element={<SAAllUsersJoinedList />} />
        <Route
          path="/pending-payment-users"
          element={<SAPendingPaymentUsers />}
        />
        <Route
          path="/white-label-joining-list"
          element={<SAWhiteLabelJoiningList />}
        />
        <Route path="/super-admin-employee-list" element={<SAEmployeeList />} />
        <Route path="/buy-user-id-summary" element={<SABuyUserIdSummary />} />
        <Route
          path="/pan-transaction-report"
          element={<SAPanTransactionReport />}
        />
        <Route
          path="/pan-correction-report"
          element={<SAPanCorrectionHistory />}
        />
        <Route path="/change-price" element={<SAChangePrice />} />
        {/* <Route path="/raise-complaint" element={<WLComplaints />} /> */}
        <Route
          path="/complaint-raised-list"
          element={<SAAllComplaintsList />}
        />
        {/* <Route path="/download-certificate" element={<WLDownloadCertificate />} /> */}
        {/* <Route path="/change-coupon-price" element={<SAChangeIdSetRate />} /> */}
        {/* <Route path="/user-id-set-rate" element={<SASetWhiteLabelIdPrice />} /> */}
        <Route path="/change-nsdl-price" element={<SAChangeNSDLPrice />} />
        <Route path="/change-uti-price" element={<SAChangeUTIPanPrice />} />
        <Route
          path="/change-uti-new-price"
          element={<SAChangeUTINewCouponPrice />}
        />
        <Route path="/change-password" element={<SAChangePassword />} />
        <Route path="/bank-account-setup" element={<SABankAccountSetup />} />
        <Route
          path="/bank-account-setup/:bank_id/:user_id"
          element={<SABankAccountVerify />}
        />
        <Route path="/wallet-withdraw" element={<SAWalletWithdraw />} />
        <Route
          path="/fund-transfer-status"
          element={<SAFundTransferStatus />}
        />
        <Route path="/active-deactive-api" element={<SAActiveDeactiveApi />} />
        <Route path="/Set-DTH-Connection-Plans" element={<SASetDTHPlans />} />
        <Route
          path="/active-deactive-services"
          element={<SAActiveDeactiveServices />}
        />
        <Route
          path="/today-all-transaction"
          element={<SATodayAllTransaction />}
        />
        <Route path="/all-transaction" element={<SAAllTransaction />} />
        <Route
          path="/choice-user-notification"
          element={<SAChangeUserNotification />}
        />
        <Route path="/Panform" element={<PanForm />} />
        <Route
          path="/online-recharge-history"
          element={<SAOnlineRecharges />}
        />
        <Route
          path="/online-dth-connection-history"
          element={<SAOnlineDthConnection />}
        />
        <Route
          path="/pan-coupon-requests"
          element={<SAPanCouponRequests />}
        />
        <Route
          path="/user-relation-data"
          element={<SAUserRelation />}
        />
        <Route
          path="/uploaded-documents"
          element={<SAPanUploadedDocsList />}
        />
         {/* <Route path="*" element={<NotFound />} /> */}

        {/* <Route path="/download-certificate-print" element={<Certificate user="WHITE LABEL" name="Aashish Kumar"
        address="Jabalpur, BIHAR - 482001"
        date="02-Jul-2024"
        id="AASHISD29164"/>} /> */}
      </Routes>
      </Suspense>
      </Wrapper>
    </React.Fragment>
  );
};

export default SuperAdminRoutes;

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

`
