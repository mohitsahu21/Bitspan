import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminEmployeeDash from "../pages/SuperAdminEmployeeDash";
import GooglePlay from "../components/SuperAdminEmployee/SuperAdminEmployee/GooglePlay";
import IrctcAgent from "../components/SuperAdminEmployee/SuperAdminEmployee/IrctcAgent";
import BirthCerficate from "../components/SuperAdminEmployee/SuperAdminEmployee/BirthCerficate";
import DeathCertificate from "../components/SuperAdminEmployee/SuperAdminEmployee/DeathCertificate";
import Estamp from "../components/SuperAdminEmployee/SuperAdminEmployee/Estamp";
import ITRRegistration from "../components/SuperAdminEmployee/SuperAdminEmployee/ITRRegistration";
import GSTRegistration from "../components/SuperAdminEmployee/SuperAdminEmployee/GSTRegistration";
import SambalCard from "../components/SuperAdminEmployee/SuperAdminEmployee/SambalCard";
import IncomeCertificate from "../components/SuperAdminEmployee/SuperAdminEmployee/IncomeCertificate";
import DomicileCertificate from "../components/SuperAdminEmployee/SuperAdminEmployee/DomicileCertificate";
import BankId from "../components/SuperAdminEmployee/SuperAdminEmployee/BankId";
import PanCardOffline from "../components/SuperAdminEmployee/SuperAdminEmployee/PanCardOffline";
import PanCardOfflineDetails from "../components/SuperAdminEmployee/SuperAdminEmployee/PanCardOfflineDetails";
import DTHRechargeOffline from "../components/SuperAdminEmployee/SuperAdminEmployee/DTHRechargeOffline";
import RechargeOffline from "../components/SuperAdminEmployee/SuperAdminEmployee/RechargeOffline";
import OtherOfflineServices from "../components/SuperAdminEmployee/SuperAdminEmployee/OtherOfflineServices";
import GooglePlayOffline from "../components/SuperAdminEmployee/SuperAdminEmployee/GooglePlayOffline";
import GooglePlayDetailsPage from "../components/SuperAdminEmployee/SuperAdminEmployee/GooglePlayDetailsPage";

const SuperAdminEmployeeRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<SuperAdminEmployeeDash />} />
        <Route path="/google-play" element={<GooglePlay />} />
        <Route path="/irctc-agent-id" element={<IrctcAgent />} />
        <Route path="/birth-certificate" element={<BirthCerficate />} />
        <Route path="/death-certificate" element={<DeathCertificate />} />
        <Route path="/e-stamp" element={<Estamp />} />
        <Route path="/ITR-registration" element={<ITRRegistration />} />
        <Route path="/GST-registration" element={<GSTRegistration />} />
        <Route path="/sambal-card" element={<SambalCard />} />
        <Route path="/income-certificate" element={<IncomeCertificate />} />
        <Route path="/domicile-certificate" element={<DomicileCertificate />} />
        <Route path="/bank-id" element={<BankId />} />
        <Route path="/pan-card-offline" element={<PanCardOffline />} />
        <Route
          path="/pan-card-offline-details/:id"
          element={<PanCardOfflineDetails />}
        />
        <Route
          path="/DTH-new-connection-offline"
          element={<DTHRechargeOffline />}
        />
        <Route path="/recharge-offline" element={<RechargeOffline />} />
        <Route path="/google-play-offline" element={<GooglePlayOffline />} />
        <Route
          path="/google-play-offline-details/:id"
          element={<GooglePlayDetailsPage />}
        />
      </Routes>
    </>
  );
};

export default SuperAdminEmployeeRoute;
