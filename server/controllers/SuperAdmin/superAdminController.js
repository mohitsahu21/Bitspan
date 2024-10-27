const moment = require("moment-timezone");
const { db } = require("../../connect");
const dotenv = require("dotenv");
dotenv.config();

const addPackage = (req, res) => {
  try {
    const {


      package_name,
      package_for,
      Google_Play_Price,
      IRCTC_Agent_ID_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Income_Certificate_Price,
      Domicile_Certificate_Price,
      Bank_ID_Price,
      Offline_Services_Commission_Type,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Income_Certificate_Commission,
      Domicile_Certificate_Commission,
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
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
    } = req.body;

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    const sql = `INSERT INTO packagestable (
        package_name, package_for, Google_Play_Price, IRCTC_Agent_ID_Price, Birth_Certificate_Price, Death_Certificate_Price,
        E_Stamp_Price, ITR_Registration_Price, GST_Registration_Price, Sambal_Price, Income_Certificate_Price,
        Domicile_Certificate_Price, Bank_ID_Price, Offline_Services_Commission_Type, Google_Play_Commission,
        IRCTC_Agent_ID_Commission, Birth_Certificate_Commission, Death_Certificate_Commission, E_Stamp_Commission,
        ITR_Registration_Commission, GST_Registration_Commission, Sambal_Commission, Income_Certificate_Commission,
        Domicile_Certificate_Commission, Bank_ID_Commission, Off_Prepaid_Recharge_Comm_Type, Off_Airtel_Prepaid_Recharge_Comm,
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
    Off_Airtel_New_DTH_Connection_Commission,
        Online_Electricity_Bill_Pay_Commission_Type, Online_Electricity_Bill_Pay_Commission,
        Offline_Electricity_Bill_Pay_Commission_Type, Offline_Electricity_Bill_Pay_Commission,
        Online_Insurance_Pay_Commission_Type, Online_Insurance_Pay_Commission, Offline_Insurance_Pay_Commission_Type,
        Offline_Insurance_Pay_Commission, PAN_Card_Commission_Type, E_PAN_Card_Commission, UTI_PAN_Coupon_Commission, P_PAN_Card_Commission , created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ?, ?, ? ,?, ? , ? , ? , ?)`;

    const values = [
      package_name,
      package_for,
      Google_Play_Price,
      IRCTC_Agent_ID_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Income_Certificate_Price,
      Domicile_Certificate_Price,
      Bank_ID_Price,
      Offline_Services_Commission_Type,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Income_Certificate_Commission,
      Domicile_Certificate_Commission,
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
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
      createdAt,
    ];

    db.query(sql, values, (err, result) => {
      if (err) throw err; // Will be caught by the catch block
      res
        .status(200)
        .send({ success: true, message: "Data inserted successfully", data: result });
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error: "Error inserting data", details: error.message });
  }
};


const getPackages = (req,res) =>{
       try {
        const sql = "SELECT * FROM packagestable"

        db.query(sql , (err,result) =>{
          if(err){
            console.error("Error fetching packages from MySql:", err);
        res.status(500).json({ success: false, error: "Error fetching packages" });
          }
          else{
            res.status(200).json({ success : true, data : result ,message : "packages fetch successfully"})
          }
        })
        
       } catch (error) {
        console.error("Error fetching Branches from MySql:", error);
        res.status(500).json({
          success: false,
          message: "Error in fetched Branches",
          error: error.message,
        });
        
       }
}

const getPendingUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM userprofile WHERE Status = 'Pending'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching pending users from MySQL:", err);
      return  res.status(500).json({ success: false, error: "Error fetching users" });
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

        return  res.status(200).json({
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
    const sql = "SELECT * FROM userprofile WHERE Status = 'Active'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching Active users from MySQL:", err);
      return  res.status(500).json({ success: false, error: "Error fetching users" });
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

        return  res.status(200).json({
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
    const sql = "SELECT * FROM userprofile WHERE Status = 'Deactive'";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching Deactive users from MySQL:", err);
      return  res.status(500).json({ success: false, error: "Error fetching users" });
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

        return  res.status(200).json({
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
      Google_Play_Price,
      IRCTC_Agent_ID_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Income_Certificate_Price,
      Domicile_Certificate_Price,
      Bank_ID_Price,
      Offline_Services_Commission_Type,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Income_Certificate_Commission,
      Domicile_Certificate_Commission,
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
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission
    } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE packagestable SET
        package_name = ?, package_for = ?, Google_Play_Price = ?, IRCTC_Agent_ID_Price = ?, 
        Birth_Certificate_Price = ?, Death_Certificate_Price = ?, E_Stamp_Price = ?, ITR_Registration_Price = ?, 
        GST_Registration_Price = ?, Sambal_Price = ?, Income_Certificate_Price = ?, Domicile_Certificate_Price = ?, 
        Bank_ID_Price = ?, Offline_Services_Commission_Type = ?, Google_Play_Commission = ?, 
        IRCTC_Agent_ID_Commission = ?, Birth_Certificate_Commission = ?, Death_Certificate_Commission = ?, 
        E_Stamp_Commission = ?, ITR_Registration_Commission = ?, GST_Registration_Commission = ?, Sambal_Commission = ?, 
        Income_Certificate_Commission = ?, Domicile_Certificate_Commission = ?, Bank_ID_Commission = ?, 
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
        Online_Electricity_Bill_Pay_Commission_Type = ?, Online_Electricity_Bill_Pay_Commission = ?, 
        Offline_Electricity_Bill_Pay_Commission_Type = ?, Offline_Electricity_Bill_Pay_Commission = ?, 
        Online_Insurance_Pay_Commission_Type = ?, Online_Insurance_Pay_Commission = ?, 
        Offline_Insurance_Pay_Commission_Type = ?, Offline_Insurance_Pay_Commission = ?, 
        PAN_Card_Commission_Type = ?, E_PAN_Card_Commission = ?, UTI_PAN_Coupon_Commission = ?, 
        P_PAN_Card_Commission = ?, updated_at = ? 
      WHERE id = ?`;

    const values = [
      package_name,
      package_for,
      Google_Play_Price,
      IRCTC_Agent_ID_Price,
      Birth_Certificate_Price,
      Death_Certificate_Price,
      E_Stamp_Price,
      ITR_Registration_Price,
      GST_Registration_Price,
      Sambal_Price,
      Income_Certificate_Price,
      Domicile_Certificate_Price,
      Bank_ID_Price,
      Offline_Services_Commission_Type,
      Google_Play_Commission,
      IRCTC_Agent_ID_Commission,
      Birth_Certificate_Commission,
      Death_Certificate_Commission,
      E_Stamp_Commission,
      ITR_Registration_Commission,
      GST_Registration_Commission,
      Sambal_Commission,
      Income_Certificate_Commission,
      Domicile_Certificate_Commission,
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
      Online_Electricity_Bill_Pay_Commission_Type,
      Online_Electricity_Bill_Pay_Commission,
      Offline_Electricity_Bill_Pay_Commission_Type,
      Offline_Electricity_Bill_Pay_Commission,
      Online_Insurance_Pay_Commission_Type,
      Online_Insurance_Pay_Commission,
      Offline_Insurance_Pay_Commission_Type,
      Offline_Insurance_Pay_Commission,
      PAN_Card_Commission_Type,
      E_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      P_PAN_Card_Commission,
      updatedAt,
      packageId
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ error: "Failed to update the package" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Package not found" });
      }

      return res.status(200).json({success: true, message: "Package updated successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const deletePackage = (req, res) => {
  try {
    const { package_id } = req.body;
    console.log(package_id)

    // Check if the package is allocated to any user
    const checkUserSql = `SELECT COUNT(*) AS userCount FROM userprofile WHERE package_Id = ?`;
    db.query(checkUserSql, [package_id], (checkError, checkResults) => {
      if (checkError) {
        console.error("Error checking package allocation:", checkError);
        return res.status(500).json({ error: "Failed to check package allocation" });
      }

      const userCount = checkResults[0].userCount;

      // If the package is allocated to any user, don't delete it
      if (userCount > 0) {
        return res.status(200).json({success : false, message: "Package cannot be deleted as it is allocated to users" });
      }

      // If the package is not allocated to any user, proceed to delete
      const deleteSql = `DELETE FROM packagestable WHERE id = ?`;
      db.query(deleteSql, [package_id], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error("Error deleting package:", deleteError);
          return res.status(500).json({ error: "Failed to delete the package" });
        }

        if (deleteResults.affectedRows === 0) {
          return res.status(404).json({ message: "Package not found" });
        }

        return res.status(200).json({success : true, message: "Package deleted successfully" });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const approveUser = (req, res) => {
  try {
    const { PackageId , UserId ,UserRole, Status ,white_lable,superDistributor,distributor,website_url} = req.body;

    if (!PackageId) {
      
      return res.status(400).json({success: false, error: "Package ID is required" });
      // return res.status(500).json({success: false, error: "Failed to approve the user" });
    }

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE userprofile SET package_Id = ? , Status = ? WHERE UserId = ?`;

    const values = [
      
      PackageId,
      Status,
      UserId
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({success: false, error: "Failed to approve the user" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({success: false, message: "user not found" });
      }

       // SQL query to insert details into another table (e.g., 'userdetails')
       const insertSql = `INSERT INTO user_relations (UserId,userType,	superAdmin, white_lable, superDistributor, distributor, website_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`;
       const superAdminId = "AASH00001"

      const insertValues = [UserId,UserRole,superAdminId, white_lable, superDistributor, distributor, website_url];

      db.query(insertSql, insertValues, (insertError, insertResults) => {
        if (insertError) {
          console.error("Error inserting user details:", insertError);
          return res.status(500).json({ success: false, error: "Failed to save user details" });
        }

        return res.status(200).json({ success: true, message: "User approved and details saved successfully" });
      });
    });

      // return res.status(200).json({success: true, message: "Approve user successfully" });
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({success: false, error: "An unexpected error occurred" });
  }
};

const rejectUser = (req, res) => {
  try {
    const { UserId , Note } = req.body;

    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // SQL query to update the package details
    const sql = `UPDATE userprofile SET Note = ? WHERE UserId = ?`;

    const values = [
      
      Note,
      UserId
    ];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({success: false, error: "Failed to reject the user" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({success: false, message: "user not found" });
      }

      return res.status(200).json({success: true, message: "Reject user successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({success: false, error: "An unexpected error occurred" });
  }
};

const deactivateUser = (req, res) => {
  try {
    const { userId } = req.body;

      if (!userId) {
        return res.status(200).json({success : false, message: "User Id is required" });
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

        return res.status(200).json({success : true, message: "deactive the user successfully" });
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
        return res.status(200).json({success : false, message: "User Id is required" });
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

        return res.status(200).json({success : true, message: "active the user successfully" });
      });
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};


const getUserRelations = (req, res) => {
  const {userId} = req.params;

  try {
    const sql = "SELECT * FROM user_relations WHERE UserId = ?";

    db.query(sql,[userId], (err, result) => {
      if (err) {
        console.error("Error fetching  users relation from MySQL:", err);
      return  res.status(500).json({ success: false, error: "Error fetching users" });
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

        return  res.status(200).json({
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

module.exports = {
  addPackage,
  getPackages,
  editPackage,
  deletePackage,
  getPendingUsers,
  getActiveUsers,
  getdeactiveUsers,
  approveUser,
  rejectUser,
  deactivateUser,
  activateUser,
  getUserRelations
};
