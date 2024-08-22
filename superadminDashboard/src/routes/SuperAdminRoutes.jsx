import React from "react";
import { Route, Routes } from "react-router-dom";

import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import WLUTIPanTransactionReport from "../components/WhiteLabel/WLUTIPanTransactionReport";
import WLDistributeCoupon from "../components/WhiteLabel/WLDistributeCoupon";
import WLUTICouponHistory from "../components/WhiteLabel/WLUTICouponHistory";
import WLPanTransactionReport from "../components/WhiteLabel/WLPanTransactionReport";
import WLActiveUsersList from "../components/WhiteLabel/WLActiveUsersList";
import WLDeactiveUsersList from "../components/WhiteLabel/WLDeactiveUsersList";
import WLAllUsersJoinedList from "../components/WhiteLabel/WLAllUsersJoinedList";
import WLChangePrice from "../components/WhiteLabel/WLChangePrice";
import WLComplaints from "../components/WhiteLabel/WLComplaints";
import WLAllComplaintsList from "../components/WhiteLabel/WLAllComplaintsList";
import WLDownloadCertificate from "../components/WhiteLabel/WLDownloadCertificate";
import WLChangePassword from "../components/WhiteLabel/WLChangePassword";
import WLBankAccountSetup from "../components/WhiteLabel/WLBankAccountSetup";
import WLBankAccountVerify from "../components/WhiteLabel/WLBankAccountVerify";
import WLWalletWithdraw from "../components/WhiteLabel/WLWalletWithdraw";
import WLFundTransferStatus from "../components/WhiteLabel/WLFundTransferStatus";
import Certificate from "../components/SuperDistributer/Certificate";
import WLPendingPaymentUsers from "../components/WhiteLabel/WLPendingPaymentUsers";
import WhiteLabelJoiningList from "../components/WhiteLabel/WhiteLabelJoiningList";
import BuyUserIdSummary from "../components/WhiteLabel/BuyUserIdSummary";
import ChangeIdSetRate from "../components/WhiteLabel/ChangeIdSetRate";
import ChangeUTINewCouponPrice from "../components/WhiteLabel/ChangeUTINewCouponPrice";
import ChangeNSDLPrice from "../components/WhiteLabel/ChangeNSDLPrice";
import ChangeUTIPanPrice from "../components/WhiteLabel/ChangeUTIPanPrice";
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



const SuperAdminRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/update-profile" element={<SAProfile />} />
        <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        />
        <Route path="/training-video" element={<TrainingVideo />} />

        <Route
          path="/wallet-transaction-report"
          element={<SAWalletTransactionReport />}
        />
        <Route
          path="/view-all-offline-history"
          element={<SAAllOfflineForm />}
        />

        <Route path="/2-step-verification" element={<SAStepVerification />} />
        <Route path="/website-setting" element={<SAWebsiteSetting />} />

        {/* <Route path="/create-super-distributor" element={<CreateSuperDistributor />} /> */}
        <Route path="/create-white-label" element={<SACreateWhiteLabel />} />
        {/* <Route path="/buy-admin-id" element={<BuyUserId />} /> */}

        <Route
          path="/uti-transaction-report"
          element={<SAUTIPanTransactionReport />}
        />

        <Route path="/distribute-uti-coupon" element={<SADistributeCoupon />} />

        <Route path="/uti-coupon-history" element={<SAUTICouponHistory />} />

      
      <Route path="/active-users" element={<SAActiveUsersList />} />
      <Route path="/deactive-users" element={<SADeactiveUsersList/>} />
      <Route path="/users-joining-list" element={<SAAllUsersJoinedList />} />
      <Route path="/pending-payment-users" element={<SAPendingPaymentUsers />} />
      <Route path="/white-label-joining-list" element={<SAWhiteLabelJoiningList />} />
      <Route path="/buy-user-id-summary" element={<SABuyUserIdSummary />} />
      <Route path="/pan-transaction-report" element={<SAPanTransactionReport />} />
      <Route path="/change-price" element={<SAChangePrice />} />
      <Route path="/raise-complaint" element={<WLComplaints />} />
      <Route path="/complaint-raised-list" element={<WLAllComplaintsList />} />
      <Route path="/download-certificate" element={<WLDownloadCertificate />} />
      <Route path="/change-coupon-price" element={<ChangeIdSetRate />} />
      <Route path="/change-nsdl-price" element={<ChangeNSDLPrice/>} />
      <Route path="/change-uti-price" element={<ChangeUTIPanPrice/>} />
      <Route path="/change-uti-new-price" element={<ChangeUTINewCouponPrice />} />
      <Route path="/change-password" element={<WLChangePassword />} />
      <Route path="/bank-account-setup" element={<WLBankAccountSetup />} />
      <Route path="/bank-account-setup/:bank_id/:user_id" element={<WLBankAccountVerify />} />
      <Route path="/wallet-withdraw" element={<WLWalletWithdraw/>} />
      <Route path="/fund-transfer-status" element={<WLFundTransferStatus />} />
      <Route path="/download-certificate-print" element={<Certificate user="WHITE LABEL" name="Aashish Kumar"
        address="Jabalpur, BIHAR - 482001"
        date="02-Jul-2024"
        id="AASHISD29164"/>} />
       
      </Routes>
    </React.Fragment>
  );
};

export default SuperAdminRoutes;