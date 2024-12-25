const moment = require("moment-timezone");
const { db } = require("../../connect");
const dotenv = require("dotenv");
dotenv.config();

const addPackage = (req, res) => {
  try {
    const {
      package_name,
      package_for,
      offline_E_PAN_Card_Price,
      offline_P_PAN_Card_Price,
      Pan_Find_Price,
      Google_Play_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Udyog_Aadhar_Price,
      offline_kyc_eDistrict,
      eKYC_Income_Certificate_Price,
      eKYC_Domicile_Certificate_Price,
      offlineKYC_Income_Certificate_Price,
      offlineKYC_Domicile_Certificate_Price,
      non_samagra_income_Certificate_Price,
      non_samagra_Domicile_Certificate_Price,
      verify_edistrict_Certificate_Price,
      Ayushman_Id_Price,
      IRCTC_Agent_ID_Price,
      PayNearBy_BankId_Price,
      Fino_BankId_Price,
      SpiceMoney_BankId_Price,
      Nsdl_BankId_Price,
      Ezeepay_BankId_Price,
      ReligareDigipay_BankId_Price,
      Airtel_BankId_Price,
      payworld_BankId_Price,
      Anypay_BankId_Price,
      Roinet_BankId_Price,
      Offline_Services_Commission_Type,
      offline_E_PAN_Card_Commission,
      offline_P_PAN_Card_Commission,
      Pan_Find_Commission,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Udyog_Aadhar_Commission,
      eKYC_Income_Certificate_Commission,
      eKYC_Domicile_Certificate_Commission,
      offlineKYC_Income_Certificate_Commission,
      offlineKYC_Domicile_Certificate_Commission,
      non_samagra_income_Certificate_Commission,
      non_samagra_Domicile_Certificate_Commission,
      verify_edistrict_Certificate_Commission,
      Bank_ID_Commission,
      Off_Prepaid_Recharge_Comm_Type,
      Off_Airtel_Prepaid_Recharge_Comm,
      Off_Jio_Prepaid_Recharge_Comm,
      Off_Vi_Prepaid_Recharge_Comm,
      Off_Bsnl_Prepaid_Recharge_Comm,
      Off_Postpaid_Recharge_Comm_Type,
      Off_Airtel_Postpaid_Recharge_Comm,
      Off_Jio_Postpaid_Recharge_Comm,
      Off_Vi_Postpaid_Recharge_Comm,
      Off_Bsnl_Postpaid_Recharge_Comm,
      On_Prepaid_Recharge_Comm_Type,
      On_Airtel_Prepaid_Recharge_Comm,
      On_Jio_Prepaid_Recharge_Comm,
      On_Vi_Prepaid_Recharge_Comm,
      On_Bsnl_Prepaid_Recharge_Comm,
      On_Postpaid_Recharge_Comm_Type,
      On_Airtel_Postpaid_Recharge_Comm,
      On_Jio_Postpaid_Recharge_Comm,
      On_Vi_Postpaid_Recharge_Comm,
      On_Bsnl_Postpaid_Recharge_Comm,
      Online_DTH_Recharge_Commission_Type,
      On_Dish_TV_Recharge_Commission,
      On_Tata_Sky_Recharge_Commission,
      On_Videocon_Recharge_Commission,
      On_Sun_Direct_Recharge_Commission,
      On_Airtel_Dth_Recharge_Commission,
      Offline_DTH_Recharge_Commission_Type,
      Off_Dish_TV_Recharge_Commission,
      Off_Tata_Sky_Recharge_Commission,
      Off_Videocon_Recharge_Commission,
      Off_Sun_Direct_Recharge_Commission,
      Off_Airtel_Dth_Recharge_Commission,
      Online_New_DTH_Connection_Commission_Type,
      On_Dish_TV_New_DTH_Connection_Commission,
      On_Tata_Sky_New_DTH_Connection_Commission,
      On_Videocon_New_DTH_Connection_Commission,
      On_Sun_Direct_New_DTH_Connection_Commission,
      On_Airtel_New_DTH_Connection_Commission,
      Offline_New_DTH_Connection_Commission_Type,
      Off_Dish_TV_New_DTH_Connection_Commission,
      Off_Tata_Sky_New_DTH_Connection_Commission,
      Off_Videocon_New_DTH_Connection_Commission,
      Off_Sun_Direct_New_DTH_Connection_Commission,
      Off_Airtel_New_DTH_Connection_Commission,
      Online_Broadband_Bill_Pay_Commission_Type,
      Online_Broadband_Bill_Pay_Commission,
      Offline_Broadband_Bill_Pay_Commission_Type,
      Offline_Broadband_Bill_Pay_Commission,
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      E_PAN_Card_Price,
      P_PAN_Card_Price,
      UTI_PAN_Coupon_Price,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
    } = req.body;

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    const sql = `INSERT INTO packagestable (
        package_name, package_for, offline_E_PAN_Card_Price , offline_P_PAN_Card_Price,Pan_Find_Price, Google_Play_Price, Birth_Certificate_Price, Death_Certificate_Price,
        E_Stamp_Price, ITR_Registration_Price, GST_Registration_Price, Sambal_Price, Udyog_Aadhar_Price, offline_kyc_eDistrict,
        eKYC_Income_Certificate_Price, eKYC_Domicile_Certificate_Price,offlineKYC_Income_Certificate_Price,offlineKYC_Domicile_Certificate_Price,non_samagra_income_Certificate_Price, non_samagra_Domicile_Certificate_Price, verify_edistrict_Certificate_Price,Ayushman_Id_Price, IRCTC_Agent_ID_Price,
      PayNearBy_BankId_Price,
      Fino_BankId_Price,
      SpiceMoney_BankId_Price,
      Nsdl_BankId_Price,
      Ezeepay_BankId_Price,
      ReligareDigipay_BankId_Price,
      Airtel_BankId_Price,
      payworld_BankId_Price,
      Anypay_BankId_Price,
      Roinet_BankId_Price, Offline_Services_Commission_Type, offline_E_PAN_Card_Commission , offline_P_PAN_Card_Commission ,Pan_Find_Commission,Google_Play_Commission,
        IRCTC_Agent_ID_Commission, Birth_Certificate_Commission, Death_Certificate_Commission, E_Stamp_Commission,
        ITR_Registration_Commission, GST_Registration_Commission, Sambal_Commission,Udyog_Aadhar_Commission, eKYC_Income_Certificate_Commission,
        eKYC_Domicile_Certificate_Commission, offlineKYC_Income_Certificate_Commission,offlineKYC_Domicile_Certificate_Commission, non_samagra_income_Certificate_Commission, non_samagra_Domicile_Certificate_Commission,verify_edistrict_Certificate_Commission, Bank_ID_Commission, Off_Prepaid_Recharge_Comm_Type, Off_Airtel_Prepaid_Recharge_Comm,
        Off_Jio_Prepaid_Recharge_Comm, Off_Vi_Prepaid_Recharge_Comm, Off_Bsnl_Prepaid_Recharge_Comm,
        Off_Postpaid_Recharge_Comm_Type, Off_Airtel_Postpaid_Recharge_Comm, Off_Jio_Postpaid_Recharge_Comm,
        Off_Vi_Postpaid_Recharge_Comm, Off_Bsnl_Postpaid_Recharge_Comm, On_Prepaid_Recharge_Comm_Type, On_Airtel_Prepaid_Recharge_Comm,
        On_Jio_Prepaid_Recharge_Comm, On_Vi_Prepaid_Recharge_Comm, On_Bsnl_Prepaid_Recharge_Comm,
        On_Postpaid_Recharge_Comm_Type, On_Airtel_Postpaid_Recharge_Comm, On_Jio_Postpaid_Recharge_Comm,
        On_Vi_Postpaid_Recharge_Comm, On_Bsnl_Postpaid_Recharge_Comm, Online_DTH_Recharge_Commission_Type,
        On_Dish_TV_Recharge_Commission, On_Tata_Sky_Recharge_Commission, On_Videocon_Recharge_Commission,
        On_Sun_Direct_Recharge_Commission, On_Airtel_Dth_Recharge_Commission, Offline_DTH_Recharge_Commission_Type,
        Off_Dish_TV_Recharge_Commission, Off_Tata_Sky_Recharge_Commission, Off_Videocon_Recharge_Commission,
        Off_Sun_Direct_Recharge_Commission, Off_Airtel_Dth_Recharge_Commission, Online_New_DTH_Connection_Commission_Type,
        On_Dish_TV_New_DTH_Connection_Commission, On_Tata_Sky_New_DTH_Connection_Commission, On_Videocon_New_DTH_Connection_Commission,
        On_Sun_Direct_New_DTH_Connection_Commission, On_Airtel_New_DTH_Connection_Commission,
           Offline_New_DTH_Connection_Commission_Type,
    Off_Dish_TV_New_DTH_Connection_Commission,
    Off_Tata_Sky_New_DTH_Connection_Commission,
    Off_Videocon_New_DTH_Connection_Commission,
    Off_Sun_Direct_New_DTH_Connection_Commission,
    Off_Airtel_New_DTH_Connection_Commission,Online_Broadband_Bill_Pay_Commission_Type,
      Online_Broadband_Bill_Pay_Commission,
      Offline_Broadband_Bill_Pay_Commission_Type,
      Offline_Broadband_Bill_Pay_Commission,
        Online_Electricity_Bill_Pay_Commission_Type, Online_Electricity_Bill_Pay_Commission,
        Offline_Electricity_Bill_Pay_Commission_Type, Offline_Electricity_Bill_Pay_Commission,
        Online_Insurance_Pay_Commission_Type, Online_Insurance_Pay_Commission, Offline_Insurance_Pay_Commission_Type,
        Offline_Insurance_Pay_Commission,E_PAN_Card_Price,P_PAN_Card_Price,UTI_PAN_Coupon_Price, PAN_Card_Commission_Type, E_PAN_Card_Commission, UTI_PAN_Coupon_Commission, P_PAN_Card_Commission , created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ?, ?, ? ,?, ? , ? , ? , ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      package_name,
      package_for,
      offline_E_PAN_Card_Price,
      offline_P_PAN_Card_Price,
      Pan_Find_Price,
      Google_Play_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Udyog_Aadhar_Price,
      offline_kyc_eDistrict,
      eKYC_Income_Certificate_Price,
      eKYC_Domicile_Certificate_Price,
      offlineKYC_Income_Certificate_Price,
      offlineKYC_Domicile_Certificate_Price,
      non_samagra_income_Certificate_Price,
      non_samagra_Domicile_Certificate_Price,
      verify_edistrict_Certificate_Price,
      Ayushman_Id_Price,
      IRCTC_Agent_ID_Price,
      PayNearBy_BankId_Price,
      Fino_BankId_Price,
      SpiceMoney_BankId_Price,
      Nsdl_BankId_Price,
      Ezeepay_BankId_Price,
      ReligareDigipay_BankId_Price,
      Airtel_BankId_Price,
      payworld_BankId_Price,
      Anypay_BankId_Price,
      Roinet_BankId_Price,
      Offline_Services_Commission_Type,
      offline_E_PAN_Card_Commission,
      offline_P_PAN_Card_Commission,
      Pan_Find_Commission,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Udyog_Aadhar_Commission,
      eKYC_Income_Certificate_Commission,
      eKYC_Domicile_Certificate_Commission,
      offlineKYC_Income_Certificate_Commission,
      offlineKYC_Domicile_Certificate_Commission,
      non_samagra_income_Certificate_Commission,
      non_samagra_Domicile_Certificate_Commission,
      verify_edistrict_Certificate_Commission,
      Bank_ID_Commission,
      Off_Prepaid_Recharge_Comm_Type,
      Off_Airtel_Prepaid_Recharge_Comm,
      Off_Jio_Prepaid_Recharge_Comm,
      Off_Vi_Prepaid_Recharge_Comm,
      Off_Bsnl_Prepaid_Recharge_Comm,
      Off_Postpaid_Recharge_Comm_Type,
      Off_Airtel_Postpaid_Recharge_Comm,
      Off_Jio_Postpaid_Recharge_Comm,
      Off_Vi_Postpaid_Recharge_Comm,
      Off_Bsnl_Postpaid_Recharge_Comm,
      On_Prepaid_Recharge_Comm_Type,
      On_Airtel_Prepaid_Recharge_Comm,
      On_Jio_Prepaid_Recharge_Comm,
      On_Vi_Prepaid_Recharge_Comm,
      On_Bsnl_Prepaid_Recharge_Comm,
      On_Postpaid_Recharge_Comm_Type,
      On_Airtel_Postpaid_Recharge_Comm,
      On_Jio_Postpaid_Recharge_Comm,
      On_Vi_Postpaid_Recharge_Comm,
      On_Bsnl_Postpaid_Recharge_Comm,
      Online_DTH_Recharge_Commission_Type,
      On_Dish_TV_Recharge_Commission,
      On_Tata_Sky_Recharge_Commission,
      On_Videocon_Recharge_Commission,
      On_Sun_Direct_Recharge_Commission,
      On_Airtel_Dth_Recharge_Commission,
      Offline_DTH_Recharge_Commission_Type,
      Off_Dish_TV_Recharge_Commission,
      Off_Tata_Sky_Recharge_Commission,
      Off_Videocon_Recharge_Commission,
      Off_Sun_Direct_Recharge_Commission,
      Off_Airtel_Dth_Recharge_Commission,
      Online_New_DTH_Connection_Commission_Type,
      On_Dish_TV_New_DTH_Connection_Commission,
      On_Tata_Sky_New_DTH_Connection_Commission,
      On_Videocon_New_DTH_Connection_Commission,
      On_Sun_Direct_New_DTH_Connection_Commission,
      On_Airtel_New_DTH_Connection_Commission,
      Offline_New_DTH_Connection_Commission_Type,
      Off_Dish_TV_New_DTH_Connection_Commission,
      Off_Tata_Sky_New_DTH_Connection_Commission,
      Off_Videocon_New_DTH_Connection_Commission,
      Off_Sun_Direct_New_DTH_Connection_Commission,
      Off_Airtel_New_DTH_Connection_Commission,
      Online_Broadband_Bill_Pay_Commission_Type,
      Online_Broadband_Bill_Pay_Commission,
      Offline_Broadband_Bill_Pay_Commission_Type,
      Offline_Broadband_Bill_Pay_Commission,
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      E_PAN_Card_Price,
      P_PAN_Card_Price,
      UTI_PAN_Coupon_Price,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
      createdAt,
    ];

    db.query(sql, values, (err, result) => {
      if (err) throw err; // Will be caught by the catch block
      res.status(200).send({
        success: true,
        message: "Data inserted successfully",
        data: result,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error inserting data",
      details: error.message,
    });
  }
};

const getPackages = (req, res) => {
  try {
    const sql = "SELECT * FROM packagestable";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching packages from MySql:", err);
        res
          .status(500)
          .json({ success: false, error: "Error fetching packages" });
      } else {
        res.status(200).json({
          success: true,
          data: result,
          message: "packages fetch successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching Branches from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branches",
      error: error.message,
    });
  }
};

const getPendingUsers = (req, res) => {
  try {
    // const sql = "SELECT * FROM userprofile WHERE Status = 'Pending'";
    const sql =
      "SELECT * FROM userprofile WHERE Status = 'Pending' AND payment_status = 'Complete' AND role != 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching pending users from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching users" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No pending users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error: error.message,
    });
  }
};

const getPendingPaymentUsers = (req, res) => {
  try {
    const sql =
      "SELECT * FROM userprofile WHERE payment_status = 'Pending' AND role != 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching pending Payment users from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching users" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No pending Payment users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error: error.message,
    });
  }
};
const getActiveUsers = (req, res) => {
  try {
    const sql =
      "SELECT  u.*, p.package_name FROM userprofile u LEFT JOIN packagestable p ON u.package_Id = p.id WHERE u.Status = 'Active' AND role != 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching Active users from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching users" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No Active users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error: error.message,
    });
  }
};

const getdeactiveUsers = (req, res) => {
  try {
    const sql =
      "SELECT  u.*, p.package_name FROM userprofile u LEFT JOIN packagestable p ON u.package_Id = p.id WHERE u.Status = 'Deactive' AND role != 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching Deactive users from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching users" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No Deactive users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error: error.message,
    });
  }
};
const getAllUsers = (req, res) => {
  try {
    const sql =
      "SELECT  u.*, p.package_name FROM userprofile u LEFT JOIN packagestable p ON u.package_Id = p.id WHERE role NOT IN ('SuperAdmin_Employee', 'SuperAdmin')";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching Deactive users from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching users" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No Deactive users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error: error.message,
    });
  }
};

const editPackage = (req, res) => {
  try {
    const {
      packageId, // Extract the package ID from the request body.
      package_name,
      package_for,
      offline_E_PAN_Card_Price,
      offline_P_PAN_Card_Price,
      Pan_Find_Price,
      Google_Play_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Udyog_Aadhar_Price,
      offline_kyc_eDistrict,
      eKYC_Income_Certificate_Price,
      eKYC_Domicile_Certificate_Price,
      offlineKYC_Income_Certificate_Price,
      offlineKYC_Domicile_Certificate_Price,
      non_samagra_income_Certificate_Price,
      non_samagra_Domicile_Certificate_Price,
      verify_edistrict_Certificate_Price,
      Ayushman_Id_Price,
      IRCTC_Agent_ID_Price,
      PayNearBy_BankId_Price,
      Fino_BankId_Price,
      SpiceMoney_BankId_Price,
      Nsdl_BankId_Price,
      Ezeepay_BankId_Price,
      ReligareDigipay_BankId_Price,
      Airtel_BankId_Price,
      payworld_BankId_Price,
      Anypay_BankId_Price,
      Roinet_BankId_Price,
      Offline_Services_Commission_Type,
      offline_E_PAN_Card_Commission,
      offline_P_PAN_Card_Commission,
      Pan_Find_Commission,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Udyog_Aadhar_Commission,
      eKYC_Income_Certificate_Commission,
      eKYC_Domicile_Certificate_Commission,
      offlineKYC_Income_Certificate_Commission,
      offlineKYC_Domicile_Certificate_Commission,
      non_samagra_income_Certificate_Commission,
      non_samagra_Domicile_Certificate_Commission,
      verify_edistrict_Certificate_Commission,
      Bank_ID_Commission,
      Off_Prepaid_Recharge_Comm_Type,
      Off_Airtel_Prepaid_Recharge_Comm,
      Off_Jio_Prepaid_Recharge_Comm,
      Off_Vi_Prepaid_Recharge_Comm,
      Off_Bsnl_Prepaid_Recharge_Comm,
      Off_Postpaid_Recharge_Comm_Type,
      Off_Airtel_Postpaid_Recharge_Comm,
      Off_Jio_Postpaid_Recharge_Comm,
      Off_Vi_Postpaid_Recharge_Comm,
      Off_Bsnl_Postpaid_Recharge_Comm,
      On_Prepaid_Recharge_Comm_Type,
      On_Airtel_Prepaid_Recharge_Comm,
      On_Jio_Prepaid_Recharge_Comm,
      On_Vi_Prepaid_Recharge_Comm,
      On_Bsnl_Prepaid_Recharge_Comm,
      On_Postpaid_Recharge_Comm_Type,
      On_Airtel_Postpaid_Recharge_Comm,
      On_Jio_Postpaid_Recharge_Comm,
      On_Vi_Postpaid_Recharge_Comm,
      On_Bsnl_Postpaid_Recharge_Comm,
      Online_DTH_Recharge_Commission_Type,
      On_Dish_TV_Recharge_Commission,
      On_Tata_Sky_Recharge_Commission,
      On_Videocon_Recharge_Commission,
      On_Sun_Direct_Recharge_Commission,
      On_Airtel_Dth_Recharge_Commission,
      Offline_DTH_Recharge_Commission_Type,
      Off_Dish_TV_Recharge_Commission,
      Off_Tata_Sky_Recharge_Commission,
      Off_Videocon_Recharge_Commission,
      Off_Sun_Direct_Recharge_Commission,
      Off_Airtel_Dth_Recharge_Commission,
      Online_New_DTH_Connection_Commission_Type,
      On_Dish_TV_New_DTH_Connection_Commission,
      On_Tata_Sky_New_DTH_Connection_Commission,
      On_Videocon_New_DTH_Connection_Commission,
      On_Sun_Direct_New_DTH_Connection_Commission,
      On_Airtel_New_DTH_Connection_Commission,
      Offline_New_DTH_Connection_Commission_Type,
      Off_Dish_TV_New_DTH_Connection_Commission,
      Off_Tata_Sky_New_DTH_Connection_Commission,
      Off_Videocon_New_DTH_Connection_Commission,
      Off_Sun_Direct_New_DTH_Connection_Commission,
      Off_Airtel_New_DTH_Connection_Commission,
      Online_Broadband_Bill_Pay_Commission_Type,
      Online_Broadband_Bill_Pay_Commission,
      Offline_Broadband_Bill_Pay_Commission_Type,
      Offline_Broadband_Bill_Pay_Commission,
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      E_PAN_Card_Price,
      P_PAN_Card_Price,
      UTI_PAN_Coupon_Price,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
    } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE packagestable SET
        package_name = ?, package_for = ?, 
        offline_E_PAN_Card_Price = ?, offline_P_PAN_Card_Price = ?,
        Pan_Find_Price = ?,
        Google_Play_Price = ?, 
        Birth_Certificate_Price = ?, Death_Certificate_Price = ?, E_Stamp_Price = ?, ITR_Registration_Price = ?, 
        GST_Registration_Price = ?, Sambal_Price = ?,
        Udyog_Aadhar_Price = ?, offline_kyc_eDistrict = ?,
        eKYC_Income_Certificate_Price = ?, eKYC_Domicile_Certificate_Price = ?,offlineKYC_Income_Certificate_Price = ?,offlineKYC_Domicile_Certificate_Price = ?, non_samagra_income_Certificate_Price = ? ,
        non_samagra_Domicile_Certificate_Price = ? , verify_edistrict_Certificate_Price = ?, 
        Ayushman_Id_Price = ? ,
        IRCTC_Agent_ID_Price = ?,
         PayNearBy_BankId_Price = ?,
      Fino_BankId_Price = ?, 
      SpiceMoney_BankId_Price = ?,
      Nsdl_BankId_Price = ?,
      Ezeepay_BankId_Price = ?,
      ReligareDigipay_BankId_Price = ?,
      Airtel_BankId_Price = ?,
      payworld_BankId_Price = ?,
      Anypay_BankId_Price =?, 
      Roinet_BankId_Price = ?,  
         Offline_Services_Commission_Type = ?, 
        offline_E_PAN_Card_Commission = ?, offline_P_PAN_Card_Commission = ?,
        Pan_Find_Commission = ? ,
        Google_Play_Commission = ?, 
        IRCTC_Agent_ID_Commission = ?, Birth_Certificate_Commission = ?, Death_Certificate_Commission = ?, 
        E_Stamp_Commission = ?, ITR_Registration_Commission = ?, GST_Registration_Commission = ?, Sambal_Commission = ?,
        Udyog_Aadhar_Commission = ?, 
        eKYC_Income_Certificate_Commission = ?,
        eKYC_Domicile_Certificate_Commission = ?, offlineKYC_Income_Certificate_Commission = ?,offlineKYC_Domicile_Certificate_Commission = ?, non_samagra_income_Certificate_Commission = ? ,
        non_samagra_Domicile_Certificate_Commission = ? , verify_edistrict_Certificate_Commission = ?, 
        Bank_ID_Commission = ?, 
        Off_Prepaid_Recharge_Comm_Type = ?, Off_Airtel_Prepaid_Recharge_Comm = ?, Off_Jio_Prepaid_Recharge_Comm = ?, 
        Off_Vi_Prepaid_Recharge_Comm = ?, Off_Bsnl_Prepaid_Recharge_Comm = ?, Off_Postpaid_Recharge_Comm_Type = ?, 
        Off_Airtel_Postpaid_Recharge_Comm = ?, Off_Jio_Postpaid_Recharge_Comm = ?, Off_Vi_Postpaid_Recharge_Comm = ?, 
        Off_Bsnl_Postpaid_Recharge_Comm = ?, On_Prepaid_Recharge_Comm_Type = ?, On_Airtel_Prepaid_Recharge_Comm = ?, 
        On_Jio_Prepaid_Recharge_Comm = ?, On_Vi_Prepaid_Recharge_Comm = ?, On_Bsnl_Prepaid_Recharge_Comm = ?, 
        On_Postpaid_Recharge_Comm_Type = ?, On_Airtel_Postpaid_Recharge_Comm = ?, On_Jio_Postpaid_Recharge_Comm = ?, 
        On_Vi_Postpaid_Recharge_Comm = ?, On_Bsnl_Postpaid_Recharge_Comm = ?, Online_DTH_Recharge_Commission_Type = ?, 
        On_Dish_TV_Recharge_Commission = ?, On_Tata_Sky_Recharge_Commission = ?, On_Videocon_Recharge_Commission = ?, 
        On_Sun_Direct_Recharge_Commission = ?, On_Airtel_Dth_Recharge_Commission = ?, Offline_DTH_Recharge_Commission_Type = ?, 
        Off_Dish_TV_Recharge_Commission = ?, Off_Tata_Sky_Recharge_Commission = ?, Off_Videocon_Recharge_Commission = ?, 
        Off_Sun_Direct_Recharge_Commission = ?, Off_Airtel_Dth_Recharge_Commission = ?, 
        Online_New_DTH_Connection_Commission_Type = ?, On_Dish_TV_New_DTH_Connection_Commission = ?, 
        On_Tata_Sky_New_DTH_Connection_Commission = ?, On_Videocon_New_DTH_Connection_Commission = ?, 
        On_Sun_Direct_New_DTH_Connection_Commission = ?, On_Airtel_New_DTH_Connection_Commission = ?, 
        Offline_New_DTH_Connection_Commission_Type = ?, Off_Dish_TV_New_DTH_Connection_Commission = ?, 
        Off_Tata_Sky_New_DTH_Connection_Commission = ?, Off_Videocon_New_DTH_Connection_Commission = ?, 
        Off_Sun_Direct_New_DTH_Connection_Commission = ?, Off_Airtel_New_DTH_Connection_Commission = ?, 
        Online_Broadband_Bill_Pay_Commission_Type = ? ,Online_Broadband_Bill_Pay_Commission = ? ,Offline_Broadband_Bill_Pay_Commission_Type = ? ,Offline_Broadband_Bill_Pay_Commission = ?,
        Online_Electricity_Bill_Pay_Commission_Type = ?, Online_Electricity_Bill_Pay_Commission = ?, 
        Offline_Electricity_Bill_Pay_Commission_Type = ?, Offline_Electricity_Bill_Pay_Commission = ?, 
        Online_Insurance_Pay_Commission_Type = ?, Online_Insurance_Pay_Commission = ?, 
        Offline_Insurance_Pay_Commission_Type = ?, Offline_Insurance_Pay_Commission = ?, 
        E_PAN_Card_Price = ?,
        P_PAN_Card_Price = ?,
        UTI_PAN_Coupon_Price = ?, 
        PAN_Card_Commission_Type = ?, E_PAN_Card_Commission = ?, UTI_PAN_Coupon_Commission = ?, 
        P_PAN_Card_Commission = ?, updated_at = ? 
      WHERE id = ?`;

    const values = [
      package_name,
      package_for,
      offline_E_PAN_Card_Price,
      offline_P_PAN_Card_Price,
      Pan_Find_Price,
      Google_Play_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Udyog_Aadhar_Price,
      offline_kyc_eDistrict,
      eKYC_Income_Certificate_Price,
      eKYC_Domicile_Certificate_Price,
      offlineKYC_Income_Certificate_Price,
      offlineKYC_Domicile_Certificate_Price,
      non_samagra_income_Certificate_Price,
      non_samagra_Domicile_Certificate_Price,
      verify_edistrict_Certificate_Price,
      Ayushman_Id_Price,
      IRCTC_Agent_ID_Price,
      PayNearBy_BankId_Price,
      Fino_BankId_Price,
      SpiceMoney_BankId_Price,
      Nsdl_BankId_Price,
      Ezeepay_BankId_Price,
      ReligareDigipay_BankId_Price,
      Airtel_BankId_Price,
      payworld_BankId_Price,
      Anypay_BankId_Price,
      Roinet_BankId_Price,
      Offline_Services_Commission_Type,
      offline_E_PAN_Card_Commission,
      offline_P_PAN_Card_Commission,
      Pan_Find_Commission,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Udyog_Aadhar_Commission,
      eKYC_Income_Certificate_Commission,
      eKYC_Domicile_Certificate_Commission,
      offlineKYC_Income_Certificate_Commission,
      offlineKYC_Domicile_Certificate_Commission,
      non_samagra_income_Certificate_Commission,
      non_samagra_Domicile_Certificate_Commission,
      verify_edistrict_Certificate_Commission,
      Bank_ID_Commission,
      Off_Prepaid_Recharge_Comm_Type,
      Off_Airtel_Prepaid_Recharge_Comm,
      Off_Jio_Prepaid_Recharge_Comm,
      Off_Vi_Prepaid_Recharge_Comm,
      Off_Bsnl_Prepaid_Recharge_Comm,
      Off_Postpaid_Recharge_Comm_Type,
      Off_Airtel_Postpaid_Recharge_Comm,
      Off_Jio_Postpaid_Recharge_Comm,
      Off_Vi_Postpaid_Recharge_Comm,
      Off_Bsnl_Postpaid_Recharge_Comm,
      On_Prepaid_Recharge_Comm_Type,
      On_Airtel_Prepaid_Recharge_Comm,
      On_Jio_Prepaid_Recharge_Comm,
      On_Vi_Prepaid_Recharge_Comm,
      On_Bsnl_Prepaid_Recharge_Comm,
      On_Postpaid_Recharge_Comm_Type,
      On_Airtel_Postpaid_Recharge_Comm,
      On_Jio_Postpaid_Recharge_Comm,
      On_Vi_Postpaid_Recharge_Comm,
      On_Bsnl_Postpaid_Recharge_Comm,
      Online_DTH_Recharge_Commission_Type,
      On_Dish_TV_Recharge_Commission,
      On_Tata_Sky_Recharge_Commission,
      On_Videocon_Recharge_Commission,
      On_Sun_Direct_Recharge_Commission,
      On_Airtel_Dth_Recharge_Commission,
      Offline_DTH_Recharge_Commission_Type,
      Off_Dish_TV_Recharge_Commission,
      Off_Tata_Sky_Recharge_Commission,
      Off_Videocon_Recharge_Commission,
      Off_Sun_Direct_Recharge_Commission,
      Off_Airtel_Dth_Recharge_Commission,
      Online_New_DTH_Connection_Commission_Type,
      On_Dish_TV_New_DTH_Connection_Commission,
      On_Tata_Sky_New_DTH_Connection_Commission,
      On_Videocon_New_DTH_Connection_Commission,
      On_Sun_Direct_New_DTH_Connection_Commission,
      On_Airtel_New_DTH_Connection_Commission,
      Offline_New_DTH_Connection_Commission_Type,
      Off_Dish_TV_New_DTH_Connection_Commission,
      Off_Tata_Sky_New_DTH_Connection_Commission,
      Off_Videocon_New_DTH_Connection_Commission,
      Off_Sun_Direct_New_DTH_Connection_Commission,
      Off_Airtel_New_DTH_Connection_Commission,
      Online_Broadband_Bill_Pay_Commission_Type,
      Online_Broadband_Bill_Pay_Commission,
      Offline_Broadband_Bill_Pay_Commission_Type,
      Offline_Broadband_Bill_Pay_Commission,
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      E_PAN_Card_Price,
      P_PAN_Card_Price,
      UTI_PAN_Coupon_Price,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
      updatedAt,
      packageId,
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Package not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const deletePackage = (req, res) => {
  try {
    const { package_id } = req.body;
    console.log(package_id);

    // Check if the package is allocated to any user
    const checkUserSql = `SELECT COUNT(*) AS userCount FROM userprofile WHERE package_Id = ?`;
    db.query(checkUserSql, [package_id], (checkError, checkResults) => {
      if (checkError) {
        console.error("Error checking package allocation:", checkError);
        return res
          .status(500)
          .json({ error: "Failed to check package allocation" });
      }

      const userCount = checkResults[0].userCount;

      // If the package is allocated to any user, don't delete it
      if (userCount > 0) {
        return res.status(200).json({
          success: false,
          message: "Package cannot be deleted as it is allocated to users",
        });
      }

      // If the package is not allocated to any user, proceed to delete
      const deleteSql = `DELETE FROM packagestable WHERE id = ?`;
      db.query(deleteSql, [package_id], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error("Error deleting package:", deleteError);
          return res
            .status(500)
            .json({ error: "Failed to delete the package" });
        }

        if (deleteResults.affectedRows === 0) {
          return res.status(404).json({ message: "Package not found" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Package deleted successfully" });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const approveUser = (req, res) => {
  try {
    const {
      PackageId,
      UserId,
      UserRole,
      Status,
      white_lable,
      superDistributor,
      distributor,
      website_url,
    } = req.body;

    if (!PackageId) {
      return res
        .status(400)
        .json({ success: false, error: "Package ID is required" });
      // return res.status(500).json({success: false, error: "Failed to approve the user" });
    }

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE userprofile SET package_Id = ? , Status = ? WHERE UserId = ?`;

    const values = [PackageId, Status, UserId];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to approve the user" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }

      // SQL query to insert details into another table (e.g., 'userdetails')
      const insertSql = `INSERT INTO user_relations (UserId,userType,	superAdmin, white_lable, superDistributor, distributor, website_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const superAdminId = "AASH00001";

      const insertValues = [
        UserId,
        UserRole,
        superAdminId,
        white_lable,
        superDistributor,
        distributor,
        website_url,
      ];

      db.query(insertSql, insertValues, (insertError, insertResults) => {
        if (insertError) {
          console.error("Error inserting user details:", insertError);
          return res
            .status(500)
            .json({ success: false, error: "Failed to save user details" });
        }

        return res.status(200).json({
          success: true,
          message: "User approved and details saved successfully",
        });
      });
    });

    // return res.status(200).json({success: true, message: "Approve user successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const rejectUser = (req, res) => {
  try {
    const { UserId, Note } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE userprofile SET Note = ? WHERE UserId = ?`;

    const values = [Note, UserId];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to reject the user" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Reject user successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const deactivateUser = (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(200)
        .json({ success: false, message: "User Id is required" });
    }

    // If the package is not allocated to any user, proceed to delete
    const Sql = `UPDATE userprofile SET Status = "Deactive" WHERE UserId = ?`;
    db.query(Sql, [userId], (Error, Results) => {
      if (Error) {
        console.error("Error deactive the user:", Error);
        return res.status(500).json({ error: "Failed to deactive the user" });
      }

      if (Results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "deactive the user successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
const activateUser = (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(200)
        .json({ success: false, message: "User Id is required" });
    }

    // If the package is not allocated to any user, proceed to delete
    const Sql = `UPDATE userprofile SET Status = "Active" WHERE UserId = ?`;
    db.query(Sql, [userId], (Error, Results) => {
      if (Error) {
        console.error("Error active the user:", Error);
        return res.status(500).json({ error: "Failed to active the user" });
      }

      if (Results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "active the user successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getUserRelations = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = "SELECT * FROM user_relations WHERE UserId = ?";

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching  users relation from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching users" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No users found",
          });
        } else {
          // Remove the password field from each user object
          // const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: result,
            message: "Users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching users",
      error: error.message,
    });
  }
};

const markPaymentComplete = (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(200)
        .json({ success: false, message: "User Id is required" });
    }

    // If the package is not allocated to any user, proceed to delete
    const Sql = `UPDATE userprofile SET payment_status = "Complete" WHERE UserId = ?`;
    db.query(Sql, [userId], (Error, Results) => {
      if (Error) {
        console.error("Error in Mark Payment Complete:", Error);
        return res
          .status(500)
          .json({ error: "Failed to Mark Payment Complete" });
      }

      if (Results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Mark Payment Complete successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getUserIdPriceList = (req, res) => {
  try {
    const sql = "SELECT * FROM userId_price_list";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching  usersID Price from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching usersID Price" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No usersID Price found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result[0],
            message: "usersID Price fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching usersID Price from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching usersID Price",
      error: error.message,
    });
  }
};

const addUserIdPrice = (req, res) => {
  try {
    const {
      whiteLabel_id_price,
      whiteLabel_min_id_limit,
      whiteLabel_max_id_limit,
      superDistributor_id_price,
      superDistributor_min_id_limit,
      superDistributor_max_id_limit,
      distributor_id_price,
      distributor_min_id_limit,
      distributor_max_id_limit,
      retailer_id_price,
      retailer_min_id_limit,
      retailer_max_id_limit,
    } = req.body;

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    const sql = `INSERT INTO userId_price_list (whiteLabel_id_price, whiteLabel_min_id_limit, whiteLabel_max_id_limit,
      superDistributor_id_price, superDistributor_min_id_limit, superDistributor_max_id_limit,
      distributor_id_price, distributor_min_id_limit, distributor_max_id_limit,
      retailer_id_price, retailer_min_id_limit, retailer_max_id_limit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      whiteLabel_id_price,
      whiteLabel_min_id_limit,
      whiteLabel_max_id_limit,
      superDistributor_id_price,
      superDistributor_min_id_limit,
      superDistributor_max_id_limit,
      distributor_id_price,
      distributor_min_id_limit,
      distributor_max_id_limit,
      retailer_id_price,
      retailer_min_id_limit,
      retailer_max_id_limit,
    ];

    db.query(sql, values, (err, result) => {
      if (err) throw err; // Will be caught by the catch block
      res.status(200).send({
        success: true,
        message: "Data inserted successfully",
        data: result,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error inserting data",
      details: error.message,
    });
  }
};

const updateUserIdPrice = (req, res) => {
  try {
    const {
      id, // ID of the record to be updated
      whiteLabel_id_price,
      whiteLabel_min_id_limit,
      whiteLabel_max_id_limit,
      superDistributor_id_price,
      superDistributor_min_id_limit,
      superDistributor_max_id_limit,
      distributor_id_price,
      distributor_min_id_limit,
      distributor_max_id_limit,
      retailer_id_price,
      retailer_min_id_limit,
      retailer_max_id_limit,
    } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    const sql = `UPDATE userId_price_list 
      SET 
        whiteLabel_id_price = ?, whiteLabel_min_id_limit = ?, whiteLabel_max_id_limit = ?,
        superDistributor_id_price = ?, superDistributor_min_id_limit = ?, superDistributor_max_id_limit = ?,
        distributor_id_price = ?, distributor_min_id_limit = ?, distributor_max_id_limit = ?,
        retailer_id_price = ?, retailer_min_id_limit = ?, retailer_max_id_limit = ? WHERE id = ?`;

    const values = [
      whiteLabel_id_price,
      whiteLabel_min_id_limit,
      whiteLabel_max_id_limit,
      superDistributor_id_price,
      superDistributor_min_id_limit,
      superDistributor_max_id_limit,
      distributor_id_price,
      distributor_min_id_limit,
      distributor_max_id_limit,
      retailer_id_price,
      retailer_min_id_limit,
      retailer_max_id_limit,
      id,
    ];

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(200).send({
        success: true,
        message: "Data updated successfully",
        data: result,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error updating data",
      details: error.message,
    });
  }
};

const getSuperAdminEmployee = (req, res) => {
  try {
    const sql = "SELECT * FROM userprofile WHERE role = 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetchingSuperAdmin_Employee from MySQL:", err);
        return res.status(500).json({
          success: false,
          error: "Error fetching SuperAdmin_Employee",
        });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No SuperAdmin_Employee found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "SuperAdmin_Employee fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching SuperAdmin_Employee from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching SuperAdmin_Employee",
      error: error.message,
    });
  }
};

const complainGetData = (req, res) => {
  try {
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM complaindata c LEFT JOIN userprofile u  ON c.userID = u.UserId ORDER BY id DESC`;

    // const sql =
    // "SELECT  u.*, p.package_name FROM userprofile u LEFT JOIN packagestable p ON u.package_Id = p.id WHERE u.Status = 'Active' AND role != 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error complaindata from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching complaindata" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No complaindata found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "complaindata fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching complaindata from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching complaindata",
      error: error.message,
    });
  }
};

const getPendingComplaintData = (req, res) => {
  try {
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM complaindata c LEFT JOIN userprofile u  ON c.userID = u.UserId  WHERE c.status = 'Pending'  ORDER BY id DESC`;

    // const sql =
    // "SELECT  u.*, p.package_name FROM userprofile u LEFT JOIN packagestable p ON u.package_Id = p.id WHERE u.Status = 'Active' AND role != 'SuperAdmin_Employee'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error complaindata from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching complaindata" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No complaindata found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "complaindata fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching complaindata from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching complaindata",
      error: error.message,
    });
  }
};

const resolveComplaint = (req, res) => {
  try {
    const { complaintId, response, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE complaindata SET response = ? , status = ? WHERE id = ?`;

    const values = [response, status, complaintId];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating Complaint:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to updating Complaint" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Complaint not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "updating Complaint successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getApplyOfflineForm = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE applicant_select_service != 'New Bank ID' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error apply_offline_form from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching apply_offline_form" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No apply_offline_form found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "apply_offline_form fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching apply_offline_form from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching apply_offline_form",
      error: error.message,
    });
  }
};

const ApproveOfflineForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating Complaint:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating apply_offline_form",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "apply_offline_form not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating apply_offline_form successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const markForEditOfflineForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error markForEditOfflineForm", error);
        return res.status(500).json({
          success: false,
          error: "Failed to markForEditOfflineForm apply_offline_form",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditOfflineForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating markForEditOfflineForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const SuccessOfflineForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error SuccessOfflineForm", error);
        return res.status(500).json({
          success: false,
          error: "Failed to SuccessOfflineForm apply_offline_form",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "SuccessOfflineForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating SuccessOfflineForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};


const rejectOfflineForm = (req, res) => {
  try {
    const { order_id, note, status,user_id,refundAmount } = req.body;

       // Validate `order_id`: Check for undefined, null, or invalid value
       if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing order_id",
        });
      }

       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing refund amount",
      });
    }

    const refundAmountNumber = parseFloat(refundAmount);

    // const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating Complaint:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating apply_offline_form",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "apply_offline_form not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating apply_offline_form successfully",
      // });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }

        const old_balance = results.length !== 0 ? results[0].Closing_Balance : 0;

        // Ensure `old_balance` is a valid number
        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }
  
        console.log(results)
        
        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;


         // Ensure all calculated balances are valid numbers
         if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid balance calculations",
          });
        }

        const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};



const getPANOfflineForm = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM pan_offline c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error pan_offline from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching pan_offline" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No pan_offline found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "pan_offline fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching pan_offline from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching pan_offline",
      error: error.message,
    });
  }
};

const ApprovePANOfflineForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE pan_offline SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating pan_offline:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to updating pan_offline" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "pan_offline not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "updating pan_offline successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const markForEditPANOfflineForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE pan_offline SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating markForEditPANOfflineForm:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to markForEditPANOfflineForm" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditPANOfflineForm not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "updating markForEditPANOfflineForm successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const SuccessPANOfflineForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE pan_offline SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error to SuccessPANOfflineForm:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to SuccessPANOfflineForm" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "pan_offline not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "updating SuccessPANOfflineForm successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const rejectPANOfflineForm = (req, res) => {
  try {
    const { order_id, note, status,user_id,refundAmount  } = req.body;
       // Validate `order_id`: Check for undefined, null, or invalid value
       if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing order_id",
        });
      }

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

          // Validate `refundAmount`: Check for undefined, null, or invalid number
          if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
            return res.status(400).json({
              success: false,
              error: "Invalid or missing refund amount",
            });
          }
      
          const refundAmountNumber = parseFloat(refundAmount);

    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE pan_offline SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating pan_offline:", error);
        return res
          .status(500)
          .json({ success: false, error: "Failed to updating pan_offline" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "pan_offline not found" });
      }

      // return res
      //   .status(200)
      //   .json({ success: true, message: "updating pan_offline successfully" });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
       
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

            // Ensure `old_balance` is a valid number
            if (isNaN(old_balance)) {
              return res.status(400).json({
                success: false,
                error: "Invalid closing balance in user wallet",
              });
            }


        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;
       // Ensure all calculated balances are valid numbers
       if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
        return res.status(400).json({
          success: false,
          error: "Invalid balance calculations",
        });
      }

      const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getBankIdForm = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE applicant_select_service = 'New Bank ID' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getBankIdForm from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getBankIdForm" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getBankIdForm found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getBankIdForm fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getBankIdForm from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getBankIdForm",
      error: error.message,
    });
  }
};

const ApproveBankIdForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ApproveBankIdForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ApproveBankIdForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "ApproveBankIdForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating ApproveBankIdForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const markForEditBankIdForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating markForEditBankIdForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating markForEditBankIdForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditBankIdForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating markForEditBankIdForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const SuccessBankIdForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating SuccessBankIdForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating SuccessBankIdForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "SuccessBankIdForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating SuccessBankIdForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const rejectBankIdForm = (req, res) => {
  try {
    const { order_id, note, status, user_id,refundAmount } = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing order_id",
      });
    }

     // Validate `refundAmount`: Check for undefined, null, or invalid number
  if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid or missing refund amount",
    });
  }

  const refundAmountNumber = parseFloat(refundAmount);



    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apply_offline_form SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectBankIdForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectBankIdForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectBankIdForm not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectBankIdForm successfully",
      // });
      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
  
        
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;
       
           // Ensure `old_balance` is a valid number
           if (isNaN(old_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid closing balance in user wallet",
            });
          }

        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;

       // Ensure all calculated balances are valid numbers
       if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
        return res.status(400).json({
          success: false,
          error: "Invalid balance calculations",
        });
      }

      const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });

    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getEdistrictForms = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM \`e-district-application\` c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getEdistrictForms from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getEdistrictForms" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getEdistrictForms found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getEdistrictForms fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getEdistrictForms from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getEdistrictForms",
      error: error.message,
    });
  }
};

const ApproveEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE \`e-district-application\` SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ApproveEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ApproveEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "ApproveEdistrictForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating ApproveEdistrictForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const markForEditEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE \`e-district-application\` SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating markForEditEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating markForEditEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditEdistrictForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating markForEditEdistrictForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const SuccessEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE \`e-district-application\` SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating SuccessEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating SuccessEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "SuccessEdistrictForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating SuccessEdistrictForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const rejectEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status, user_id,refundAmount } = req.body;
   
     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing order_id",
      });
    }

      // Validate `refundAmount`: Check for undefined, null, or invalid number
      if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing refund amount",
        });
      }
  
      const refundAmountNumber = parseFloat(refundAmount);


    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE \`e-district-application\` SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectEdistrictForm not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectEdistrictForm successfully",
      // });
      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
       
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

          // Ensure `old_balance` is a valid number
          if (isNaN(old_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid closing balance in user wallet",
            });
          }

        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;

         // Ensure all calculated balances are valid numbers
         if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid balance calculations",
          });
        }

        const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number

  
  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });

    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getVerifyEdistrictForms = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM verifyedistrict c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getVerifyEdistrictForms from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getVerifyEdistrictForms" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getVerifyEdistrictForms found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getVerifyEdistrictForms fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getVerifyEdistrictForms from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getVerifyEdistrictForms",
      error: error.message,
    });
  }
};

const ApproveVerifyEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE verifyedistrict SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ApproveVerifyEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ApproveVerifyEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "ApproveVerifyEdistrictForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating ApproveVerifyEdistrictForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const markForEditVerifyEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE verifyedistrict SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating markForEditVerifyEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating markForEditVerifyEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditVerifyEdistrictForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating markForEditVerifyEdistrictForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const SuccessVerifyEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE verifyedistrict SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating SuccessVerifyEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating SuccessVerifyEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "SuccessVerifyEdistrictForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating SuccessVerifyEdistrictForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const rejectVerifyEdistrictForm = (req, res) => {
  try {
    const { order_id, note, status, user_id,refundAmount  } = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing order_id",
      });
    }

      // Validate `refundAmount`: Check for undefined, null, or invalid number
      if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing refund amount",
        });
      }
  
      const refundAmountNumber = parseFloat(refundAmount);

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE verifyedistrict SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectVerifyEdistrictForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectVerifyEdistrictForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectVerifyEdistrictForm not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectVerifyEdistrictForm successfully",
      // });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
      
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

         // Ensure `old_balance` is a valid number
         if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }
        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;

          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }
  
          const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number
  
    

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getSambalForms = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM sambalform c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getSambalForms from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getSambalForms" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getSambalForms found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getSambalForms fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getSambalForms from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getSambalForms",
      error: error.message,
    });
  }
};

const ApproveSambalForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE sambalform SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ApproveSambalForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ApproveSambalForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "ApproveSambalForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating ApproveSambalForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const markForEditSambalForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE sambalform SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating markForEditSambalForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating markForEditSambalForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditSambalForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating markForEditSambalForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const SuccessSambalForm = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE sambalform SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating SuccessSambalForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating SuccessSambalForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "SuccessSambalForm not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating SuccessSambalForm successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const rejectSambalForm = (req, res) => {
  try {
    const { order_id, note, status , user_id,refundAmount } = req.body;

      // Validate `order_id`: Check for undefined, null, or invalid value
      if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing order_id",
        });
      }

       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing refund amount",
      });
    }

    const refundAmountNumber = parseFloat(refundAmount);

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE sambalform SET note = ? , status = ? WHERE order_id = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectSambalForm:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectSambalForm",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectSambalForm not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectSambalForm successfully",
      // });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
       
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

          // Ensure `old_balance` is a valid number
          if (isNaN(old_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid closing balance in user wallet",
            });
          }
        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;
          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }
  
          const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number
  

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getOfflineRecharge = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM offline_recharge c LEFT JOIN userprofile u  ON c.created_by_userid = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getOfflineRecharge from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOfflineRecharge" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOfflineRecharge found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOfflineRecharge fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOfflineRecharge from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOfflineRecharge",
      error: error.message,
    });
  }
};

const ApproveOfflineRecharge = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE offline_recharge SET note = ? , status = ? WHERE orderid = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ApproveOfflineRecharge:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ApproveOfflineRecharge",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "ApproveOfflineRecharge not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "updating ApproveOfflineRecharge successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
// const rejectOfflineRecharge = (req, res) => {
//   try {
//     const { order_id, note, status } = req.body;

//     const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//     // SQL query to update the package details
//     const sql = `UPDATE offline_recharge SET note = ? , status = ? WHERE orderid = ?`;

//     const values = [note, status, order_id];

//     db.query(sql, values, (error, results) => {
//       if (error) {
//         console.error("Error updating rejectOfflineRecharge:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Failed to updating rejectOfflineRecharge",
//         });
//       }

//       if (results.affectedRows === 0) {
//         return res
//           .status(404)
//           .json({ success: false, message: "rejectOfflineRecharge not found" });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "updating rejectOfflineRecharge successfully",
//       });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "An unexpected error occurred" });
//   }
// };

const rejectOfflineRecharge = (req, res) => {
  try {
    const { order_id, note, status , user_id,refundAmount } = req.body;

      // Validate `order_id`: Check for undefined, null, or invalid value
      if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing data",
        });
      }

       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing refund amount",
      });
    }

    const refundAmountNumber = parseFloat(refundAmount);

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE offline_recharge SET note = ? , status = ?  WHERE	orderid = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectOfflineRecharge:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectOfflineRecharge",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectOfflineRecharge not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectOfflineRecharge successfully",
      // });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
       
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

          // Ensure `old_balance` is a valid number
          if (isNaN(old_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid closing balance in user wallet",
            });
          }
        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;
          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }
  
          const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number
  

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const getOfflineDTHConnection = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM offline_dth_connection c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getOfflineDTHConnection from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOfflineDTHConnection" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOfflineDTHConnection found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOfflineDTHConnection fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOfflineDTHConnection from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOfflineDTHConnection",
      error: error.message,
    });
  }
};

const ApproveOfflineDTHConnection = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE offline_dth_connection SET note = ? , status = ? WHERE orderid = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ApproveOfflineDTHConnection:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ApproveOfflineDTHConnection",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "ApproveOfflineDTHConnection not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "updating ApproveOfflineDTHConnection successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const markForEditOfflineDTHConnection = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE offline_dth_connection SET note = ? , status = ? WHERE orderid = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating markForEditOfflineDTHConnection:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating markForEditOfflineDTHConnection",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "markForEditOfflineDTHConnection not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating markForEditOfflineDTHConnection successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const SuccessOfflineDTHConnection = (req, res) => {
  try {
    const { order_id, note, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE offline_dth_connection SET note = ? , status = ? WHERE orderid = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating SuccessOfflineDTHConnection:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating SuccessOfflineDTHConnection",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "SuccessOfflineDTHConnection not found" });
      }

      return res.status(200).json({
        success: true,
        message: "updating SuccessOfflineDTHConnection successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const rejectOfflineDTHConnection = (req, res) => {
  try {
    const { order_id, note, status , user_id,refundAmount } = req.body;

      // Validate `order_id`: Check for undefined, null, or invalid value
      if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing order_id",
        });
      }

       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing refund amount",
      });
    }

    const refundAmountNumber = parseFloat(refundAmount);

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE offline_dth_connection SET note = ? , status = ? WHERE orderid = ?`;

    const values = [note, status, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectOfflineDTHConnection:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectOfflineDTHConnection",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectOfflineDTHConnection not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectOfflineDTHConnection successfully",
      // });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
       
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

          // Ensure `old_balance` is a valid number
          if (isNaN(old_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid closing balance in user wallet",
            });
          }
        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;
          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }
  
          const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number
  

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
// const rejectOfflineDTHConnection = (req, res) => {
//   try {
//     const { order_id, note, status } = req.body;

//     const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//     // SQL query to update the package details
//     const sql = `UPDATE offline_dth_connection SET note = ? , status = ? WHERE orderid = ?`;

//     const values = [note, status, order_id];

//     db.query(sql, values, (error, results) => {
//       if (error) {
//         console.error("Error updating rejectOfflineDTHConnection:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Failed to updating rejectOfflineDTHConnection",
//         });
//       }

//       if (results.affectedRows === 0) {
//         return res.status(404).json({
//           success: false,
//           message: "rejectOfflineDTHConnection not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "updating rejectOfflineDTHConnection successfully",
//       });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "An unexpected error occurred" });
//   }
// };

const getWalletWithdrawRequests = (req, res) => {
  try {
    const sql = `SELECT * FROM user_wallet_withdraw_request ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getWalletWithdrawRequests from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getWalletWithdrawRequests" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getWalletWithdrawRequests found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getWalletWithdrawRequests fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getWalletWithdrawRequests from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getWalletWithdrawRequests",
      error: error.message,
    });
  }
};

// const ApproveWalletWithdrawRequests = (req, res) => {
//   try {
//     const { order_id, remark, Transaction_Id, status } = req.body;

//     const process_date = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//     // SQL query to update the package details
//     const sql = `UPDATE user_wallet_withdraw_request SET remark = ? , Transaction_Id = ?, process_date = ?,  status = ? WHERE order_id = ?`;

//     const values = [remark, Transaction_Id,process_date,status, order_id];

//     db.query(sql, values, (error, results) => {
//       if (error) {
//         console.error("Error updating Approve Wallet Withdraw Request:", error);
//         return res
//           .status(500)
//           .json({
//             success: false,
//             error: "Failed to updating Approve Wallet Withdraw Request",
//           });
//       }

//       if (results.affectedRows === 0) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message: "Approve Wallet Withdraw Request not found",
//           });
//       }

//       return res
//         .status(200)
//         .json({
//           success: true,
//           message: "updating Approve Wallet Withdraw Request successfully",
//         });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "An unexpected error occurred" });
//   }
// };

const getPendingWalletWithdrawRequests = (req, res) => {
  try {
    const sql = `SELECT * FROM user_wallet_withdraw_request WHERE status = 'Pending' ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getWalletWithdrawRequests from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getWalletWithdrawRequests" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            dataLength : 0,
            message: "No getWalletWithdrawRequests found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            dataLength : result.length ? result.length : 0,
            message: "getWalletWithdrawRequests fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getWalletWithdrawRequests from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getWalletWithdrawRequests",
      error: error.message,
    });
  }
};

const ApproveWalletWithdrawRequests = (req, res) => {
  try {
    const { order_id, remark, status,Transaction_Id } = req.body;
    // const Transaction_Id = `TXNW${Date.now()}`;
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the user_wallet_withdraw_request table
    const sql1 = `UPDATE user_wallet_withdraw_request SET remark = ?, Transaction_Id = ?, process_date = ?, status = ? WHERE order_id = ?`;
    const values1 = [remark, Transaction_Id, process_date, status, order_id];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating Approve Wallet Withdraw Request:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update Approve Wallet Withdraw Request",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Wallet Withdraw Request not found",
        });
      }
      return res
              .status(200)
              .json({
                success: true,
                message: "updating Approve Wallet Withdraw Request successfully",
              });


    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const rejectWalletWithdrawRequests = (req, res) => {
  try {
    const { order_id, remark, status,amount,user_id } = req.body;
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

        // Validate `order_id`: Check for undefined, null, or invalid value
        if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
          return res.status(400).json({
            success: false,
            error: "Invalid or missing order_id",
          });
        }
      
        
       // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }

    const AmountNumber = parseFloat(amount);

    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = remark;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");




    // SQL query to update the user_wallet_withdraw_request table
    const sql1 = `UPDATE user_wallet_withdraw_request SET remark = ?, process_date = ?, status = ? WHERE order_id = ?`;
    const values1 = [remark, process_date, status, order_id];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating Reject Wallet Withdraw Request:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update Reject Wallet Withdraw Request",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Wallet Withdraw Request not found",
        });
      }

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }

        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

        // Ensure `old_balance` is a valid number
        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }

        const opening_balance = Number(old_balance);
        const credit_amount = AmountNumber
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;
          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }
  
          const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number

          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject wallet withdrawal request and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getWalletTransactions = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM user_wallet c 
  LEFT JOIN userprofile u 
  ON c.userId = u.UserId COLLATE utf8mb4_unicode_ci 
  ORDER BY wid DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getWalletTransactions from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getWalletTransactions" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getWalletTransactions found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getWalletTransactions fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getWalletTransactions from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getWalletTransactions",
      error: error.message,
    });
  }
};

const getPendingWalletAddMoneyRequests = (req, res) => {
  try {
    const sql = `SELECT * FROM user_wallet_add_money_request WHERE status = 'Pending' ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingWalletAddMoneyRequests from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingWalletAddMoneyRequests" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            dataLength : 0,
            message: "No getPendingWalletAddMoneyRequests found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            dataLength : result.length ? result.length : 0,
            message: "getPendingWalletAddMoneyRequests fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getPendingWalletAddMoneyRequests from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingWalletAddMoneyRequests",
      error: error.message,
    });
  }
};


// const ApproveWalletAddMoneyRequests = (req, res) => {
//   try {
//     const { order_id,amount, remark, Transaction_Id, status } = req.body;
//     const process_date = moment()
//       .tz("Asia/Kolkata")
//       .format("YYYY-MM-DD HH:mm:ss");

//     // SQL query to update the user_wallet_withdraw_request table
//     const sql1 = `UPDATE user_wallet_add_money_request SET remark = ?, Transaction_Id = ?, process_date = ?, status = ? WHERE order_id = ?`;
//     const values1 = [remark, Transaction_Id, process_date, status, order_id];

//     db.query(sql1, values1, (error, results) => {
//       if (error) {
//         console.error("Error updating Approve Wallet Add Money Request:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Failed to update Approve Wallet Add Money Request",
//         });
//       }

//       if (results.affectedRows === 0) {
//         return res.status(404).json({
//           success: false,
//           message: "Wallet Add Money Request not found",
//         });
//       }

//       // SQL query to update the second table
//       const sql2 = `UPDATE user_wallet SET Transaction_Id = ?, 	Transaction_details = ? , status = ? WHERE Order_Id = ?`;
//       const values2 = [Transaction_Id, remark, status, order_id];

//       db.query(sql2, values2, (error, results) => {
//         if (error) {
//           console.error("Error updating user_wallet:", error);
//           return res.status(500).json({
//             success: false,
//             error: "Failed to update the user_wallet",
//           });
//         }

//         return res.status(200).json({
//           success: true,
//           message:
//             "Approve Wallet Add Money Request updated successfully in both tables",
//         });
//       });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "An unexpected error occurred" });
//   }
// };

const ApproveWalletAddMoneyRequests = (req, res) => {
  try {
    const {user_id, order_id, amount, remark, Transaction_Reference, status } = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing data",
      });
    }

         // Validate `Amount`: Check for undefined, null, or invalid number
         if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid or missing refund amount",
          });
        }
    
        const AmountNumber = parseFloat(amount);



    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type =  "Add wallet balance";
    const Transaction_details = "Approve Add wallet balance request"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    const process_date = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");

    // Query to get the user's current closing balance from the user_wallet table
    const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
    db.query(getClosingBalanceQuery, [user_id], (error, results) => {
      if (error) {
        console.error("Error fetching closing balance:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch closing balance",
        });
      }

      // if (results.length === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Wallet Add Money Request not found",
      //   });
      // }

     
      const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

        // Ensure `old_balance` is a valid number
        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }

      const opening_balance = Number(old_balance);
      const credit_amount = AmountNumber;
      const debit_amount = 0;
      let new_balance = credit_amount + opening_balance;

          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }

      new_balance = parseFloat(new_balance.toFixed(2)); // Convert back to a number


      

      // SQL query to update the user_wallet_add_money_request table
      const sql1 = `UPDATE user_wallet_add_money_request SET remark = ?, process_date = ?, status = ? WHERE order_id = ?`;
      const values1 = [remark, process_date, status, order_id];

      db.query(sql1, values1, (error, results) => {
        if (error) {
          console.error("Error updating Approve Wallet Add Money Request:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to update Approve Wallet Add Money Request",
          });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "Wallet Add Money Request not found",
          });
        }

        // SQL query to update the user_wallet table with new balance
      
        const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
        const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance,
          credit_amount,debit_amount,Transaction_Type,Transaction_details, status];

        db.query(sql2, values2, (error, results) => {
          if (error) {
            console.error("Error inserting into user_wallet:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to inserting into the user_wallet",
            });
          }

          return res.status(200).json({
            success: true,
            message:
              "Approve Wallet Add Money Request updated successfully in both tables",
          });
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const rejectWalletAddMoneyRequests = (req, res) => {
  try {
    const { order_id, remark, status} = req.body;
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the rejectWalletAddMoneyRequests table
    const sql1 = `UPDATE user_wallet_add_money_request SET remark = ?, process_date = ?, status = ? WHERE order_id = ?`;
    const values1 = [remark, process_date, status, order_id];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating reject Wallet Add Money Request:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update reject Wallet Add Money Request",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "reject Wallet Add Money Requests not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "updating reject Wallet Add Money Request successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getAllWalletAddMoneyRequests = (req, res) => {
  try {
    const sql = `SELECT * FROM user_wallet_add_money_request ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getAllWalletAddMoneyRequests from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getAllWalletAddMoneyRequests" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getAllWalletAddMoneyRequests found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getAllWalletAddMoneyRequests fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getAllWalletAddMoneyRequests from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getAllWalletAddMoneyRequests",
      error: error.message,
    });
  }
};

const getAllApiList = (req, res) => {
  try {
    const sql = `SELECT * FROM apisurl`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getAllApiList from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getAllApiList" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getAllApiList found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getAllApiList fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getAllApiList from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getAllApiList",
      error: error.message,
    });
  }
};

const ActiveApi = (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apisurl SET API_Status = ? WHERE id = ?`;

    const values = [status , id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ActiveApi:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ActiveApi",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "ActiveApi not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "updating ActiveApi successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const DeactiveApi = (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE apisurl SET API_Status = ? WHERE id = ?`;

    const values = [ status ,id ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating DeactiveApi:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating DeactiveApi",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "DeactiveApi not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "updating DeactiveApi successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getAllServicesList = (req, res) => {
  try {
    const sql = `SELECT * FROM serviceslist`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getAllServicesList from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getAllServicesList" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getAllServicesList found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getAllServicesList fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getAllServicesList from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getAllServicesList",
      error: error.message,
    });
  }
};

const ActiveServices = (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE serviceslist SET status = ? WHERE id = ?`;

    const values = [status , id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating ActiveServices:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating ActiveServices",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "ActiveServices not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "updating ActiveServices successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const DeactiveServices = (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE serviceslist SET status = ? WHERE id = ?`;

    const values = [ status ,id ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating DeactiveServices:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating DeactiveServices",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "DeactiveServices not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "updating DeactiveServices successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getSuperAdminSettings = (req, res) => {
  try {
    const sql = `SELECT * FROM super_admin_website_setting`;
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error super_admin_website_setting from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error super_admin_website_setting" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No super_admin_website_setting found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result[0],
            message: "super_admin_website_setting fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching super_admin_website_setting from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching super_admin_website_setting",
      error: error.message,
    });
  }
};

const UpdateGenralSetting = (req, res) => {
  try {
    const {
      id,
      Home_Page_1st_Paragraph,
      Home_Page_2nd_Paragraph,
      Email_Id,
      Calling_No,
      Whatsapp_No,
      App_Link,
      Bank_Holder_Name,
      Bank_Account_Number,
      IFSC_Code,
      Bank_Name,
      UPI_ID,
      Address,
      QR_Code_Preview
    } = req.body;
    console.log(req.body);
    
    // const QR_Code = req.files['QR_Code']?.[0];
    
    
   

    const domain = "https://bitspan.vimubds5.a2hosted.com";
    const QR_Code = req.files.QR_Code
    ? `${domain}/uploads/${req.files.QR_Code[0].filename}`
    : QR_Code_Preview;
    

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE super_admin_website_setting SET
        Home_Page_1st_Paragraph = ? ,
          Home_Page_2nd_Paragraph = ?,
      Email_Id = ?,
      Calling_No = ?,
      Whatsapp_No = ?,
      App_Link = ?,
      Bank_Holder_Name = ?,
      Bank_Account_Number = ?,
      IFSC_Code = ?,
      Bank_Name = ?,
      UPI_ID = ?,
      Address = ?,
      QR_Code = ?
      WHERE id = ?`;

    const values = [
      
      Home_Page_1st_Paragraph,
      Home_Page_2nd_Paragraph,
      Email_Id,
      Calling_No,
      Whatsapp_No,
      App_Link,
      Bank_Holder_Name,
      Bank_Account_Number,
      IFSC_Code,
      Bank_Name,
      UPI_ID,
      Address,
      QR_Code,
      id
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ success: false, error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};

const UpdateSocialLinkSetting = (req, res) => {
  try {
    const {
      id,
      Facebook_Link,
      Twitter_Link,
      LinkedIn_Link,
      Instagram_Link,
      Youtube_Link
      
    } = req.body;
    console.log(req.body);
 
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE super_admin_website_setting SET
        Facebook_Link = ? ,
          Twitter_Link = ?,
      LinkedIn_Link = ?,
      Instagram_Link = ?,
      Youtube_Link = ?
     
      WHERE id = ?`;

    const values = [
      
      Facebook_Link,
      Twitter_Link,
      LinkedIn_Link,
      Instagram_Link,
      Youtube_Link,
      id
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ success: false, error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};

const UpdateLogoImageSetting = (req, res) => {
  try {
    const {
      id,
      
        Home_Page_Background_Preview,
        Logo_Preview,
        Fav_Icon_Preview,
        Signature_With_Stamp_Preview
    } = req.body;
    console.log(req.body);
    
    // const QR_Code = req.files['QR_Code']?.[0];
    
    
   

    const domain = "https://bitspan.vimubds5.a2hosted.com";
    const Home_Page_Background = req.files.Home_Page_Background
    ? `${domain}/uploads/${req.files.Home_Page_Background[0].filename}`
    : Home_Page_Background_Preview;
    const Logo = req.files.Logo
    ? `${domain}/uploads/${req.files.Logo[0].filename}`
    : Logo_Preview;
    const Fav_Icon = req.files.Fav_Icon
    ? `${domain}/uploads/${req.files.Fav_Icon[0].filename}`
    : Fav_Icon_Preview;
    const Signature_With_Stamp = req.files.Signature_With_Stamp
    ? `${domain}/uploads/${req.files.Signature_With_Stamp[0].filename}`
    : Signature_With_Stamp_Preview;
    

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE super_admin_website_setting SET
        Home_Page_Background = ? ,
          Logo = ?,
      Fav_Icon = ?,
      Signature_With_Stamp = ?
      WHERE id = ?`;

    const values = [
      
      
     
      Home_Page_Background,
      Logo,
      Fav_Icon,
      Signature_With_Stamp,
      id
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ success: false, error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};

const UpdateHomePageSetting = (req, res) => {
  try {
    const {
      id,
      Theme_Design,
      Company_Name,
      About_Us,
      Notice,
      Training_Video_Link,
      Show_Offer_Banner,
      Offer_Banner_Preview,
      Google_Map_Link
    } = req.body;
    console.log(req.body);
    
    
    
   

    const domain = "https://bitspan.vimubds5.a2hosted.com";
    const Offer_Banner = req.files.Offer_Banner
    ? `${domain}/uploads/${req.files.Offer_Banner[0].filename}`
    : Offer_Banner_Preview;
    

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE super_admin_website_setting SET
        Theme_Design = ? ,
          Company_Name = ?,
      About_Us = ?,
      Notice = ?,
      Training_Video_Link = ?,
      Show_Offer_Banner = ?,
      Offer_Banner = ?,
      Google_Map_Link = ?
     
      WHERE id = ?`;

    const values = [
      
      Theme_Design,
      Company_Name,
      About_Us,
      Notice,
      Training_Video_Link,
      Show_Offer_Banner,
      Offer_Banner,
      Google_Map_Link,
      id
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({success: false, error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({success: false, message: "Package not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({success: false, error: "An unexpected error occurred" });
  }
};
const getUserNotification = (req, res) => {
  try {
    const sql = `SELECT * FROM user_notification`;
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error user_notification from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error user_notification" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No user_notification found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result[0],
            message: "user_notification fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching super_admin_website_setting from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching super_admin_website_setting",
      error: error.message,
    });
  }
};

const UpdateUserNotification = (req, res) => {
  try {
    const {
      id,
      White_Label_Notification,
      Super_Distributor_Notification,
      Distributor_Notification,
      Retailer_Notification
      
    } = req.body;
    console.log(req.body);
 
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE user_notification SET
        White_Label_Notification = ? ,
          Super_Distributor_Notification = ?,
      Distributor_Notification = ?,
      Retailer_Notification = ?
     
      WHERE id = ?`;

    const values = [
      
      White_Label_Notification,
      Super_Distributor_Notification,
      Distributor_Notification,
      Retailer_Notification,
      id
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ success: false, error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};

const UpdateSAWebsiteJoiningPrice = (req, res) => {
  try {
    const {
      id,
      Retailer_Joining_Price,
      Distributor_Joining_Price,
      Super_Distributor_Joining_Price,
      White_Label_Joining_Price,
      
    } = req.body;
    console.log(req.body);
 
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE super_admin_website_setting SET
        Retailer_Joining_Price = ? ,
          Distributor_Joining_Price = ?,
      Super_Distributor_Joining_Price = ?,
      White_Label_Joining_Price = ?
      WHERE id = ?`;

    const values = [
      
      Retailer_Joining_Price,
      Distributor_Joining_Price,
      Super_Distributor_Joining_Price,
      White_Label_Joining_Price,
      id
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ success: false, error: "Failed to UpdateSAWebsiteJoiningPrice" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "UpdateSAWebsiteJoiningPrice successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};

const AddWalletAddMoneyDirect = (req, res) => {
  try {
    const {userId, amount, Transaction_details, status } = req.body;
    
      // Validate `order_id`: Check for undefined, null, or invalid value
      if ( !status || !userId) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing order_id",
        });
      }


       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }

    const AmountNumber = parseFloat(amount);


    const Transaction_Type =  "Add wallet balance";
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
      const Order_Id = `ORW${Date.now()}`;
      const Transaction_Id = `TXNW${Date.now()}`;
    const process_date = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");

    // Query to get the user's current closing balance from the user_wallet table
    const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
    db.query(getClosingBalanceQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching closing balance:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch closing balance",
        });
      }

      // if (results.length === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Wallet Add Money Request not found",
      //   });
      // }

      console.log(results)
      const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

      
        // Ensure `old_balance` is a valid number
        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }


      const opening_balance = Number(old_balance);
      const credit_amount = AmountNumber;
      const debit_amount = 0;
      let new_balance = credit_amount + opening_balance;

        // Ensure all calculated balances are valid numbers
        if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid balance calculations",
          });
        }
      new_balance = parseFloat(new_balance.toFixed(2)); // Convert back to a number


        // SQL query to update the user_wallet table with new balance
      
        const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
        const values2 = [userId,transaction_date , Order_Id,Transaction_Id, opening_balance, new_balance,
          credit_amount,debit_amount,Transaction_Type,Transaction_details, status];

        db.query(sql2, values2, (error, results) => {
          if (error) {
            console.error("Error inserting into user_wallet:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to inserting into the user_wallet",
            });
          }

          return res.status(200).json({
            success: true,
            message:
              "Add wallet Money Direct Success",
          });
        });
      });
   
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const WithdrawWalletAddMoneyDirect = (req, res) => {
  try {
    const {userId, amount, Transaction_details, status } = req.body;

      // Validate `order_id`: Check for undefined, null, or invalid value
      if ( !status || !userId) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing order_id",
        });
      }

             // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }

    const AmountNumber = parseFloat(amount);

    const Transaction_Type =  "Withdraw wallet balance";
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
      const Order_Id = `ORW${Date.now()}`;
      const Transaction_Id = `TXNW${Date.now()}`;
    const process_date = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");

    // Query to get the user's current closing balance from the user_wallet table
    const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
    db.query(getClosingBalanceQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching closing balance:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch closing balance",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User have no wallet money",
        });
      }

     
      const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

        // Ensure `old_balance` is a valid number
        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }

      const opening_balance = Number(old_balance);
      const credit_amount = 0;
      const debit_amount = AmountNumber;
      let new_balance =  opening_balance - debit_amount;

       // Ensure all calculated balances are valid numbers
       if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
        return res.status(400).json({
          success: false,
          error: "Invalid balance calculations",
        });
      }
      new_balance = parseFloat(new_balance.toFixed(2)); // Convert back to a number

      if (opening_balance < debit_amount) {
        return res.status(404).json({
          success: false,
          message: "User have not sufficient wallet money to process this transaction",
        });
      }


        // SQL query to update the user_wallet table with new balance
      
        const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
        const values2 = [userId,transaction_date , Order_Id,Transaction_Id, opening_balance, new_balance,
          credit_amount,debit_amount,Transaction_Type,Transaction_details, status];

        db.query(sql2, values2, (error, results) => {
          if (error) {
            console.error("Error inserting into user_wallet:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to inserting into the user_wallet",
            });
          }

          return res.status(200).json({
            success: true,
            message:
              "Withdraw wallet Money Direct Success",
          });
        });
      });
   
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getBuyUserIdSummary = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM userId_bought_summary c 
  LEFT JOIN userprofile u 
  ON c.userId = u.UserId COLLATE utf8mb4_unicode_ci 
  ORDER BY bid DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getBuyUserIdSummary from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getBuyUserIdSummary" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getBuyUserIdSummary found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getBuyUserIdSummary fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getBuyUserIdSummary from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getBuyUserIdSummary",
      error: error.message,
    });
  }
};

const getOnlineRecharge = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM recharges c 
  LEFT JOIN userprofile u 
  ON c.created_by_userid = u.UserId ORDER BY id DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getOnlineRecharge from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOnlineRecharge" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOnlineRecharge found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOnlineRecharge fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOnlineRecharge from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOnlineRecharge",
      error: error.message,
    });
  }
};

const getOnlineDthConnection = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM dth_connection c 
  LEFT JOIN userprofile u 
  ON c.user_id = u.UserId ORDER BY id DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getOnlineRecharge from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOnlineDthConnection" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOnlineDthConnection found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOnlineDthConnection fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOnlineDthConnection from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOnlineDthConnection",
      error: error.message,
    });
  }
};

const getPanCouponRequests = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM pan_coupon_requests c 
  LEFT JOIN userprofile u 
  ON c.user_id = u.UserId ORDER BY id DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPanCouponRequests from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPanCouponRequests" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getPanCouponRequests found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getPanCouponRequests fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPanCouponRequests from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPanCouponRequests",
      error: error.message,
    });
  }
};

const approvePanCouponRequest = (req, res) => {
  try {
    const { order_id, note, status} = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing data",
      });
    }
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");



    // SQL query to update the rejectWalletAddMoneyRequests table
    const sql1 = `UPDATE pan_coupon_requests SET note = ?, process_date = ?, status = ? WHERE order_id = ?`;
    const values1 = [note, process_date, status, order_id];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating approvePanCouponRequest:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update approvePanCouponRequest",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "approvePanCouponRequest not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "approvePanCouponRequest successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const rejectPanCouponRequest = (req, res) => {
  try {
    const { order_id, note, status , user_id,refundAmount } = req.body;

      // Validate `order_id`: Check for undefined, null, or invalid value
      if (!order_id || typeof order_id !== "string" || order_id.trim() === "" || !status || !user_id) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing data",
        });
      }

       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (refundAmount == null || isNaN(parseFloat(refundAmount)) || parseFloat(refundAmount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing refund amount",
      });
    }

    const refundAmountNumber = parseFloat(refundAmount);

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Refund";
    const Transaction_details = note;
    const Transaction_status = "Success"
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE pan_coupon_requests SET note = ? , status = ? , process_date = ? WHERE order_id = ?`;

    const values = [note, status,updatedAt, order_id];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating rejectPanCouponRequest:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to updating rejectPanCouponRequest",
        });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "rejectPanCouponRequest not found" });
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "updating rejectPanCouponRequest successfully",
      // });

      const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
      db.query(getClosingBalanceQuery, [user_id], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }
  
        // if (results.length === 0) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Wallet Add Money Request not found",
        //   });
        // }
  
       
        const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

          // Ensure `old_balance` is a valid number
          if (isNaN(old_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid closing balance in user wallet",
            });
          }
        const opening_balance = Number(old_balance);
        const credit_amount = refundAmountNumber;
        const debit_amount = 0;
        const new_balance = credit_amount + opening_balance;
          // Ensure all calculated balances are valid numbers
          if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
            return res.status(400).json({
              success: false,
              error: "Invalid balance calculations",
            });
          }
  
          const new_balance_final = parseFloat(new_balance.toFixed(2)); // Ensure `new_balance` remains a number
  

  
  
          // SQL query to update the user_wallet table with new balance
        
          const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
          const values2 = [user_id,transaction_date , order_id,Transaction_Id, opening_balance, new_balance_final,
            credit_amount,debit_amount,Transaction_Type,Transaction_details, Transaction_status];
  
          db.query(sql2, values2, (error, results) => {
            if (error) {
              console.error("Error inserting into user_wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to inserting refund amount into the user_wallet",
              });
            }
  
            return res.status(200).json({
              success: true,
              message:
                "Reject the form and refund money successfully",
            });
          });
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getUserRelationData = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
    SELECT DISTINCT c.*, u.UserName, u.role, u.ContactNo, u.Email 
    FROM user_relations c
    LEFT JOIN userprofile u 
    ON c.UserId = u.UserId
    GROUP BY c.UserId
    ORDER BY c.ur_id DESC
  `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getUserRelationData from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getUserRelationData" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getUserRelationData found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getUserRelationData fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getUserRelationData from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getUserRelationData",
      error: error.message,
    });
  }
};

const changeUserWhiteLabel = (req, res) => {
  try {
    const { WhiteLabelId, UserId} = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!WhiteLabelId || !UserId) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing data",
      });
    }
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");



    // SQL query to update the rejectWalletAddMoneyRequests table
    const sql1 = `UPDATE user_relations SET white_lable = ? WHERE UserId = ?`;
    const values1 = [WhiteLabelId,UserId];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating changeUserWhiteLabel:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update changeUserWhiteLabel",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "changeUserWhiteLabel not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "changeUserWhiteLabel successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const changeUserSuperDistributor = (req, res) => {
  try {
    const { superDistributorID, UserId} = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!superDistributorID || !UserId) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing data",
      });
    }
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");



    // SQL query to update the rejectWalletAddMoneyRequests table
    const sql1 = `UPDATE user_relations SET superDistributor = ? WHERE UserId = ?`;
    const values1 = [superDistributorID,UserId];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating changeUserSuperDistributor:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update changeUserSuperDistributor",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "changeUserSuperDistributor not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "changeUserSuperDistributor successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
const changeUserDistributor = (req, res) => {
  try {
    const { distributorID, UserId} = req.body;

     // Validate `order_id`: Check for undefined, null, or invalid value
     if (!distributorID || !UserId) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing data",
      });
    }
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");



    // SQL query to update the rejectWalletAddMoneyRequests table
    const sql1 = `UPDATE user_relations SET distributor = ? WHERE UserId = ?`;
    const values1 = [distributorID,UserId];

    db.query(sql1, values1, (error, results) => {
      if (error) {
        console.error("Error updating changeUserDistributor:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update changeUserDistributor",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "changeUserDistributor not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "changeUserDistributor successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const ChangeUserInfo = (req, res) => {
  try {
    const {  UserId,
      ContactNo ,
      Email,
      PackageId,
      White_Label_Website_URL } = req.body;

    if (!UserId || !ContactNo || !Email || !PackageId ) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }

    // If the package is not allocated to any user, proceed to delete
    const Sql = `UPDATE userprofile SET ContactNo = ? , Email = ? , package_Id = ? , White_Label_Website_URL = ? WHERE UserId = ?`;
    db.query(Sql, [ContactNo ,Email ,PackageId,White_Label_Website_URL, UserId], (Error, Results) => {
      if (Error) {
        console.error("Error Change User Info:", Error);
        return res.status(500).json({ error: "Failed to Change User Info" });
      }

      if (Results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Change User Info  successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getOnlinePanApplyData = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM nsdlpan c 
  LEFT JOIN userprofile u 
  ON c.userId = u.UserId ORDER BY id DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getOnlinePanApplyData from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOnlinePanApplyData" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOnlinePanApplyData found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOnlinePanApplyData fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOnlinePanApplyData from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOnlinePanApplyData",
      error: error.message,
    });
  }
};
const getOnlinePanCorrectionData = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM nsdlpancorrection c 
  LEFT JOIN userprofile u 
  ON c.userId = u.UserId ORDER BY id DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getOnlinePanCorrectionData from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOnlinePanCorrectionData" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOnlinePanCorrectionData found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOnlinePanCorrectionData fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOnlinePanCorrectionData from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOnlinePanCorrectionData",
      error: error.message,
    });
  }
};

const getTodayWalletTransactions = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const today_date = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD");
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM user_wallet c 
  LEFT JOIN userprofile u 
  ON c.userId = u.UserId COLLATE utf8mb4_unicode_ci WHERE DATE(c.transaction_date) = '${today_date}'
  ORDER BY wid DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getTodayWalletTransactions from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getTodayWalletTransactions" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getTodayWalletTransactions found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getTodayWalletTransactions fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getTodayWalletTransactions from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getTodayWalletTransactions",
      error: error.message,
    });
  }
};

const getDTHConnectionPlans = (req, res) => {
  try {
    const sql = `SELECT * FROM dth_connection_plans`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getDTHConnectionPlans from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getDTHConnectionPlans" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getDTHConnectionPlans found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getDTHConnectionPlans fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error(
      "Error fetching getDTHConnectionPlans from MySQL:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error in fetching getDTHConnectionPlans",
      error: error.message,
    });
  }
};

const CreateDTHConnectionPlans = (req, res) => {
  try {
    const {
      operator,
      amount,
      validity
    } = req.body;

    if (!operator || !amount || !validity ) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }


    // const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    // const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
         // Validate `refundAmount`: Check for undefined, null, or invalid number
         if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid or missing amount",
          });
        }

    const sql = `INSERT INTO dth_connection_plans (
        operator , amount ,validity	
    ) VALUES (?, ?, ?)`;

    const values = [
      operator,
      amount,
      validity
    ];

    db.query(sql, values, (err, result) => {
      if (err) throw err; // Will be caught by the catch block
      res.status(200).send({
        success: true,
        message: "Data inserted successfully",
        data: result,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error inserting data",
      details: error.message,
    });
  }
};

const EditDTHConnetionPlans = (req, res) => {
  try {
    const {  id,
      amount,
      validity } = req.body;

    if (!id || !amount || !validity ) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }

    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }

    // If the package is not allocated to any user, proceed to delete
    const Sql = `UPDATE dth_connection_plans SET amount = ? , validity = ?  WHERE id = ?`;
    db.query(Sql, [amount,validity,id], (Error, Results) => {
      if (Error) {
        console.error("Error Change plan:", Error);
        return res.status(500).json({ error: "Failed to Change plan" });
      }

      if (Results.affectedRows === 0) {
        return res.status(404).json({ message: "Plan not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Change plan successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const DeleteDTHConnetionPlans = (req, res) => {
  try {
    const {  id } = req.body;

    if (!id) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }


    // If the package is not allocated to any user, proceed to delete
    const Sql = `DELETE FROM dth_connection_plans WHERE id = ?`;
    db.query(Sql, [id], (Error, Results) => {
      if (Error) {
        console.error("Error Change plan:", Error);
        return res.status(500).json({ error: "Failed to delete plan" });
      }

      if (Results.affectedRows === 0) {
        return res.status(404).json({ message: "Plan not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Delete plan successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getPendingOfflineRecharge = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM offline_recharge c LEFT JOIN userprofile u  ON c.created_by_userid = u.UserId  WHERE c.status = 'Pending'  ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingOfflineRecharge from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingOfflineRecharge" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No getPendingOfflineRecharge found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "getPendingOfflineRecharge fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPendingOfflineRecharge from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingOfflineRecharge",
      error: error.message,
    });
  }
};

const getPendingApplyOfflineForm = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE applicant_select_service != 'New Bank ID' AND c.status = 'Pending'  ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error apply_offline_form from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching apply_offline_form" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No apply_offline_form found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "apply_offline_form fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching apply_offline_form from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching apply_offline_form",
      error: error.message,
    });
  }
};

const getPendingPANOfflineForm = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM pan_offline c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE c.status = 'Pending' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error pan_offline from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching pan_offline" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No pan_offline found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "pan_offline fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching pan_offline from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching pan_offline",
      error: error.message,
    });
  }
};

const getPendingBankIdForm = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE applicant_select_service = 'New Bank ID' AND c.status = 'Pending' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingBankIdForm from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingBankIdForm" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No getPendingBankIdForm found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "getPendingBankIdForm fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPendingBankIdForm from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingBankIdForm",
      error: error.message,
    });
  }
};

const getPendingEdistrictForms = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM \`e-district-application\` c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE c.status = 'Pending' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingEdistrictForms from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingEdistrictForms" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No getPendingEdistrictForms found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "getPendingEdistrictForms fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPendingEdistrictForms from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingEdistrictForms",
      error: error.message,
    });
  }
};

const getPendingVerifyEdistrictForms = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM verifyedistrict c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE c.status = 'Pending' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingVerifyEdistrictForms from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingVerifyEdistrictForms" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No getPendingVerifyEdistrictForms found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "getPendingVerifyEdistrictForms fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPendingVerifyEdistrictForms from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingVerifyEdistrictForms",
      error: error.message,
    });
  }
};

const getPendingSambalForms = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;
    const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM sambalform c LEFT JOIN userprofile u  ON c.user_id = u.UserId WHERE c.status = 'Pending' ORDER BY id DESC`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingSambalForms from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingSambalForms" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No getPendingSambalForms found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "getPendingSambalForms fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPendingSambalForms from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingSambalForms",
      error: error.message,
    });
  }
};
const getPendingPanCouponRequests = (req, res) => {
  try {
    // const sql = `SELECT * FROM user_wallet ORDER BY wid DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM user_wallet c LEFT JOIN userprofile u  ON c.userId = u.UserId ORDER BY wid DESC`;
    const sql = `
  SELECT c.*, u.UserName, u.role, u.ContactNo, u.Email 
  FROM pan_coupon_requests c 
  LEFT JOIN userprofile u 
  ON c.user_id = u.UserId WHERE c.status = 'Pending' ORDER BY id DESC
`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getPendingPanCouponRequests from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getPendingPanCouponRequests" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: 0,
            message: "No getPendingPanCouponRequests found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result.length,
            message: "getPendingPanCouponRequests fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getPendingPanCouponRequests from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getPendingPanCouponRequests",
      error: error.message,
    });
  }
};
const getUserPackageDetails = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `SELECT p.* FROM userprofile u JOIN packagestable p ON u.package_Id = p.id WHERE u.UserId = ?`;
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching Package details from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching Package details" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No Package details found",
          });
        } else {
          // Remove the password field from each user object
          // const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: result,
            message: "Package details fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching Package details from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching Package details",
      error: error.message,
    });
  }
};

const CreditCommission = (req, res) => {
  try {
    const {userId, amount, Transaction_details, status } = req.body;
    
      // Validate `order_id`: Check for undefined, null, or invalid value
      if ( !status || !userId) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing user id",
        });
      }


       // Validate `refundAmount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }

    const AmountNumber = parseFloat(amount);


    const Transaction_Type =  "Credit";
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
      const Order_Id = `ORW${Date.now()}`;
      const Transaction_Id = `TXNW${Date.now()}`;
    const process_date = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");

    // Query to get the user's current closing balance from the user_wallet table
    const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
    
    db.query(getClosingBalanceQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching closing balance:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch closing balance",
        });
      }

      // if (results.length === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Wallet Add Money Request not found",
      //   });
      // }

      console.log(results)
      const old_balance = results.length != 0 ?  results[0].Closing_Balance : 0;

      
        // Ensure `old_balance` is a valid number
        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }


      const opening_balance = Number(old_balance);
      const credit_amount = AmountNumber;
      const debit_amount = 0;
      let new_balance = credit_amount + opening_balance;

        // Ensure all calculated balances are valid numbers
        if (isNaN(opening_balance) || isNaN(credit_amount) || isNaN(new_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid balance calculations",
          });
        }
      new_balance = parseFloat(new_balance.toFixed(2)); // Convert back to a number


        // SQL query to update the user_wallet table with new balance
      
        const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id , Transaction_Id , Opening_Balance, Closing_Balance , credit_amount, debit_amount,Transaction_Type,Transaction_details ,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
        const values2 = [userId,transaction_date , Order_Id,Transaction_Id, opening_balance, new_balance,
          credit_amount,debit_amount,Transaction_Type,Transaction_details, status];

        db.query(sql2, values2, (error, results) => {
          if (error) {
            console.error("Error inserting into user_wallet:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to inserting into the user_wallet",
            });
          }

          return res.status(200).json({
            success: true,
            message:
              "Credit Commission Success",
          });
        });
      });
   
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};


module.exports = {
  addPackage,
  getPackages,
  editPackage,
  deletePackage,
  getAllUsers,
  getPendingUsers,
  getPendingPaymentUsers,
  getActiveUsers,
  getdeactiveUsers,
  approveUser,
  rejectUser,
  deactivateUser,
  activateUser,
  getUserRelations,
  markPaymentComplete,
  getUserIdPriceList,
  addUserIdPrice,
  updateUserIdPrice,
  getSuperAdminEmployee,
  complainGetData,
  getPendingComplaintData,
  resolveComplaint,

  getApplyOfflineForm,
  ApproveOfflineForm,
  markForEditOfflineForm,
  SuccessOfflineForm,
  rejectOfflineForm,
  getPANOfflineForm,
  ApprovePANOfflineForm,
  markForEditPANOfflineForm,
  SuccessPANOfflineForm,
  rejectPANOfflineForm,
  getBankIdForm,
  ApproveBankIdForm,
  markForEditBankIdForm,
  SuccessBankIdForm,
  rejectBankIdForm,
  getEdistrictForms,
  ApproveEdistrictForm,
  markForEditEdistrictForm,
  SuccessEdistrictForm,
  rejectEdistrictForm,
  getVerifyEdistrictForms,
  ApproveVerifyEdistrictForm,
  markForEditVerifyEdistrictForm,
  SuccessVerifyEdistrictForm,
  rejectVerifyEdistrictForm,
  getSambalForms,
  ApproveSambalForm,
  markForEditSambalForm,
  SuccessSambalForm,
  rejectSambalForm,
  getOfflineRecharge,
  ApproveOfflineRecharge,
  rejectOfflineRecharge,
  getOfflineDTHConnection,
  ApproveOfflineDTHConnection,
  markForEditOfflineDTHConnection,
  SuccessOfflineDTHConnection,
  rejectOfflineDTHConnection,

  getWalletWithdrawRequests,
  getPendingWalletWithdrawRequests,
  ApproveWalletWithdrawRequests,
  rejectWalletWithdrawRequests,
  getWalletTransactions,
  getPendingWalletAddMoneyRequests,
  ApproveWalletAddMoneyRequests,
  rejectWalletAddMoneyRequests,
  getAllWalletAddMoneyRequests,
  getAllApiList,
  ActiveApi,
  DeactiveApi,
  getAllServicesList,
  ActiveServices,
  DeactiveServices,
  getSuperAdminSettings,
  UpdateGenralSetting,
  UpdateSocialLinkSetting,
  UpdateLogoImageSetting,
  UpdateHomePageSetting,
  getUserNotification,
  UpdateUserNotification,
  UpdateSAWebsiteJoiningPrice,

  AddWalletAddMoneyDirect,
  WithdrawWalletAddMoneyDirect,
  
  getBuyUserIdSummary,
  getOnlineRecharge,
  getOnlineDthConnection,
  getPanCouponRequests,
  approvePanCouponRequest,
  rejectPanCouponRequest,
  getUserRelationData,
  changeUserWhiteLabel,
  changeUserDistributor,
  changeUserSuperDistributor,
  ChangeUserInfo,
  getOnlinePanApplyData,
  getOnlinePanCorrectionData,
  getTodayWalletTransactions,
  getDTHConnectionPlans,
  CreateDTHConnectionPlans,
  EditDTHConnetionPlans,
  DeleteDTHConnetionPlans,
  getPendingOfflineRecharge,
  getPendingApplyOfflineForm,
  getPendingPANOfflineForm,
  getPendingBankIdForm,
  getPendingEdistrictForms,
  getPendingVerifyEdistrictForms,
  getPendingSambalForms,
  getPendingPanCouponRequests,
  getUserPackageDetails,
  CreditCommission


};
