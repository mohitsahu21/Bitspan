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

function App() {
  const {  currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [user,setUser] = useState(currentUser.role);
  
  useEffect(()=>{
    setUser(currentUser.role)
  },[currentUser.role])
  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/download-certificate-print" && <Sider />}

      <Routes>
        <Route path="/" element={<LoginBitspan />} />
      </Routes>
      {user === "Retailer" && <RetailerRoutes />}
      {user === "SuperDistributor" && <SuperDistributorRoutes />}
      {user === "Distributor" && <Distributor />}
      {user === "WhiteLabel" && <WhiteLabelRoutes />}
    </>
  );
}

export default App;
