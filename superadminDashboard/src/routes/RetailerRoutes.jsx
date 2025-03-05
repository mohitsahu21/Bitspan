// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import LoginBitspan from "../components/LoginBitspan";
// import Dashboard from "../pages/Dashboard";
// import MultiStepForm from "../components/PanCardForm/MultiStepForm";
// import Profile from "../pages/Profile";
// import MobileRecharge from "../components/DashBoard/MobileRecharge";
// import Complaints from "../components/DashBoard/Complaints";
// import UtiPan from "../components/DashBoard/UtiPan";
// import AddMoney from "../components/DashBoard/AddMoney";
// import AddMoneyOffline from "../components/DashBoard/AddMoneyOffline";
// import AddWalletSummary from "../components/DashBoard/AddWalletSummary";
// import AddWalletOfflineSummary from "../components/DashBoard/AddWalletOfflineSummary";
// import WalletTransactionReport from "../components/DashBoard/WalletTransactionReport";
// import NsdlNewPanCard from "../components/DashBoard/NsdlNewPanCard";
// import NsdlPanCorrection from "../components/DashBoard/NsdlPanCorrection";
// import PanStatus from "../components/DashBoard/PanStatus";
// import PanTransactionReport from "../components/DashBoard/PanTransactionReport";
// import PanTransactionRefundReport from "../components/DashBoard/PanTransactionRefundReport";
// import PanTransactionResumeReport from "../components/DashBoard/PanTransactionResumeReport";
// import DthRecharge from "../components/DashBoard/DthRecharge";
// import AadharLinkingStatus from "../components/DashBoard/AadharLinkingStatus";
// import TrainingVideo from "../components/DashBoard/TrainingVideo";
// import StepVerification from "../components/DashBoard/StepVerification";
// import UTIPanTransactionReport from "../components/DashBoard/UTIPanTransactionReport";
// import UTIRetailerIdActivate from "../components/DashBoard/UTIRetailerIdActivate";
// import UTIPasswordReset from "../components/DashBoard/UTIPasswordReset";
// import UTICouponHistory from "../components/DashBoard/UTICouponHistory";
// import PanDocumentUpload from "../components/DashBoard/PanDocumentUpload";
// import PanUploadedDocsList from "../components/DashBoard/PanUploadedDocsList";
// import ImportantLink from "../components/DashBoard/ImportantLink";
// import AllComplaintsList from "../components/DashBoard/AllComplaintsList";
// import DownloadCertificate from "../components/DashBoard/DownloadCertificate";
// import ChangePassword from "../components/DashBoard/ChangePassword";
// import PrepaidRechargeHistory from "../components/DashBoard/PrepaidRechargeHistory";
// import PostpaidRechargeHistory from "../components/DashBoard/PostpaidRechargeHistory";
// import DTHRechargeHistory from "../components/DashBoard/DTHRechargeHistory";
// import RechargeRefundReport from "../components/DashBoard/RechargeRefundReport";
// import MyCommission from "../components/DashBoard/MyCommission";
// import Tool from "../components/DashBoard/Tool";
// import OffilnePanCard from "../components/DashBoard/OffilnePanCard";
// import PanForm from "../components/DashBoard/PanForm";
// import AllPanForm from "../components/DashBoard/AllPanForm";
// import Certificate from "../components/SuperDistributer/Certificate";
// import NewBankID from "../components/DashBoard/NewBankID";
// import PostPaidRecharge from "../components/DashBoard/PostPaidRecharge";
// import DthConnection from "../components/DashBoard/DthConnection";
// import ElectricityRecharge from "../components/DashBoard/ElectricityRecharge";
// import BroadbandRecharge from "../components/DashBoard/BroadbandRecharge";
// import ElectricityHistory from "../components/DashBoard/ElectricityHistory";
// import BroadbandHistory from "../components/DashBoard/BroadbandHistory";
// import PanCardFour from "../components/DashBoard/PanCardFour";
// import NsdlIncomplete from "../components/DashBoard/NsdlIncomplete";
// import NsdlNewPanCardEasySmart from "../components/DashBoard/NsdlNewPanCardEasySmart";
// import RedirectPanForm from "../components/DashBoard/RedirectPanForm";
// import NsdlPanCorrectionEasySmart from "../components/DashBoard/NsdlPanCorrectionEasySmart";
// import RedirectionCorrectionPanForm from "../components/DashBoard/RedirectionCorrectionPanForm";
// import NsdlNewPanCardZlink from "../components/DashBoard/NsdlNewPanCardZlink";
// import NsdlPanCorrectionZlink from "../components/DashBoard/NsdlPanCorrectionZlink";
// import NsdlIncompletePanZlink from "../components/DashBoard/NsdlIncompletePanZlink";
// import IncompletePanFormZlink from "../components/DashBoard/IncompletePanFormZlink";
// import PanFourHistory from "../components/DashBoard/PanFourHistory";
// import UtiPanNew from "../components/DashBoard/UtiPanNew";
// import DemoRegistration from "../components/DashBoard/DemoRegistration";
// import EdistrictForm from "../components/DashBoard/EdistrictForm";
// import CreatePin from "../components/DashBoard/CreatePin";
// import BankHistory from "../components/DashBoard/BankHistory";
// import Edistrict from "../components/DashBoard/Edistrict";
// import SambalForm from "../components/DashBoard/SambalForm";
// import VerifyEdistrict from "../components/DashBoard/VerifyEdistrict";
// import VerifyDistrictHistory from "../components/DashBoard/VerifyDistrictHistory";
// import SambalHistory from "../components/DashBoard/SambalHistory";
// import DTHConnectionHistroy from "../components/DashBoard/DTHConnectionHistroy";
// import NSDLPanComponent from "../components/DashBoard/NSDLPanComponent";
// import NSDLPANCorrectionComponent from "../components/DashBoard/NSDLPANCorrectionComponent";
// import { useSelector } from "react-redux";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { clearUser } from "../redux/user/userSlice";
import Payment from "../pages/Payment";
import NotFound from "../components/NotFound";
// import UTIRetailerIdActivateComponent from "../components/DashBoard/UTIRetailerIdActivateComponent";
// import UTIPanLoginComponent from "../components/DashBoard/UTIPanLoginComponent";
// import NSDLPanStatusComponent from "../components/DashBoard/NSDLPanStatusComponent";
// import NSDLIncompletePanCompoent from "../components/DashBoard/NSDLIncompletePanCompoent";

// Lazy load all components
const LoginBitspan = lazy(() => import("../components/LoginBitspan"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MultiStepForm = lazy(() =>
  import("../components/PanCardForm/MultiStepForm")
);
const Profile = lazy(() => import("../pages/Profile"));
const DTHConnectionHistroy = lazy(() =>
  import("../components/DashBoard/DTHConnectionHistroy")
);
const NSDLPanComponent = lazy(() =>
  import("../components/DashBoard/NSDLPanComponent")
);
const NSDLPANCorrectionComponent = lazy(() =>
  import("../components/DashBoard/NSDLPANCorrectionComponent")
);
const NSDLIncompletePanCompoent = lazy(() =>
  import("../components/DashBoard/NSDLIncompletePanCompoent")
);
const NSDLPanStatusComponent = lazy(() =>
  import("../components/DashBoard/NSDLPanStatusComponent")
);
const UTIPanLoginComponent = lazy(() =>
  import("../components/DashBoard/UTIPanLoginComponent")
);
const UTIRetailerIdActivateComponent = lazy(() =>
  import("../components/DashBoard/UTIRetailerIdActivateComponent")
);
const MobileRecharge = lazy(() =>
  import("../components/DashBoard/MobileRecharge")
);
const Complaints = lazy(() => import("../components/DashBoard/Complaints"));
const UtiPan = lazy(() => import("../components/DashBoard/UtiPan"));
const AddMoney = lazy(() => import("../components/DashBoard/AddMoney"));
const AddMoneyOffline = lazy(() =>
  import("../components/DashBoard/AddMoneyOffline")
);
const AddWalletSummary = lazy(() =>
  import("../components/DashBoard/AddWalletSummary")
);
const AddWalletOfflineSummary = lazy(() =>
  import("../components/DashBoard/AddWalletOfflineSummary")
);
const WalletTransactionReport = lazy(() =>
  import("../components/DashBoard/WalletTransactionReport")
);
const NsdlNewPanCard = lazy(() =>
  import("../components/DashBoard/NsdlNewPanCard")
);
const NsdlPanCorrection = lazy(() =>
  import("../components/DashBoard/NsdlPanCorrection")
);
const PanStatus = lazy(() => import("../components/DashBoard/PanStatus"));
const PanTransactionReport = lazy(() =>
  import("../components/DashBoard/PanTransactionReport")
);
const PanTransactionRefundReport = lazy(() =>
  import("../components/DashBoard/PanTransactionRefundReport")
);
const PanTransactionResumeReport = lazy(() =>
  import("../components/DashBoard/PanTransactionResumeReport")
);
const DthRecharge = lazy(() => import("../components/DashBoard/DthRecharge"));
const AadharLinkingStatus = lazy(() =>
  import("../components/DashBoard/AadharLinkingStatus")
);
const TrainingVideo = lazy(() =>
  import("../components/DashBoard/TrainingVideo")
);
const StepVerification = lazy(() =>
  import("../components/DashBoard/StepVerification")
);
const UTIPanTransactionReport = lazy(() =>
  import("../components/DashBoard/UTIPanTransactionReport")
);
const UTIRetailerIdActivate = lazy(() =>
  import("../components/DashBoard/UTIRetailerIdActivate")
);
const UTIPasswordReset = lazy(() =>
  import("../components/DashBoard/UTIPasswordReset")
);
const UTICouponHistory = lazy(() =>
  import("../components/DashBoard/UTICouponHistory")
);
const PanDocumentUpload = lazy(() =>
  import("../components/DashBoard/PanDocumentUpload")
);
const PanUploadedDocsList = lazy(() =>
  import("../components/DashBoard/PanUploadedDocsList")
);
const ImportantLink = lazy(() =>
  import("../components/DashBoard/ImportantLink")
);
const AllComplaintsList = lazy(() =>
  import("../components/DashBoard/AllComplaintsList")
);
const DownloadCertificate = lazy(() =>
  import("../components/DashBoard/DownloadCertificate")
);
const ChangePassword = lazy(() =>
  import("../components/DashBoard/ChangePassword")
);
const PrepaidRechargeHistory = lazy(() =>
  import("../components/DashBoard/PrepaidRechargeHistory")
);
const PostpaidRechargeHistory = lazy(() =>
  import("../components/DashBoard/PostpaidRechargeHistory")
);
const DTHRechargeHistory = lazy(() =>
  import("../components/DashBoard/DTHRechargeHistory")
);
const RechargeRefundReport = lazy(() =>
  import("../components/DashBoard/RechargeRefundReport")
);
const MyCommission = lazy(() => import("../components/DashBoard/MyCommission"));
const Tool = lazy(() => import("../components/DashBoard/Tool"));
const OffilnePanCard = lazy(() =>
  import("../components/DashBoard/OffilnePanCard")
);
const PanForm = lazy(() => import("../components/DashBoard/PanForm"));
const AllPanForm = lazy(() => import("../components/DashBoard/AllPanForm"));
const Certificate = lazy(() =>
  import("../components/SuperDistributer/Certificate")
);
const NewBankID = lazy(() => import("../components/DashBoard/NewBankID"));
const PostPaidRecharge = lazy(() =>
  import("../components/DashBoard/PostPaidRecharge")
);
const DthConnection = lazy(() =>
  import("../components/DashBoard/DthConnection")
);
const ElectricityRecharge = lazy(() =>
  import("../components/DashBoard/ElectricityRecharge")
);
const BroadbandRecharge = lazy(() =>
  import("../components/DashBoard/BroadbandRecharge")
);
const ElectricityHistory = lazy(() =>
  import("../components/DashBoard/ElectricityHistory")
);
const BroadbandHistory = lazy(() =>
  import("../components/DashBoard/BroadbandHistory")
);
const PanCardFour = lazy(() => import("../components/DashBoard/PanCardFour"));
const NsdlIncomplete = lazy(() =>
  import("../components/DashBoard/NsdlIncomplete")
);
const NsdlNewPanCardEasySmart = lazy(() =>
  import("../components/DashBoard/NsdlNewPanCardEasySmart")
);
const RedirectPanForm = lazy(() =>
  import("../components/DashBoard/RedirectPanForm")
);
const NsdlPanCorrectionEasySmart = lazy(() =>
  import("../components/DashBoard/NsdlPanCorrectionEasySmart")
);
const RedirectionCorrectionPanForm = lazy(() =>
  import("../components/DashBoard/RedirectionCorrectionPanForm")
);
const NsdlNewPanCardZlink = lazy(() =>
  import("../components/DashBoard/NsdlNewPanCardZlink")
);
const NsdlPanCorrectionZlink = lazy(() =>
  import("../components/DashBoard/NsdlPanCorrectionZlink")
);
const NsdlIncompletePanZlink = lazy(() =>
  import("../components/DashBoard/NsdlIncompletePanZlink")
);
const IncompletePanFormZlink = lazy(() =>
  import("../components/DashBoard/IncompletePanFormZlink")
);
const PanFourHistory = lazy(() =>
  import("../components/DashBoard/PanFourHistory")
);
const UtiPanNew = lazy(() => import("../components/DashBoard/UtiPanNew"));
const DemoRegistration = lazy(() =>
  import("../components/DashBoard/DemoRegistration")
);
const EdistrictForm = lazy(() =>
  import("../components/DashBoard/EdistrictForm")
);
const CreatePin = lazy(() => import("../components/DashBoard/CreatePin"));
const BankHistory = lazy(() => import("../components/DashBoard/BankHistory"));
const Edistrict = lazy(() => import("../components/DashBoard/Edistrict"));
const SambalForm = lazy(() => import("../components/DashBoard/SambalForm"));
const VerifyEdistrict = lazy(() =>
  import("../components/DashBoard/VerifyEdistrict")
);
const VerifyDistrictHistory = lazy(() =>
  import("../components/DashBoard/VerifyDistrictHistory")
);
const SambalHistory = lazy(() =>
  import("../components/DashBoard/SambalHistory")
);
const CoupanForm = lazy(() => import("../components/DashBoard/CoupanForm"));
const RtAllCommissionHistory = lazy(() =>
  import("../components/DashBoard/RtAllCommissionHistory")
);

const RetailerRoutes = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;

  // console.log(userStatus);
  // console.log(token);

  const pathname = window.location.pathname;
  const fullUrl = window.location.href;
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  // const userStatus = currentUser?.Status;
  console.log(fullUrl);

  // Logging the current user and token for debugging
  console.log("Current User:", currentUser);
  console.log("Token:", token);
  // console.log(currentUser.Status);
  // UseEffect hook to call the API once when the component mounts
  useEffect(() => {
    if (currentUser?.userId && token) {
      console.log("api call");
      fetchUserData();
    } else {
      console.log("Missing userId or token, cannot fetch data.");
    }
  }, [currentUser, token, fullUrl]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/superDistributor/getUserDetails/${currentUser?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Details:", response.data?.data);
      const userStatus = response.data?.data?.Status; // API response se status fetch kar rahe hain
      const PaymentStatus = response.data?.data?.payment_status;
      setUser(response.data?.data);
      if (userStatus == "Deactive") {
        Swal.fire({
          icon: "error",
          title: "User Deactive",
          text: "Please contact Admin!",
        });
        dispatch(clearUser());
        navigate("/");
      } else if (PaymentStatus == "Pending") {
        Swal.fire({
          icon: "error",
          title: "User Payment is Pending",
          text: "Please Make Payment First Or Contact Admin if Payment Done",
        });
        // dispatch(clearUser());

        navigate("/payment");
      } else if (userStatus == "Pending") {
        Swal.fire({
          icon: "error",
          title: "User KYC is Pending",
          text: "Please Update KYC details First Or Contact Admin if Already Submitted Kyc details",
        });
        // dispatch(clearUser());
        navigate("/update-profile");
      }

      setStatus(userStatus); // Status ko state mein set karenge
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show Loading State Before Redirects
  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Wrapper>
    );
  }

  console.log("Current User:", currentUser);

  // const [userRelation, setUserRelation] = useState([]);

  // useEffect(() => {
  //   const fetchUserRelation = async () => {
  //     try {
  //       const resposne = await axios.get(
  //         `https://2kadam.co.in/api/auth/superAdmin/getUserRelations/${currentUser.userId}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const userData = resposne.data.data;
  //       setUserRelation(userData);
  //       console.log(userData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUserRelation();
  // }, [currentUser.userId]);

  // console.log(userRelation);

  return (
    <>
      <Wrapper>
        <Suspense
          fallback={
            <div className="loading-container">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        >
          <Routes>
            {/* <Route path="/" element={<LoginBitspan />} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/payment" element={<Payment user={user} />} />
            <Route path="/update-profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pan-card-apply" element={<MultiStepForm />} />
            <Route path="/prepaid-recharge" element={<MobileRecharge />} />
            <Route path="/postpaid-recharge" element={<PostPaidRecharge />} />
            <Route
              path="/electricity-recharge"
              element={<ElectricityRecharge />}
            />
            <Route path="/broadband-recharge" element={<BroadbandRecharge />} />
            <Route path="/raise-complaint" element={<Complaints />} />
            <Route path="/uti-login" element={<UtiPan />} />
            <Route path="/add-money" element={<AddMoney />} />
            <Route
              path="/add-wallet-money-offline"
              element={<AddMoneyOffline />}
            />
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
            {/* <Route
              path="/pan-apply-49"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <NsdlNewPanCard />
                )
              }
            /> */}
            <Route path="/pan-apply-49" element={<NSDLPanComponent />} />
            {/* <Route
              path="/pan-apply-cr"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <NsdlPanCorrection />
                )
              }
            /> */}
            <Route
              path="/pan-apply-cr"
              element={<NSDLPANCorrectionComponent />}
            />
            {/* <Route
              path="/pan-status"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <PanStatus />
                )
              }
            /> */}
            <Route path="/pan-status" element={<NSDLPanStatusComponent />} />

            {/* easy smart route */}
            <Route
              path="/nsdl-new-pan-card"
              element={<NsdlNewPanCardEasySmart />}
            />
            <Route
              path="/nsdl-new-pan-card-redirect"
              element={<RedirectPanForm />}
            />
            <Route path="/easySmartNsdlPANCallback" element={<Dashboard />} />

            <Route
              path="/nsdl-correction-pan-card"
              element={<NsdlPanCorrectionEasySmart />}
            />
            <Route
              path="/nsdl-correction-pan-card-redirect"
              element={<RedirectionCorrectionPanForm />}
            />

            {/* easy smart route */}

            {/* Zlink Pan route */}
            <Route
              path="/nsdl-new-pan-card-2"
              element={<NsdlNewPanCardZlink />}
            />
            {/* <Route path="/nsdl-new-pan-card-redirect" element={<RedirectPanForm />} /> */}
            {/* <Route path="/easySmartNsdlPANCallback" element={<Dashboard />} /> */}

            <Route
              path="/nsdl-correction-pan-card-2"
              element={<NsdlPanCorrectionZlink />}
            />
            {/* <Route path="/nsdl-correction-pan-card-redirect" element={<RedirectionCorrectionPanForm />} />  */}

            {/* Zlink Pan route */}

            <Route
              path="/pan-transaction-report"
              element={<PanTransactionReport />}
            />
            <Route
              path="/pan-transaction-refund-report"
              element={<PanTransactionRefundReport />}
            />
            {/* <Route
              path="/pan-transaction-resume-report"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <PanTransactionResumeReport />
                )
              }
            /> */}
            <Route path="/raise-complaint" element={<Complaints />} />
            <Route path="/add-money" element={<AddMoney />} />
            <Route path="/uti-login" element={<UtiPan />} />
            {/* <Route
              path="/uti-login-new"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <UtiPanNew />
                )
              }
            /> */}
            <Route path="/uti-login-new" element={<UTIPanLoginComponent />} />
            <Route path="/dth-recharge" element={<DthRecharge />} />
            <Route path="/dth-connection" element={<DthConnection />} />
            <Route
              path="/apply-dth-connection-history"
              element={<DTHConnectionHistroy />}
            />
            <Route
              path="/aadhar-linking-status"
              element={<AadharLinkingStatus />}
            />
            <Route path="/training-video" element={<TrainingVideo />} />
            {/* <Route
              path="/2-step-verification"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <StepVerification />
                )
              }
            /> */}
            <Route
              path="/uti-transaction-report"
              element={<UTIPanTransactionReport />}
            />
            {/* <Route
              path="/retailer-id-revamp-activate"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <UTIRetailerIdActivate />
                )
              }
            /> */}
            <Route
              path="/retailer-id-revamp-activate"
              element={<UTIRetailerIdActivateComponent />}
            />
            <Route path="/password-reset" element={<UTIPasswordReset />} />
            <Route path="/uti-coupon-history" element={<UTICouponHistory />} />
            <Route
              path="/pan-document-upload"
              element={<PanDocumentUpload />}
            />
            <Route path="/pan-document" element={<PanUploadedDocsList />} />
            <Route path="/important-links" element={<ImportantLink />} />
            <Route
              path="/complaint-raised-list"
              element={<AllComplaintsList />}
            />
            <Route
              path="/download-certificate"
              element={<DownloadCertificate />}
            />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/prepaid-recharge-history"
              element={<PrepaidRechargeHistory />}
            />
            <Route
              path="/postpaid-recharge-history"
              element={<PostpaidRechargeHistory />}
            />
            <Route
              path="/dth-recharge-history"
              element={<DTHRechargeHistory />}
            />
            <Route
              path="/eletricity-recharge-history"
              element={<ElectricityHistory />}
            />
            <Route
              path="/broadband-recharge-history"
              element={<BroadbandHistory />}
            />
            {/* <Route
              path="/recharge-refund-report"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <RechargeRefundReport />
                )
              }
            /> */}
            <Route path="/my-commission" element={<MyCommission />} />
            <Route path="/crop-tool" element={<Tool />} />
            <Route
              path="/download-offline-forms"
              element={<OffilnePanCard />}
            />
            <Route path="/apply-offline" element={<PanForm />} />
            <Route path="/view-all-offline-history" element={<AllPanForm />} />
            <Route
              path="/download-certificate-print"
              element={
                <Certificate
                  user="RETAILER"
                  name={currentUser?.username}
                  address={`${currentUser?.City}, ${currentUser?.State}, ${currentUser?.PinCode}`}
                  date={new Date(currentUser?.CreateAt)}
                  id={currentUser?.userId}
                />
              }
            />
            <Route path="/bank-id" element={<NewBankID />} />
            <Route path="/pan-card-4.0" element={<PanCardFour />} />
            {/* <Route
              path="/incomplete-request"
              element={
                userStatus === "Pending" || userStatus === "Deactive" ? (
                  <Navigate to="/update-profile" />
                ) : (
                  <NsdlIncomplete />
                )
              }
            /> */}
            <Route
              path="/incomplete-request"
              element={<NSDLIncompletePanCompoent />}
            />

            <Route
              path="/incomplete-request-zlink"
              element={<NsdlIncompletePanZlink />}
            />
            <Route
              path="/redirect-incomplete-pan-zlink"
              element={<IncompletePanFormZlink />}
            />

            <Route path="/pan-4.0-history" element={<PanFourHistory />} />

            <Route path="/E-District-Form" element={<EdistrictForm />} />

            <Route path="/generate-pin" element={<CreatePin />} />

            <Route path="/bank-history" element={<BankHistory />} />

            <Route path="/E-District-history" element={<Edistrict />} />

            <Route path="/SambalForm" element={<SambalForm />} />

            <Route path="/verify-Edistrict" element={<VerifyEdistrict />} />

            <Route
              path="/verify-Edistrict-History"
              element={<VerifyDistrictHistory />}
            />

            <Route path="/Sambal-History" element={<SambalHistory />} />

            <Route path="/buy-coupon" element={<CoupanForm />} />

            <Route
              path="/View-All-Commission-History"
              element={<RtAllCommissionHistory />}
            />

            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<NotFound />} /> */}

            <Route path="/registration-page" element={<DemoRegistration />} />
          </Routes>
        </Suspense>
      </Wrapper>
    </>
  );
};

export default RetailerRoutes;
const Wrapper = styled.div`
  .loading-container {
    position: fixed; /* Sticks to the viewport */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /* Horizontally centers the content */
    align-items: center; /* Vertically centers the content */
    /* background-color: rgba(
      255,
      255,
      255,
      0.8
    );  */
    z-index: 9999;
    background-color: transparent;
  }
`;
