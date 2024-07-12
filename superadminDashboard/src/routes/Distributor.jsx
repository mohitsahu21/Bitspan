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
      </Routes>
    </>
  );
};

export default Distributor;
