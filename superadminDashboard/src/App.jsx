import { Route, Routes, useLocation } from "react-router-dom";
import LoginBitspan from "./components/LoginBitspan";
import Sider from "./components/SideBar";
import "./App.css";
import { useEffect, useState } from "react";
import SuperDistributorRoutes from "./routes/SuperDistributorRoutes";
import RetailerRoutes from "./routes/RetailerRoutes";
import Distributor from "./routes/Distributor";
import WhiteLabelRoutes from "./routes/WhiteLabelRoutes";
import { useDispatch, useSelector } from "react-redux";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [user, setUser] = useState(currentUser?.role);

  // console.log(import.meta.env.VITE_userId)
  useEffect(() => {
    setUser(currentUser?.role);
  }, [currentUser?.role]);
  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/password-reset" &&
        location.pathname !== "/download-certificate-print" &&
        location.pathname !== "/registration-page" && <Sider />}

      <Routes>
        <Route path="/" element={<LoginBitspan />} />
        <Route path="/password-reset" element={<ForgotPassword />} />
      </Routes>
      {user === "Retailer" && <RetailerRoutes />}
      {user === "SuperDistributor" && <SuperDistributorRoutes />}
      {user === "Distributor" && <Distributor />}
      {user === "WhiteLabel" && <WhiteLabelRoutes />}
      {user === "SuperAdmin" && <SuperAdminRoutes />}
    </>
  );
}

export default App;
