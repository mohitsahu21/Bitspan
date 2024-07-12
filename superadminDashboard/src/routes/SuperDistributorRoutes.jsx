import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperDistributerDashboard from "../pages/SuperDistributerDashboard";
import SdWalletTransactionReport from "../components/SuperDistributer/SdWalletTransactionReport";
import SdStepVerification from "../components/SuperDistributer/SdStepVerification";
import CreateDistributor from "../components/SuperDistributer/CreateDistributor";
import SdUTIPanTransactionReport from "../components/SuperDistributer/SdUTIPanTransactionReport";
import SdDistributeCoupon from "../components/SuperDistributer/SdDistributeCoupon";
import SdUTICouponHistory from "../components/SuperDistributer/SdUTICouponHistory";
import SdPanTransactionReport from "../components/SuperDistributer/SdPanTransactionReport";
import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import SdAllOfflineForm from "../components/SuperDistributer/SdAllOfflineForm";
import SdProfile from "../components/SuperDistributer/SdProfile";
import SdActiveUsersList from "../components/SuperDistributer/SdActiveUsersList";
import SdDeactiveUsersList from "../components/SuperDistributer/SdDeactiveUsersList";
import SdAllUsersJoinedList from "../components/SuperDistributer/SdAllUsersJoinedList";
import SdComplaints from "../components/SuperDistributer/SdComplaints";
import SdAllComplaintsList from "../components/SuperDistributer/SdAllComplaintsList";
import SdDownloadCertificate from "../components/SuperDistributer/SdDownloadCertificate";
import SdChangePassword from "../components/SuperDistributer/SdChangePassword";
import SdChangePrice from "../components/SuperDistributer/SdChangePrice";
import SdBankAccountSetup from "../components/SuperDistributer/SdBankAccountSetup";
import SdFundTransferStatus from "../components/SuperDistributer/SdFundTransferStatus";
import Certificate from "../components/SuperDistributer/Certificate";

const SuperDistributorRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashboard" element={<SuperDistributerDashboard />} />
        <Route path="/update-profile" element={<SdProfile />} />
        <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        />
        <Route path="/training-video" element={<TrainingVideo />} />

        <Route
          path="/wallet-transaction-report"
          element={<SdWalletTransactionReport />}
        />
        <Route
          path="/view-all-offline-history"
          element={<SdAllOfflineForm />}
        />

        <Route path="/2-step-verification" element={<SdStepVerification />} />

        <Route path="/create-distributor" element={<CreateDistributor />} />

        <Route
          path="/uti-transaction-report"
          element={<SdUTIPanTransactionReport />}
        />

        <Route path="/distribute-uti-coupon" element={<SdDistributeCoupon />} />

        <Route path="/uti-coupon-history" element={<SdUTICouponHistory />} />

      <Route path="/pan-transaction-report" element={<SdPanTransactionReport />} />
      <Route path="/active-users" element={<SdActiveUsersList />} />
      <Route path="/deactive-users" element={<SdDeactiveUsersList />} />
      <Route path="/users-joining-list" element={<SdAllUsersJoinedList />} />
      <Route path="/change-price" element={<SdChangePrice />} />
      <Route path="/raise-complaint" element={<SdComplaints />} />
      <Route path="/complaint-raised-list" element={<SdAllComplaintsList />} />
      <Route path="/download-certificate" element={<SdDownloadCertificate />} />
      <Route path="/change-password" element={<SdChangePassword />} />
      <Route path="/bank-account-setup" element={<SdBankAccountSetup />} />
      <Route path="/fund-transfer-status" element={<SdFundTransferStatus />} />
      <Route path="/download-certificate-print" element={<Certificate user="SUPER DISTRIBUTOR" name="Aashish Kumar"
        address="Jabalpur, BIHAR - 482001"
        date="02-Jul-2024"
        id="AASHISD29164"/>} />
       
      </Routes>
    </React.Fragment>
  );
};

export default SuperDistributorRoutes;
