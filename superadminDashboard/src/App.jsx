import { Route, Routes } from "react-router-dom";
import LoginBitspan from "./components/LoginBitspan";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./components/PanCardForm/MultiStepForm";
import Sider from "./components/SideBar";
import UtiPan from "./components/DashBoard/UtiPan";
import Profile from "./pages/Profile";
import MobileRecharge from "./components/DashBoard/MobileRecharge";
import Complaints from "./components/DashBoard/Complaints";
import AddMoney from "./components/DashBoard/AddMoney";
import DthRecharge from "./components/DashBoard/DthRecharge";

function App() {
  return (
    <>
      <Sider />
      <Routes>
        <Route path="/" element={<LoginBitspan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pan-card-apply" element={<MultiStepForm />} />
        <Route path="/update-profile" element={<Profile />} />
        <Route path="/prepaid-recharge" element={<MobileRecharge />} />
        <Route path="/raise-complaint" element={<Complaints />} />
        <Route path="/add-money" element={<AddMoney />} />
        <Route path="/uti-login" element={<UtiPan />} />
        <Route path="/dth-recharge" element={<DthRecharge />} />
      </Routes>
    </>
  );
}

export default App;
