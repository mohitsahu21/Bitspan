import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import Swal from "sweetalert2";

// Lazy-loaded components

const AadharLinkingStatus = lazy(() =>
  import("../components/DashBoard/AadharLinkingStatus")
);

const TrainingVideo = lazy(() =>
  import("../components/DashBoard/TrainingVideo")
);

const Profile = lazy(() => import("../pages/Profile"));

const WLTrainingVideo = lazy(() =>
  import("../components/WhiteLabel/WLTrainingVideo")
);

const WhiteLabelDashboard = lazy(() => import("../pages/WhiteLabelDashboard"));

const WLWalletTransactionReport = lazy(() =>
  import("../components/WhiteLabel/WLWalletTransactionReport")
);

const WLAllOfflineForm = lazy(() =>
  import("../components/WhiteLabel/WLAllOfflineForm")
);
const WLStepVerification = lazy(() =>
  import("../components/WhiteLabel/WLStepVerification")
);

const WLUTIPanTransactionReport = lazy(() =>
  import("../components/WhiteLabel/WLUTIPanTransactionReport")
);

const WLDistributeCoupon = lazy(() =>
  import("../components/WhiteLabel/WLDistributeCoupon")
);

const WLUTICouponHistory = lazy(() =>
  import("../components/WhiteLabel/WLUTICouponHistory")
);

const WLPanTransactionReport = lazy(() =>
  import("../components/WhiteLabel/WLPanTransactionReport")
);

const WLActiveUsersList = lazy(() =>
  import("../components/WhiteLabel/WLActiveUsersList")
);

const WLDeactiveUsersList = lazy(() =>
  import("../components/WhiteLabel/WLDeactiveUsersList")
);

const WLAllUsersJoinedList = lazy(() =>
  import("../components/WhiteLabel/WLAllUsersJoinedList")
);

const WLWebUsersJoinedList = lazy(() =>
  import("../components/WhiteLabel/WLWebUsersJoinedList")
);

const WLContactUs = lazy(() => import("../components/WhiteLabel/WLContactUs"));

const WLChangePrice = lazy(() =>
  import("../components/WhiteLabel/WLChangePrice")
);

const WLComplaints = lazy(() =>
  import("../components/WhiteLabel/WLComplaints")
);

const WLAllComplaintsList = lazy(() =>
  import("../components/WhiteLabel/WLAllComplaintsList")
);

const WLDownloadCertificate = lazy(() =>
  import("../components/WhiteLabel/WLDownloadCertificate")
);

const WLChangePassword = lazy(() =>
  import("../components/WhiteLabel/WLChangePassword")
);

const WLBankAccountSetup = lazy(() =>
  import("../components/WhiteLabel/WLBankAccountSetup")
);

const WLBankAccountVerify = lazy(() =>
  import("../components/WhiteLabel/WLBankAccountVerify")
);

const WLWalletWithdraw = lazy(() =>
  import("../components/WhiteLabel/WLWalletWithdraw")
);

const WLFundTransferStatus = lazy(() =>
  import("../components/WhiteLabel/WLFundTransferStatus")
);

const Certificate = lazy(() =>
  import("../components/SuperDistributer/Certificate")
);

const WebsiteSetting = lazy(() =>
  import("../components/WhiteLabel/WebsiteSetting")
);

const CreateWhiteLabel = lazy(() =>
  import("../components/WhiteLabel/CreateWhiteLabel")
);

const BuyUserId = lazy(() => import("../components/WhiteLabel/BuyUserId"));

const CreateSuperDistributor = lazy(() =>
  import("../components/WhiteLabel/CreateSuperDistributor")
);

const WLPendingPaymentUsers = lazy(() =>
  import("../components/WhiteLabel/WLPendingPaymentUsers")
);

const WhiteLabelJoiningList = lazy(() =>
  import("../components/WhiteLabel/WhiteLabelJoiningList")
);

const BuyUserIdSummary = lazy(() =>
  import("../components/WhiteLabel/BuyUserIdSummary")
);

const ChangeIdSetRate = lazy(() =>
  import("../components/WhiteLabel/ChangeIdSetRate")
);

const ChangeUTINewCouponPrice = lazy(() =>
  import("../components/WhiteLabel/ChangeUTINewCouponPrice")
);

const ChangeNSDLPrice = lazy(() =>
  import("../components/WhiteLabel/ChangeNSDLPrice")
);

const ChangeUTIPanPrice = lazy(() =>
  import("../components/WhiteLabel/ChangeUTIPanPrice")
);

const WLWalletToWalletTransfer = lazy(() =>
  import("../components/WhiteLabel/WLWalletToWalletTransfer")
);

const WLWalletWithdrawReport = lazy(() =>
  import("../components/WhiteLabel/WLWalletWithdrawReport")
);

const WLSambalHistory = lazy(() =>
  import("../components/WhiteLabel/WLSambalHistory")
);

const WLOfflineDthConnection = lazy(() =>
  import("../components/WhiteLabel/WLOfflineDthConnection")
);

const WLOfflineRechargeHistory = lazy(() =>
  import("../components/WhiteLabel/WLOfflineRechargeHistory")
);

const WLMyCommission = lazy(() =>
  import("../components/WhiteLabel/WLMyCommission")
);

const WLAllCommissionHistory = lazy(() =>
  import("../components/WhiteLabel/WLAllCommissionHistory")
);

const WLOnlineDthConnection = lazy(() =>
  import("../components/WhiteLabel/WLOnlineDthConnection")
);

const WLOnlineRecharges = lazy(() =>
  import("../components/WhiteLabel/WLOnlineRecharges")
);

const WLEdistrict = lazy(() => import("../components/WhiteLabel/WLEdistrict"));

const WLVerifyDistrictHistory = lazy(() =>
  import("../components/WhiteLabel/WLVerifyDistrictHistory")
);

const WLCoupanCommissionHistory = lazy(() =>
  import("../components/WhiteLabel/WLCoupanCommissionHistory")
);

const WLPanFourHistory = lazy(() =>
  import("../components/WhiteLabel/WLPanFourHistory")
);

const WLPanCorrectionHistory = lazy(() =>
  import("../components/WhiteLabel/WLPanCorrectionHistory")
);

const WLPendingKycUsers = lazy(() =>
  import("../components/WhiteLabel/WLPendingKycUsers")
);

const WLCreatePin = lazy(() => import("../components/WhiteLabel/WLCreatePin"));

const WLTransferId = lazy(() =>
  import("../components/WhiteLabel/WLTransferId")
);

const WLShareIDsSummary = lazy(() =>
  import("../components/WhiteLabel/WLShareIDsSummary")
);

const WLCreateDistributor = lazy(() =>
  import("../components/WhiteLabel/WLCreateDistributor")
);

const WLCreateRetailer = lazy(() =>
  import("../components/WhiteLabel/WLCreateRetailer")
);

const WLCreatedUsers = lazy(() =>
  import("../components/WhiteLabel/WLCreatedUsers")
);

const WLBoughtSummery = lazy(() =>
  import("../components/WhiteLabel/WLBoughtSummery")
);

const WhiteLabelRoutes = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const userStatus = currentUser?.Status;
  const userId = currentUser?.userId;

  const pathname = window.location.pathname;
  const fullUrl = window.location.href;
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  // const userStatus = currentUser?.Status;

  // Logging the current user and token for debugging
  console.log("Current User:", currentUser);
  console.log("Token:", token);
  console.log(status);
  // UseEffect hook to call the API once when the component mounts
  useEffect(() => {
    if (currentUser?.userId && token) {
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

  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashboard" element={<WhiteLabelDashboard />} />
        <Route path="/update-profile" element={<Profile />} />

        <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        />
        <Route path="/training-video" element={<TrainingVideo />} />

        <Route path="/WL-training-video" element={<WLTrainingVideo />} />

        <Route
          path="/wallet-transaction-report"
          element={<WLWalletTransactionReport />}
        />

        <Route
          path="/wallet-to-wallet-transfer"
          element={<WLWalletToWalletTransfer />}
        />

        <Route
          path="/Wallet-TO-Wallet-Transfer-History"
          element={<WLFundTransferStatus />}
        />

        <Route
          path="/view-all-offline-history"
          element={<WLAllOfflineForm />}
        />

        <Route
          path="/Offline-dth-connection"
          element={<WLOfflineDthConnection />}
        />

        <Route
          path="/Offline-Recharge-history"
          element={<WLOfflineRechargeHistory />}
        />

        <Route path="/Sambal-History" element={<WLSambalHistory />} />

        <Route path="/2-step-verification" element={<WLStepVerification />} />
        <Route path="/website-setting" element={<WebsiteSetting />} />

        <Route path="/my-commission" element={<WLMyCommission />} />

        <Route
          path="/View-All-Commission-History"
          element={<WLAllCommissionHistory />}
        />

        <Route
          path="/online-dth-connection-history"
          element={<WLOnlineDthConnection />}
        />

        <Route
          path="/online-recharge-history"
          element={<WLOnlineRecharges />}
        />

        <Route path="/E-District-history" element={<WLEdistrict />} />

        <Route
          path="/verify-Edistrict-History"
          element={<WLVerifyDistrictHistory />}
        />

        <Route
          path="/Pan-Coupan-History"
          element={<WLCoupanCommissionHistory />}
        />

        <Route path="/pan-4.0-history" element={<WLPanFourHistory />} />

        <Route
          path="/create-super-distributor"
          element={<CreateSuperDistributor />}
        />
        <Route path="/create-white-label" element={<CreateWhiteLabel />} />
        <Route path="/Transfer-IDs" element={<WLTransferId />} />
        <Route path="/Transfer-IDs-Summary" element={<WLShareIDsSummary />} />
        <Route path="/create-retailer" element={<WLCreateRetailer />} />
        <Route path="/create-distributor" element={<WLCreateDistributor />} />
        <Route path="/Created-Users" element={<WLCreatedUsers />} />
        <Route path="/buy-id" element={<BuyUserId />} />
        <Route path="/UserId-Bought-summary" element={<WLBoughtSummery />} />

        <Route
          path="/uti-transaction-report"
          element={<WLUTIPanTransactionReport />}
        />

        <Route path="/distribute-uti-coupon" element={<WLDistributeCoupon />} />

        <Route path="/uti-coupon-history" element={<WLUTICouponHistory />} />

        <Route path="/active-users" element={<WLActiveUsersList />} />
        <Route path="/deactive-users" element={<WLDeactiveUsersList />} />
        <Route path="/users-joining-list" element={<WLAllUsersJoinedList />} />

        <Route
          path="/website-users-joining-list"
          element={<WLWebUsersJoinedList />}
        />

        <Route path="/Contact-Us" element={<WLContactUs />} />

        <Route
          path="/pending-payment-users"
          element={<WLPendingPaymentUsers />}
        />
        <Route
          path="/white-label-joining-list"
          element={<WhiteLabelJoiningList />}
        />

        <Route path="/pending-kyc-user" element={<WLPendingKycUsers />} />

        <Route path="/buy-user-id-summary" element={<BuyUserIdSummary />} />
        <Route
          path="/pan-transaction-report"
          element={<WLPanTransactionReport />}
        />

        <Route
          path="/pan-correction-report"
          element={<WLPanCorrectionHistory />}
        />

        <Route path="/change-price" element={<WLChangePrice />} />
        <Route path="/raise-complaint" element={<WLComplaints />} />
        <Route
          path="/complaint-raised-list"
          element={<WLAllComplaintsList />}
        />
        <Route
          path="/download-certificate"
          element={<WLDownloadCertificate />}
        />
        <Route path="/change-coupon-price" element={<ChangeIdSetRate />} />
        <Route path="/change-nsdl-price" element={<ChangeNSDLPrice />} />
        <Route path="/change-uti-price" element={<ChangeUTIPanPrice />} />
        <Route
          path="/change-uti-new-price"
          element={<ChangeUTINewCouponPrice />}
        />
        <Route path="/change-password" element={<WLChangePassword />} />
        <Route path="/bank-account-setup" element={<WLBankAccountSetup />} />
        <Route
          path="/bank-account-setup/:bank_id/:bid"
          element={<WLBankAccountVerify />}
        />
        <Route path="/wallet-withdraw" element={<WLWalletWithdraw />} />

        <Route
          path="/wallet-withdraw-History"
          element={<WLWalletWithdrawReport />}
        />

        <Route
          path="/fund-transfer-status"
          element={<WLFundTransferStatus />}
        />

        <Route path="/generate-pin" element={<WLCreatePin />} />
        <Route
          path="/download-certificate-print"
          element={
            <Certificate
              user="WHITE LABEL"
              // name={currentUser?.username}
              name={currentUser?.username?.toUpperCase()}
              address={`${currentUser?.City}, ${currentUser?.State}, ${currentUser?.PinCode}`}
              date={currentUser?.CreateAt}
              id={currentUser?.userId}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default WhiteLabelRoutes;
