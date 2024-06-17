import { Route, Routes, useLocation } from "react-router-dom";
import LoginBitspan from "./components/LoginBitspan";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MultiStepForm from "./components/PanCardForm/MultiStepForm";
import Sider from "./components/SideBar";
import UtiPan from "./components/DashBoard/UtiPan";
import MobileRecharge from "./components/DashBoard/MobileRecharge";
import Complaints from "./components/DashBoard/Complaints";
import AddWalletSummary from "./components/DashBoard/AddWalletSummary";
import AddMoneyOffline from "./components/DashBoard/AddMoneyOffline";
import AddWalletOfflineSummary from "./components/DashBoard/AddWalletOfflineSummary";
import WalletTransactionReport from "./components/DashBoard/WalletTransactionReport";
import NsdlNewPanCard from "./components/DashBoard/NsdlNewPanCard";
import NsdlPanCorrection from "./components/DashBoard/NsdlPanCorrection";
import PanStatus from "./components/DashBoard/PanStatus";
import PanTransactionReport from "./components/DashBoard/PanTransactionReport";
import PanTransactionRefundReport from "./components/DashBoard/PanTransactionRefundReport";
import PanTransactionResumeReport from "./components/DashBoard/PanTransactionResumeReport";
import AddMoney from "./components/DashBoard/AddMoney";
import DthRecharge from "./components/DashBoard/DthRecharge";
import AadharLinkingStatus from "./components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "./components/DashBoard/TrainingVideo";
import StepVerification from "./components/DashBoard/StepVerification";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Sider />}
      <Routes>
        <Route path="/" element={<LoginBitspan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pan-card-apply" element={<MultiStepForm />} />
        <Route path="/update-profile" element={<Profile />} />
        <Route path="/prepaid-recharge" element={<MobileRecharge />} />
        <Route path="/raise-complaint" element={<Complaints />} />
        <Route path="/uti-login" element={<UtiPan />} />
        <Route path="/add-money" element={<AddMoney />} />
        <Route path="/add-wallet-money-offline" element={<AddMoneyOffline />} />
        <Route
          path="/add-money-transaction-report"
          element={<AddWalletSummary />}
        />
        <Route
          path="/wallet-offline-request"
          element={<AddWalletOfflineSummary />}
        />
        <Route
          path="/wallet-transaction-report"
          element={<WalletTransactionReport />}
        />
        <Route path="/pan-apply-49" element={<NsdlNewPanCard />} />
        <Route path="/pan-apply-cr" element={<NsdlPanCorrection />} />
        <Route path="/pan-status" element={<PanStatus />} />
        <Route
          path="/pan-transaction-report"
          element={<PanTransactionReport />}
        />
        <Route
          path="/pan-transaction-refund-report"
          element={<PanTransactionRefundReport />}
        />
        <Route
          path="/pan-transaction-resume-report"
          element={<PanTransactionResumeReport />}
        />
        <Route path="/raise-complaint" element={<Complaints />} />
        <Route path="/add-money" element={<AddMoney />} />
        <Route path="/uti-login" element={<UtiPan />} />
        <Route path="/dth-recharge" element={<DthRecharge />} />
        <Route path="/aadhar-linking-status" element={<AadharLinkingStatus/>} />
        <Route path="/training-video" element={<TrainingVideo/>} />
        <Route path="/2-step-verification" element={<StepVerification/>} />
      </Routes>
    </>
  );
}

export default App;
