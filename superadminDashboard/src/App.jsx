import { Route, Routes } from "react-router-dom";
import LoginBitspan from "./components/LoginBitspan";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./components/PanCardForm/MultiStepForm";
import Sider from "./components/SideBar";

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
        <Route path="/raise-complaint" element={<Complaints/>} />
        <Route path="/add-money" element={<AddMoney/>} />
      </Routes>
    </>
  );
}

export default App;
