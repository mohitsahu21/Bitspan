import { Route, Routes } from "react-router-dom";
import LoginBitspan from "./components/LoginBitspan";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./components/PanCardForm/MultiStepForm";
import Sider from "./components/SideBar";
import Complaints from "./components/DashBoard/Complaints";
import AddMoney from "./components/DashBoard/AddMoney";

function App() {
  return (
    <>
    <Sider />
      <Routes>
        <Route path="/" element={<LoginBitspan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pan-card-apply" element={<MultiStepForm/>}/>
        <Route path="/raise-complaint" element={<Complaints/>} />
        <Route path="/add-money" element={<AddMoney/>} />
      </Routes>
    </>
  );
}

export default App;
