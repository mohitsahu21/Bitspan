import React from "react";
import { Route, Routes } from "react-router-dom";

import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";
import SAProfile from "../components/SuperAdmin/SAProfile";
import SAWalletTransactionReport from "../components/SuperAdmin/SAWalletTransactionReport";
import SAAllOfflineForm from "../components/SuperAdmin/SAAllOfflineForm";
import SAStepVerification from "../components/SuperAdmin/SAStepVerification";
import SAWebsiteSetting from "../components/SuperAdmin/SAWebsiteSetting";
import SAUTIPanTransactionReport from "../components/SuperAdmin/SAUTIPanTransactionReport";
import SACreateWhiteLabel from "../components/SuperAdmin/SACreateWhiteLabel";
import SADistributeCoupon from "../components/SuperAdmin/SADistributeCoupon";
import SAUTICouponHistory from "../components/SuperAdmin/SAUTICouponHistory";
import SAActiveUsersList from "../components/SuperAdmin/SAActiveUsersList";
import SADeactiveUsersList from "../components/SuperAdmin/SADeactiveUsersList";
import SAAllUsersJoinedList from "../components/SuperAdmin/SAAllUsersJoinedList";
import SAPendingPaymentUsers from "../components/SuperAdmin/SAPendingPaymentUsers";
import SAWhiteLabelJoiningList from "../components/SuperAdmin/SAWhiteLabelJoiningList";
import SABuyUserIdSummary from "../components/SuperAdmin/SABuyUserIdSummary";
import SAPanTransactionReport from "../components/SuperAdmin/SAPanTransactionReport";
import SAChangePrice from "../components/SuperAdmin/SAChangePrice";
import SAAllComplaintsList from "../components/SuperAdmin/SAAllComplaintsList";
import SAChangeIdSetRate from "../components/SuperAdmin/SAChangeIdSetRate";
import SAChangeNSDLPrice from "../components/SuperAdmin/SAChangeNSDLPrice";
import SAChangeUTIPanPrice from "../components/SuperAdmin/SAChangeUTIPanPrice";
import SAChangeUTINewCouponPrice from "../components/SuperAdmin/SAChangeUTINewCouponPrice";
import SAChangePassword from "../components/SuperAdmin/SAChangePassword";
import SABankAccountSetup from "../components/SuperAdmin/SABankAccountSetup";
import SABankAccountVerify from "../components/SuperAdmin/SABankAccountVerify";
import SAWalletWithdraw from "../components/SuperAdmin/SAWalletWithdraw";
import SAFundTransferStatus from "../components/SuperAdmin/SAFundTransferStatus";
import SAWalletWithdrawRequests from "../components/SuperAdmin/SAWalletWithdrawRequests";
import SACommisionSummary from "../components/SuperAdmin/SACommisionSummary.jsx";
import SACreateSuperDistributor from "../components/SuperAdmin/SACreateSuperDistributor.jsx";
import SACreateDistributor from "../components/SuperAdmin/SACreateDistributor.jsx";
import SACreateRetailer from "../components/SuperAdmin/SACreateRetailer.jsx";
import SACreatePackages from "../components/SuperAdmin/SACreatePackages.jsx";
import SAViewPackages from "../components/SuperAdmin/SAViewPackages.jsx";
import SATodayAllTransaction from "../components/SuperAdmin/SATodayAllTransaction.jsx";
import SAAllTransaction from "../components/SuperAdmin/SAAllTransaction.jsx";
import SAChangeUserNotification from "../components/SuperAdmin/SAChangeUserNotification.jsx";
import SAWalletWithdrawSummary from "../components/SuperAdmin/SAWalletWithdrawSummary.jsx";
import SASetWhiteLabelIdPrice from "../components/SuperAdmin/SASetWhiteLabelIdPrice.jsx";
import SAActiveDeactiveApi from "../components/SuperAdmin/SAActiveDeactiveApi.jsx";
import PanForm from "../components/SuperAdmin/PanForm.jsx";
import SARegisterEmployee from "../components/SuperAdmin/SARegisterEmployee.jsx";
import SAPendingKycUsers from "../components/SuperAdmin/SAPendingKycUsers.jsx";
import SAEmployeeList from "../components/SuperAdmin/SAEmployeeList.jsx";
import SAPanOfflineHistory from "../components/SuperAdmin/SAPanOfflineHistory.jsx";
import SABankIdForms from "../components/SuperAdmin/SABankIdForms.jsx";
import SAEdistrictHistory from "../components/SuperAdmin/SAEdistrictHistory.jsx";
import SAOfflineRechargeHistory from "../components/SuperAdmin/SAOfflineRechargeHistory.jsx";
import SAOfflineDthConnection from "../components/SuperAdmin/SAOfflineDthConnection.jsx";
import SAAddWalletMoneyRequests from "../components/SuperAdmin/SAAddWalletMoneyRequests.jsx";
import SAAddWalletMoneySummary from "../components/SuperAdmin/SAAddWalletMoneySummary.jsx";
import SAActiveDeactiveServices from "../components/SuperAdmin/SAActiveDeactiveServices.jsx";
import SAAddWalletMoneyDirect from "../components/SuperAdmin/SAAddWalletMoneyDirect.jsx";
import SAWithdrawWalletMoneyDirect from "../components/SuperAdmin/SAWithdrawWalletMoneyDirect.jsx";
import SAVerifyEdistrictHistory from "../components/SuperAdmin/SAVerifyEdistrictHistory.jsx";
import SASambalHistory from "../components/SuperAdmin/SASambalHistory.jsx";
import SAOnlineRecharges from "../components/SuperAdmin/SAOnlineRecharges.jsx";
import SAOnlineDthConnection from "../components/SuperAdmin/SAOnlineDthConnection.jsx";
import SAPanCouponRequests from "../components/SuperAdmin/SAPanCouponRequests.jsx";
import SAUserRelation from "../components/SuperAdmin/SAUserRelation.jsx";
import SAPanCorrectionHistory from "../components/SuperAdmin/SAPanCorrectionHistory.jsx";

const SuperAdminRoutes = () => {
  return (
    <React.Fragment>
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
        <Route path="/user-id-set-rate" element={<SASetWhiteLabelIdPrice />} />
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

        {/* <Route path="/download-certificate-print" element={<Certificate user="WHITE LABEL" name="Aashish Kumar"
        address="Jabalpur, BIHAR - 482001"
        date="02-Jul-2024"
        id="AASHISD29164"/>} /> */}
      </Routes>
    </React.Fragment>
  );
};

export default SuperAdminRoutes;
