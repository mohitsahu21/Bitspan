import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginBitspan from '../components/LoginBitspan';
import Dashboard from '../pages/Dashboard';
import MultiStepForm from '../components/PanCardForm/MultiStepForm';
import Profile from '../pages/Profile';
import MobileRecharge from '../components/DashBoard/MobileRecharge';
import Complaints from '../components/DashBoard/Complaints';
import UtiPan from '../components/DashBoard/UtiPan';
import AddMoney from '../components/DashBoard/AddMoney';
import AddMoneyOffline from '../components/DashBoard/AddMoneyOffline';
import AddWalletSummary from '../components/DashBoard/AddWalletSummary';
import AddWalletOfflineSummary from '../components/DashBoard/AddWalletOfflineSummary';
import WalletTransactionReport from '../components/DashBoard/WalletTransactionReport';
import NsdlNewPanCard from '../components/DashBoard/NsdlNewPanCard';
import NsdlPanCorrection from '../components/DashBoard/NsdlPanCorrection';
import PanStatus from '../components/DashBoard/PanStatus';
import PanTransactionReport from '../components/DashBoard/PanTransactionReport';
import PanTransactionRefundReport from '../components/DashBoard/PanTransactionRefundReport';
import PanTransactionResumeReport from '../components/DashBoard/PanTransactionResumeReport';
import DthRecharge from '../components/DashBoard/DthRecharge';
import AadharLinkingStatus from '../components/DashBoard/AadharLinkingStatus';
import TrainingVideo from '../components/DashBoard/TrainingVideo';
import StepVerification from '../components/DashBoard/StepVerification';
import UTIPanTransactionReport from '../components/DashBoard/UTIPanTransactionReport';
import UTIRetailerIdActivate from '../components/DashBoard/UTIRetailerIdActivate';
import UTIPasswordReset from '../components/DashBoard/UTIPasswordReset';
import UTICouponHistory from '../components/DashBoard/UTICouponHistory';
import PanDocumentUpload from '../components/DashBoard/PanDocumentUpload';
import PanUploadedDocsList from '../components/DashBoard/PanUploadedDocsList';
import ImportantLink from '../components/DashBoard/ImportantLink';
import AllComplaintsList from '../components/DashBoard/AllComplaintsList';
import DownloadCertificate from '../components/DashBoard/DownloadCertificate';
import ChangePassword from '../components/DashBoard/ChangePassword';
import PrepaidRechargeHistory from '../components/DashBoard/PrepaidRechargeHistory';
import PostpaidRechargeHistory from '../components/DashBoard/PostpaidRechargeHistory';
import DTHRechargeHistory from '../components/DashBoard/DTHRechargeHistory';
import RechargeRefundReport from '../components/DashBoard/RechargeRefundReport';
import MyCommission from '../components/DashBoard/MyCommission';
import Tool from '../components/DashBoard/Tool';
import OffilnePanCard from '../components/DashBoard/OffilnePanCard';
import PanForm from '../components/DashBoard/PanForm';
import AllPanForm from '../components/DashBoard/AllPanForm';
import Certificate from '../components/SuperDistributer/Certificate';
const RetailerRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginBitspan />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/pan-card-apply" element={<MultiStepForm />} />
                <Route path="/update-profile" element={<Profile />} />
                <Route path="/prepaid-recharge" element={<MobileRecharge />} />
                <Route path="/raise-complaint" element={<Complaints />} />
                <Route path="/uti-login" element={<UtiPan />} />
                <Route path="/add-money" element={<AddMoney />} />
                <Route path="/add-wallet-money-offline" element={<AddMoneyOffline />} />
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
                <Route path="/pan-apply-49" element={<NsdlNewPanCard />} />
                <Route path="/pan-apply-cr" element={<NsdlPanCorrection />} />
                <Route path="/pan-status" element={<PanStatus />} />
                <Route
                    path="/pan-transaction-report"
                    element={<PanTransactionReport />}
                />
                <Route
                    path="/pan-transaction-refund-report"
                    element={<PanTransactionRefundReport />}
                />
                <Route
                    path="/pan-transaction-resume-report"
                    element={<PanTransactionResumeReport />}
                />
                <Route path="/raise-complaint" element={<Complaints />} />
                <Route path="/add-money" element={<AddMoney />} />
                <Route path="/uti-login" element={<UtiPan />} />
                <Route path="/dth-recharge" element={<DthRecharge />} />
                <Route
                    path="/aadhar-linking-status"
                    element={<AadharLinkingStatus />}
                />
                <Route path="/training-video" element={<TrainingVideo />} />
                <Route path="/2-step-verification" element={<StepVerification />} />
                <Route
                    path="/uti-transaction-report"
                    element={<UTIPanTransactionReport />}
                />
                <Route
                    path="/retailer-id-revamp-activate"
                    element={<UTIRetailerIdActivate />}
                />
                <Route path="/password-reset" element={<UTIPasswordReset />} />
                <Route path="/uti-coupon-history" element={<UTICouponHistory />} />
                <Route path="/pan-document-upload" element={<PanDocumentUpload />} />
                <Route path="/pan-document" element={<PanUploadedDocsList />} />
                <Route path="/important-links" element={<ImportantLink />} />
                <Route path="/complaint-raised-list" element={<AllComplaintsList />} />
                <Route path="/download-certificate" element={<DownloadCertificate />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route
                    path="/prepaid-recharge-history"
                    element={<PrepaidRechargeHistory />}
                />
                <Route
                    path="/postpaid-recharge-history"
                    element={<PostpaidRechargeHistory />}
                />
                <Route path="/dth-recharge-history" element={<DTHRechargeHistory />} />
                <Route
                    path="/recharge-refund-report"
                    element={<RechargeRefundReport />}
                />
                <Route path="/my-commission" element={<MyCommission />} />
                <Route path="/crop-tool" element={<Tool />} />
                <Route path="/download-offline-forms" element={<OffilnePanCard />} />
                <Route path="/submit-pan-card-offline" element={<PanForm />} />
                <Route path="/view-all-offline-history" element={<AllPanForm />} />
                <Route path="/download-certificate-print" element={<Certificate user="RETAILER" name="Aashish Kumar"
        address="Jabalpur, BIHAR - 482001"
        date="02-Jul-2024"
        id="AASHISD29164"/>} />


            </Routes>
        </>
    )
}

export default RetailerRoutes