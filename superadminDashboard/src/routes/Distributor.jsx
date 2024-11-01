import React from "react";
import { Route, Routes } from "react-router-dom";
import DistributorDashboard from "../pages/DistributorDashboard";
import DtProfile from "../components/Distributor/DtProfile";
import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import DWalletTransactionReport from "../components/Distributor/DWalletTransactionReport";
import DAllOfflineForm from "../components/Distributor/DAllOfflineForm";
import DStepVerification from "../components/Distributor/DStepVerification";
import CreateRetailer from "../components/Distributor/CreateRetailer";
import DUTIPanTransactionReport from "../components/Distributor/DUTIPanTransactionReport";
import DDistributeCoupon from "../components/Distributor/DDistributeCoupon";
import DPanTransactionReport from "../components/Distributor/DPanTransactionReport";
import DActiveUsersList from "../components/Distributor/DActiveUsersList";
import DDeactiveUsersList from "../components/Distributor/DDeactiveUsersList";
import DAllUsersJoinedList from "../components/Distributor/DAllUsersJoinedList";
import DUTICouponHistory from "../components/Distributor/DUTICouponHistory";
import DChangePrice from "../components/Distributor/DChangePrice";
import DComplaints from "../components/Distributor/DComplaints";
import DAllComplaintsList from "../components/Distributor/DAllComplaintsList";
import DChangePassword from "../components/Distributor/DChangePassword";
import DBankAccountSetup from "../components/Distributor/DBankAccountSetup";
import DFundTransferStatus from "../components/Distributor/DFundTransferStatus";
import Certificate from "../components/Distributor/Certificate";
import DDownloadCertificate from "../components/Distributor/DDownloadCertificate";
import DBankAccountVerify from "../components/Distributor/DBankAccountVerify";
import PanCardOffFormDist from "../components/Distributor/PanCardOffFormDist";
import RechargeHistoryDist from "../components/Distributor/RechargeHistoryDist";
import DTHConnectionHistory from "../components/Distributor/DTHConnectionHistory";
import BuyDistUserId from "../components/Distributor/BuyUserId";

const Distributor = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DistributorDashboard />} />
        <Route path="/update-profile" element={<DtProfile />} />
        <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        />
        <Route path="/training-video" element={<TrainingVideo />} />
        <Route
          path="/wallet-transaction-report"
          element={<DWalletTransactionReport />}
        />
        <Route path="/view-all-offline-history" element={<DAllOfflineForm />} />
        <Route path="/2-step-verification" element={<DStepVerification />} />
        {/* <Route path="/create-distributor" element={<CreateDistributor />} /> -------- */}
        <Route path="/create-retailer" element={<CreateRetailer />} />
        <Route
          path="/uti-transaction-report"
          element={<DUTIPanTransactionReport />}
        />
        <Route path="/distribute-uti-coupon" element={<DDistributeCoupon />} />
        <Route path="/uti-coupon-history" element={<DUTICouponHistory />} />
        <Route
          path="/pan-transaction-report"
          element={<DPanTransactionReport />}
        />
        <Route path="/active-users" element={<DActiveUsersList />} />
        <Route path="/deactive-users" element={<DDeactiveUsersList />} />
        <Route path="/users-joining-list" element={<DAllUsersJoinedList />} />
        <Route path="/change-price" element={<DChangePrice />} />
        <Route path="/raise-complaint" element={<DComplaints />} />
        <Route path="/complaint-raised-list" element={<DAllComplaintsList />} />
        <Route path="/change-password" element={<DChangePassword />} />
        <Route path="/bank-account-setup" element={<DBankAccountSetup />} />
        <Route
          path="/bank-account-setup/:bank_id/:user_id"
          element={<DBankAccountVerify />}
        />
        <Route path="/fund-transfer-status" element={<DFundTransferStatus />} />
        <Route path="/pan-card-history" element={<PanCardOffFormDist />} />
        <Route path="/recharge-history" element={<RechargeHistoryDist />} />
        <Route
          path="/DTH-connection-history"
          element={<DTHConnectionHistory />}
        />
        <Route
          path="/download-certificate"
          element={<DDownloadCertificate />}
        />

        <Route path="/buy-distributor-UserId" element={<BuyDistUserId />} />

        <Route
          path="/download-certificate-print"
          element={
            <Certificate
              user="DISTRIBUTOR"
              name="Aashish Kumar"
              address="Jabalpur, BIHAR - 482001"
              date="02-Jul-2024"
              id="AASHISD29164"
            />
          }
        />
      </Routes>
    </>
  );
};

export default Distributor;
