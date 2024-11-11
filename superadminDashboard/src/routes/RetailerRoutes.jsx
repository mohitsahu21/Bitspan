import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginBitspan from "../components/LoginBitspan";
import Dashboard from "../pages/Dashboard";
import MultiStepForm from "../components/PanCardForm/MultiStepForm";
import Profile from "../pages/Profile";
import MobileRecharge from "../components/DashBoard/MobileRecharge";
import Complaints from "../components/DashBoard/Complaints";
import UtiPan from "../components/DashBoard/UtiPan";
import AddMoney from "../components/DashBoard/AddMoney";
import AddMoneyOffline from "../components/DashBoard/AddMoneyOffline";
import AddWalletSummary from "../components/DashBoard/AddWalletSummary";
import AddWalletOfflineSummary from "../components/DashBoard/AddWalletOfflineSummary";
import WalletTransactionReport from "../components/DashBoard/WalletTransactionReport";
import NsdlNewPanCard from "../components/DashBoard/NsdlNewPanCard";
import NsdlPanCorrection from "../components/DashBoard/NsdlPanCorrection";
import PanStatus from "../components/DashBoard/PanStatus";
import PanTransactionReport from "../components/DashBoard/PanTransactionReport";
import PanTransactionRefundReport from "../components/DashBoard/PanTransactionRefundReport";
import PanTransactionResumeReport from "../components/DashBoard/PanTransactionResumeReport";
import DthRecharge from "../components/DashBoard/DthRecharge";
import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
import TrainingVideo from "../components/DashBoard/TrainingVideo";
import StepVerification from "../components/DashBoard/StepVerification";
import UTIPanTransactionReport from "../components/DashBoard/UTIPanTransactionReport";
import UTIRetailerIdActivate from "../components/DashBoard/UTIRetailerIdActivate";
import UTIPasswordReset from "../components/DashBoard/UTIPasswordReset";
import UTICouponHistory from "../components/DashBoard/UTICouponHistory";
import PanDocumentUpload from "../components/DashBoard/PanDocumentUpload";
import PanUploadedDocsList from "../components/DashBoard/PanUploadedDocsList";
import ImportantLink from "../components/DashBoard/ImportantLink";
import AllComplaintsList from "../components/DashBoard/AllComplaintsList";
import DownloadCertificate from "../components/DashBoard/DownloadCertificate";
import ChangePassword from "../components/DashBoard/ChangePassword";
import PrepaidRechargeHistory from "../components/DashBoard/PrepaidRechargeHistory";
import PostpaidRechargeHistory from "../components/DashBoard/PostpaidRechargeHistory";
import DTHRechargeHistory from "../components/DashBoard/DTHRechargeHistory";
import RechargeRefundReport from "../components/DashBoard/RechargeRefundReport";
import MyCommission from "../components/DashBoard/MyCommission";
import Tool from "../components/DashBoard/Tool";
import OffilnePanCard from "../components/DashBoard/OffilnePanCard";
import PanForm from "../components/DashBoard/PanForm";
import AllPanForm from "../components/DashBoard/AllPanForm";
import Certificate from "../components/SuperDistributer/Certificate";
import NewBankID from "../components/DashBoard/NewBankID";
import PostPaidRecharge from "../components/DashBoard/PostPaidRecharge";
import DthConnection from "../components/DashBoard/DthConnection";
import ElectricityRecharge from "../components/DashBoard/ElectricityRecharge";
import BroadbandRecharge from "../components/DashBoard/BroadbandRecharge";
import ElectricityHistory from "../components/DashBoard/ElectricityHistory";
import BroadbandHistory from "../components/DashBoard/BroadbandHistory";
import PanCardFour from "../components/DashBoard/PanCardFour";
import NsdlIncomplete from "../components/DashBoard/NsdlIncomplete";
import NsdlNewPanCardEasySmart from "../components/DashBoard/NsdlNewPanCardEasySmart";
import RedirectPanForm from "../components/DashBoard/RedirectPanForm";
import NsdlPanCorrectionEasySmart from "../components/DashBoard/NsdlPanCorrectionEasySmart";
import RedirectionCorrectionPanForm from "../components/DashBoard/RedirectionCorrectionPanForm";
import NsdlNewPanCardZlink from "../components/DashBoard/NsdlNewPanCardZlink";
import NsdlPanCorrectionZlink from "../components/DashBoard/NsdlPanCorrectionZlink";
import NsdlIncompletePanZlink from "../components/DashBoard/NsdlIncompletePanZlink";
import IncompletePanFormZlink from "../components/DashBoard/IncompletePanFormZlink";
import PanFourHistory from "../components/DashBoard/PanFourHistory";
import UtiPanNew from "../components/DashBoard/UtiPanNew";
import DemoRegistration from "../components/DashBoard/DemoRegistration";
import { useSelector } from "react-redux";
import EdistrictForm from "../components/DashBoard/EdistrictForm";
import CreatePin from "../components/DashBoard/CreatePin";
import BankHistory from "../components/DashBoard/BankHistory";
import Edistrict from "../components/DashBoard/Edistrict";

const RetailerRoutes = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;
  // console.log(userStatus);
  // console.log(token);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginBitspan />} />

        <Route path="/update-profile" element={<Profile />} />
        <Route
          path="/dashboard"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route
          path="/pan-card-apply"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <MultiStepForm />
            )
          }
        />
        <Route
          path="/prepaid-recharge"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <MobileRecharge />
            )
          }
        />
        <Route
          path="/postpaid-recharge"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PostPaidRecharge />
            )
          }
        />
        <Route
          path="/electricity-recharge"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ElectricityRecharge />
            )
          }
        />
        <Route
          path="/broadband-recharge"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <BroadbandRecharge />
            )
          }
        />
        <Route
          path="/raise-complaint"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Complaints />
            )
          }
        />
        <Route
          path="/uti-login"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UtiPan />
            )
          }
        />
        <Route
          path="/add-money"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AddMoney />
            )
          }
        />
        <Route
          path="/add-wallet-money-offline"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AddMoneyOffline />
            )
          }
        />
        <Route
          path="/add-money-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AddWalletSummary />
            )
          }
        />
        <Route
          path="/wallet-offline-request"
          element={<AddWalletOfflineSummary />}
        />
        <Route
          path="/wallet-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <WalletTransactionReport />
            )
          }
        />
        <Route
          path="/pan-apply-49"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlNewPanCard />
            )
          }
        />
        <Route
          path="/pan-apply-cr"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlPanCorrection />
            )
          }
        />
        <Route
          path="/pan-status"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanStatus />
            )
          }
        />

        {/* easy smart route */}
        <Route
          path="/nsdl-new-pan-card"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlNewPanCardEasySmart />
            )
          }
        />
        <Route
          path="/nsdl-new-pan-card-redirect"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <RedirectPanForm />
            )
          }
        />
        <Route
          path="/easySmartNsdlPANCallback"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Dashboard />
            )
          }
        />

        <Route
          path="/nsdl-correction-pan-card"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlPanCorrectionEasySmart />
            )
          }
        />
        <Route
          path="/nsdl-correction-pan-card-redirect"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <RedirectionCorrectionPanForm />
            )
          }
        />

        {/* easy smart route */}

        {/* Zlink Pan route */}
        <Route
          path="/nsdl-new-pan-card-2"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlNewPanCardZlink />
            )
          }
        />
        {/* <Route path="/nsdl-new-pan-card-redirect" element={<RedirectPanForm />} /> */}
        {/* <Route path="/easySmartNsdlPANCallback" element={<Dashboard />} /> */}

        <Route
          path="/nsdl-correction-pan-card-2"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlPanCorrectionZlink />
            )
          }
        />
        {/* <Route path="/nsdl-correction-pan-card-redirect" element={<RedirectionCorrectionPanForm />} />  */}

        {/* Zlink Pan route */}

        <Route
          path="/pan-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanTransactionReport />
            )
          }
        />
        <Route
          path="/pan-transaction-refund-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanTransactionRefundReport />
            )
          }
        />
        <Route
          path="/pan-transaction-resume-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanTransactionResumeReport />
            )
          }
        />
        <Route
          path="/raise-complaint"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Complaints />
            )
          }
        />
        <Route
          path="/add-money"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AddMoney />
            )
          }
        />
        <Route
          path="/uti-login"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UtiPan />
            )
          }
        />
        <Route
          path="/uti-login-new"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UtiPanNew />
            )
          }
        />
        <Route
          path="/dth-recharge"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <DthRecharge />
            )
          }
        />
        <Route
          path="/dth-connection"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <DthConnection />
            )
          }
        />
        <Route
          path="/aadhar-linking-status"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AadharLinkingStatus />
            )
          }
        />
        <Route
          path="/training-video"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <TrainingVideo />
            )
          }
        />
        <Route
          path="/2-step-verification"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <StepVerification />
            )
          }
        />
        <Route
          path="/uti-transaction-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UTIPanTransactionReport />
            )
          }
        />
        <Route
          path="/retailer-id-revamp-activate"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UTIRetailerIdActivate />
            )
          }
        />
        <Route
          path="/password-reset"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UTIPasswordReset />
            )
          }
        />
        <Route
          path="/uti-coupon-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <UTICouponHistory />
            )
          }
        />
        <Route
          path="/pan-document-upload"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanDocumentUpload />
            )
          }
        />
        <Route
          path="/pan-document"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanUploadedDocsList />
            )
          }
        />
        <Route
          path="/important-links"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ImportantLink />
            )
          }
        />
        <Route
          path="/complaint-raised-list"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AllComplaintsList />
            )
          }
        />
        <Route
          path="/download-certificate"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <DownloadCertificate />
            )
          }
        />
        <Route
          path="/change-password"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ChangePassword />
            )
          }
        />
        <Route
          path="/prepaid-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PrepaidRechargeHistory />
            )
          }
        />
        <Route
          path="/postpaid-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PostpaidRechargeHistory />
            )
          }
        />
        <Route
          path="/dth-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <DTHRechargeHistory />
            )
          }
        />
        <Route
          path="/eletricity-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <ElectricityHistory />
            )
          }
        />
        <Route
          path="/broadband-recharge-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <BroadbandHistory />
            )
          }
        />
        <Route
          path="/recharge-refund-report"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <RechargeRefundReport />
            )
          }
        />
        <Route
          path="/my-commission"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <MyCommission />
            )
          }
        />
        <Route
          path="/crop-tool"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Tool />
            )
          }
        />
        <Route
          path="/download-offline-forms"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <OffilnePanCard />
            )
          }
        />
        <Route
          path="/apply-offline"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanForm />
            )
          }
        />
        <Route
          path="/view-all-offline-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <AllPanForm />
            )
          }
        />
        <Route
          path="/download-certificate-print"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Certificate
                user="RETAILER"
                name="Aashish Kumar"
                address="Jabalpur, BIHAR - 482001"
                date="02-Jul-2024"
                id="AASHISD29164"
              />
            )
          }
        />
        <Route
          path="/bank-id"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NewBankID />
            )
          }
        />
        <Route
          path="/pan-card-4.0"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanCardFour />
            )
          }
        />
        <Route
          path="/incomplete-request"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlIncomplete />
            )
          }
        />

        <Route
          path="/incomplete-request-zlink"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <NsdlIncompletePanZlink />
            )
          }
        />
        <Route
          path="/redirect-incomplete-pan-zlink"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <IncompletePanFormZlink />
            )
          }
        />

        <Route
          path="/pan-4.0-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <PanFourHistory />
            )
          }
        />

        <Route
          path="/E-District-Form"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <EdistrictForm />
            )
          }
        />

        <Route
          path="/generate-pin"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <CreatePin />
            )
          }
        />

        <Route
          path="/bank-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <BankHistory />
            )
          }
        />

        <Route
          path="/E-District-history"
          element={
            userStatus === "Pending" || userStatus === "Deactive" ? (
              <Navigate to="/update-profile" />
            ) : (
              <Edistrict />
            )
          }
        />

        <Route path="/registration-page" element={<DemoRegistration />} />
      </Routes>
    </>
  );
};

export default RetailerRoutes;
