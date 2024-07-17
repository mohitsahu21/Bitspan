import React from "react";
import { Route, Routes } from "react-router-dom";

import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import WhiteLabelDashboard from "../pages/WhiteLabelDashboard";
import WLProfile from "../components/WhiteLabel/WLProfile";
import WLWalletTransactionReport from "../components/WhiteLabel/WLWalletTransactionReport";
import WLAllOfflineForm from "../components/WhiteLabel/WLAllOfflineForm";
import WLStepVerification from "../components/WhiteLabel/WLStepVerification";
import CreateDistributor from "../components/SuperDistributer/CreateDistributor";
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
import WebsiteSetting from "../components/WhiteLabel/WebsiteSetting";
import CreateWhiteLabel from "../components/WhiteLabel/CreateWhiteLabel";
import BuyUserId from "../components/WhiteLabel/BuyUserId";
import CreateSuperDistributor from "../components/WhiteLabel/CreateSuperDistributor";
import WLPendingPaymentUsers from "../components/WhiteLabel/WLPendingPaymentUsers";
import WhiteLabelJoiningList from "../components/WhiteLabel/WhiteLabelJoiningList";
import BuyUserIdSummary from "../components/WhiteLabel/BuyUserIdSummary";
import ChangeIdSetRate from "../components/WhiteLabel/ChangeIdSetRate";
import ChangeUTINewCouponPrice from "../components/WhiteLabel/ChangeUTINewCouponPrice";



const WhiteLabelRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashboard" element={<WhiteLabelDashboard />} />
        <Route path="/update-profile" element={<WLProfile />} />
        <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        />
        <Route path="/training-video" element={<TrainingVideo />} />

        <Route
          path="/wallet-transaction-report"
          element={<WLWalletTransactionReport />}
        />
        <Route
          path="/view-all-offline-history"
          element={<WLAllOfflineForm />}
        />

        <Route path="/2-step-verification" element={<WLStepVerification />} />
        <Route path="/website-setting" element={<WebsiteSetting />} />

        <Route path="/create-super-distributor" element={<CreateSuperDistributor />} />
        <Route path="/create-white-label" element={<CreateWhiteLabel />} />
        <Route path="/buy-admin-id" element={<BuyUserId />} />

        <Route
          path="/uti-transaction-report"
          element={<WLUTIPanTransactionReport />}
        />

        <Route path="/distribute-uti-coupon" element={<WLDistributeCoupon />} />

        <Route path="/uti-coupon-history" element={<WLUTICouponHistory />} />

      
      <Route path="/active-users" element={<WLActiveUsersList />} />
      <Route path="/deactive-users" element={<WLDeactiveUsersList />} />
      <Route path="/users-joining-list" element={<WLAllUsersJoinedList />} />
      <Route path="/pending-payment-users" element={<WLPendingPaymentUsers />} />
      <Route path="/white-label-joining-list" element={<WhiteLabelJoiningList />} />
      <Route path="/buy-user-id-summary" element={<BuyUserIdSummary />} />
      <Route path="/pan-transaction-report" element={<WLPanTransactionReport />} />
      <Route path="/change-price" element={<WLChangePrice />} />
      <Route path="/raise-complaint" element={<WLComplaints />} />
      <Route path="/complaint-raised-list" element={<WLAllComplaintsList />} />
      <Route path="/download-certificate" element={<WLDownloadCertificate />} />
      <Route path="/change-coupon-price" element={<ChangeIdSetRate />} />
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

export default WhiteLabelRoutes;
