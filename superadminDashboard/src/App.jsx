import { Route, Routes, useLocation } from "react-router-dom";
import LoginBitspan from "./components/LoginBitspan";
import Sider from "./components/SideBar";
import "./App.css";
import { useState } from "react";
import SuperDistributorRoutes from "./routes/SuperDistributorRoutes";
import RetailerRoutes from "./routes/RetailerRoutes";
import Distributor from "./routes/Distributor";

function App() {
  const location = useLocation();
  const [user, setUser] = useState("Distributor");
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
    </>
  );
}

export default App;
