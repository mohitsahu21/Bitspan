import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import axios from "axios";

// Lazy-loaded components
const SuperDistributerDashboard = lazy(() =>
  import("../pages/SuperDistributerDashboard")
);
const SdWalletTransactionReport = lazy(() =>
  import("../components/SuperDistributer/SdWalletTransactionReport")
);
const SdWalletWithdrawReport = lazy(() =>
  import("../components/SuperDistributer/SdWalletWithdrawReport")
);
const SdStepVerification = lazy(() =>
  import("../components/SuperDistributer/SdStepVerification")
);
const CreateDistributor = lazy(() =>
  import("../components/SuperDistributer/CreateDistributor")
);
const AllDistributorList = lazy(() =>
  import("../components/SuperDistributer/AllDistributorList")
);
const SdBuyDistributorId = lazy(() =>
  import("../components/SuperDistributer/SdBuyDistributorId")
);
const SdBoughtSummery = lazy(() =>
  import("../components/SuperDistributer/SdBoughtSummery")
);
const SdUTIPanTransactionReport = lazy(() =>
  import("../components/SuperDistributer/SdUTIPanTransactionReport")
);
const SdDistributeCoupon = lazy(() =>
  import("../components/SuperDistributer/SdDistributeCoupon")
);
const SdUTICouponHistory = lazy(() =>
  import("../components/SuperDistributer/SdUTICouponHistory")
);
const SdPanTransactionReport = lazy(() =>
  import("../components/SuperDistributer/SdPanTransactionReport")
);
const AadharLinkingStatus = lazy(() =>
  import("../components/DashBoard/AadharLinkingStatus")
);
const TrainingVideo = lazy(() =>
  import("../components/DashBoard/TrainingVideo")
);
const SdAllOfflineForm = lazy(() =>
  import("../components/SuperDistributer/SdAllOfflineForm")
);
const SdAllCommissionHistory = lazy(() =>
  import("../components/SuperDistributer/SdAllCommissionHistory")
);
const SdCoupanCommissionHistory = lazy(() =>
  import("../components/SuperDistributer/SdCoupanCommissionHistory")
);
const SdSambalHistory = lazy(() =>
  import("../components/SuperDistributer/SdSambalHistory")
);
const SdProfile = lazy(() =>
  import("../components/SuperDistributer/SdProfile")
);
const SdActiveUsersList = lazy(() =>
  import("../components/SuperDistributer/SdActiveUsersList")
);
const SdDeactiveUsersList = lazy(() =>
  import("../components/SuperDistributer/SdDeactiveUsersList")
);
const SdPendingKycUsers = lazy(() =>
  import("../components/SuperDistributer/SdPendingKycUsers")
);
const SdPendingPaymentUsers = lazy(() =>
  import("../components/SuperDistributer/SdPendingPaymentUsers")
);
const SdAllUsersJoinedList = lazy(() =>
  import("../components/SuperDistributer/SdAllUsersJoinedList")
);
const SdPrepaidRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdPrepaidRechargeHistory")
);
const SdPostpaidRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdPostpaidRechargeHistory")
);

const SdDTHRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdDTHRechargeHistory")
);
const SdElectricityHistory = lazy(() =>
  import("../components/SuperDistributer/SdElectricityHistory")
);

const SdBroadbandHistory = lazy(() =>
  import("../components/SuperDistributer/SdBroadbandHistory ")
);
const SdRechargeRefundReport = lazy(() =>
  import("../components/SuperDistributer/SdRechargeRefundReport")
);
const SdMyCommission = lazy(() =>
  import("../components/SuperDistributer/SdMyCommission")
);
const SdEdistrict = lazy(() =>
  import("../components/SuperDistributer/SdEdistrict")
);
const SdVerifyDistrictHistory = lazy(() =>
  import("../components/SuperDistributer/SdVerifyDistrictHistory")
);
const SdPanFourHistory = lazy(() =>
  import("../components/SuperDistributer/SdPanFourHistory")
);

const SdPanCorrectionHistory = lazy(() =>
  import("../components/SuperDistributer/SdPanCorrectionHistory")
);
const SdOfflineRechargeHistory = lazy(() =>
  import("../components/SuperDistributer/SdOfflineRechargeHistory")
);

const SdOfflineDthConnection = lazy(() =>
  import("../components/SuperDistributer/SdOfflineDthConnection")
);
const SdOnlineDthConnection = lazy(() =>
  import("../components/SuperDistributer/SdOnlineDthConnection")
);

const SdOnlineRecharges = lazy(() =>
  import("../components/SuperDistributer/SdOnlineRecharges")
);
const SdComplaints = lazy(() =>
  import("../components/SuperDistributer/SdComplaints")
);
const SdAllComplaintsList = lazy(() =>
  import("../components/SuperDistributer/SdAllComplaintsList")
);
const SdDownloadCertificate = lazy(() =>
  import("../components/SuperDistributer/SdDownloadCertificate")
);
const SdChangePassword = lazy(() =>
  import("../components/SuperDistributer/SdChangePassword")
);
const SdChangePrice = lazy(() =>
  import("../components/SuperDistributer/SdChangePrice")
);
const SdBankAccountSetup = lazy(() =>
  import("../components/SuperDistributer/SdBankAccountSetup")
);
const SdFundTransferStatus = lazy(() =>
  import("../components/SuperDistributer/SdFundTransferStatus")
);
const SdCreatePin = lazy(() =>
  import("../components/SuperDistributer/SdCreatePin")
);
const Certificate = lazy(() =>
  import("../components/SuperDistributer/Certificate")
);
const SdBankAccountVerify = lazy(() =>
  import("../components/SuperDistributer/SdBankAccountVerify")
);
const SdWalletWithdraw = lazy(() =>
  import("../components/SuperDistributer/SdWalletWithdraw")
);

const SdWalletToWalletTransfer = lazy(() =>
  import("../components/SuperDistributer/SdWalletToWalletTransfer")
);
const Profile = lazy(() => import("../pages/Profile"));

const SuperDistributorRoutes = () => {
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
        <Route path="/dashboard" element={<SuperDistributerDashboard />} />
        <Route path="/" element={<SuperDistributerDashboard />} />
        <Route path="/update-profile" element={<Profile />} />
        <Route
          path="/aadhar-linking-status"
          element={<AadharLinkingStatus />}
        />
        <Route path="/training-video" element={<TrainingVideo />} />
        <Route
          path="/prepaid-recharge-history"
          element={<SdPrepaidRechargeHistory />}
        />
        <Route
          path="/postpaid-recharge-history"
          element={<SdPostpaidRechargeHistory />}
        />

        <Route
          path="/dth-recharge-history"
          element={<SdDTHRechargeHistory />}
        />

        <Route
          path="/eletricity-recharge-history"
          element={<SdElectricityHistory />}
        />
        <Route
          path="/broadband-recharge-history"
          element={<SdBroadbandHistory />}
        />

        <Route
          path="/recharge-refund-report"
          element={<SdRechargeRefundReport />}
        />
        <Route path="/my-commission" element={<SdMyCommission />} />

        <Route path="/E-District-history" element={<SdEdistrict />} />

        <Route
          path="/verify-Edistrict-History"
          element={<SdVerifyDistrictHistory />}
        />

        <Route path="/pan-4.0-history" element={<SdPanFourHistory />} />

        <Route
          path="/pan-correction-report"
          element={<SdPanCorrectionHistory />}
        />

        <Route
          path="/Offline-Recharge-history"
          element={<SdOfflineRechargeHistory />}
        />
        <Route
          path="/wallet-transaction-report"
          element={<SdWalletTransactionReport />}
        />
        <Route
          path="/wallet-withdraw-History"
          element={<SdWalletWithdrawReport />}
        />
        <Route
          path="/view-all-offline-history"
          element={<SdAllOfflineForm />}
        />
        <Route
          path="/View-All-Commission-History"
          element={<SdAllCommissionHistory />}
        />

        <Route
          path="/Pan-Coupan-History"
          element={<SdCoupanCommissionHistory />}
        />

        <Route path="/Sambal-History" element={<SdSambalHistory />} />
        <Route path="/2-step-verification" element={<SdStepVerification />} />
        <Route path="/create-distributor" element={<CreateDistributor />} />

        <Route path="/All-Distributor-List" element={<AllDistributorList />} />
        <Route path="/buy-distributor-id" element={<SdBuyDistributorId />} />
        <Route path="/UserId-Bought-summary" element={<SdBoughtSummery />} />
        <Route
          path="/uti-transaction-report"
          element={<SdUTIPanTransactionReport />}
        />

        <Route
          path="/Offline-dth-connection"
          element={<SdOfflineDthConnection />}
        />

        <Route
          path="/online-dth-connection-history"
          element={<SdOnlineDthConnection />}
        />
        <Route
          path="/online-recharge-history"
          element={<SdOnlineRecharges />}
        />
        <Route path="/distribute-uti-coupon" element={<SdDistributeCoupon />} />
        <Route path="/uti-coupon-history" element={<SdUTICouponHistory />} />
        <Route
          path="/pan-transaction-report"
          element={<SdPanTransactionReport />}
        />
        <Route path="/active-users" element={<SdActiveUsersList />} />
        <Route path="/deactive-users" element={<SdDeactiveUsersList />} />
        <Route path="/pending-kyc-user" element={<SdPendingKycUsers />} />
        <Route
          path="/pending-payment-users"
          element={<SdPendingPaymentUsers />}
        />
        <Route path="/users-joining-list" element={<SdAllUsersJoinedList />} />
        <Route path="/change-price" element={<SdChangePrice />} />
        <Route path="/raise-complaint" element={<SdComplaints />} />
        <Route
          path="/complaint-raised-list"
          element={<SdAllComplaintsList />}
        />
        <Route
          path="/download-certificate"
          element={<SdDownloadCertificate />}
        />
        <Route path="/change-password" element={<SdChangePassword />} />
        <Route path="/bank-account-setup" element={<SdBankAccountSetup />} />
        <Route
          path="/bank-account-setup/verify/:bid"
          element={<SdBankAccountVerify />}
        />
        <Route path="/wallet-withdraw" element={<SdWalletWithdraw />} />

        <Route
          path="/wallet-to-wallet-transfer"
          element={<SdWalletToWalletTransfer />}
        />
        <Route
          // path="/fund-transfer-status"
          // path="/fund-transfer-status"
          path="/Wallet-TO-Wallet-Transfer-History"
          element={<SdFundTransferStatus />}
        />
        <Route path="/generate-pin" element={<SdCreatePin />} />
        <Route
          path="/download-certificate-print"
          element={
            <Certificate
              user="SUPER DISTRIBUTOR"
              name={currentUser?.username}
              address={`${currentUser?.City}, ${currentUser?.State}, ${currentUser?.PinCode}`}
              date={currentUser?.CreateAt}
              id={currentUser?.userId}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default SuperDistributorRoutes;
