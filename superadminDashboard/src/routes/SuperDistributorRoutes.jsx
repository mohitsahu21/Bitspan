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

const SuperDistributorRoutes = () => {
  return (
    <React.Fragment>
        <Routes>
      <Route path="/dashboard" element={<SuperDistributerDashboard />} />
      <Route path="/aadhar-linking-status"element={<AadharLinkingStatus />}/>
      <Route path="/training-video" element={<TrainingVideo />} />

      <Route path="/wallet-transaction-report" element={<SdWalletTransactionReport />}/>

      <Route path="/2-step-verification" element={<SdStepVerification />} />

      <Route path="/create-distributor" element={<CreateDistributor />} />

      <Route path="/uti-transaction-report" element={<SdUTIPanTransactionReport />} />

      <Route path="/distribute-uti-coupon" element={<SdDistributeCoupon />} />

      <Route path="/uti-coupon-history" element={<SdUTICouponHistory />} />

      <Route path="/pan-transaction-report" element={<SdPanTransactionReport />} />
      </Routes>
      </React.Fragment>
  );
};

export default SuperDistributorRoutes;