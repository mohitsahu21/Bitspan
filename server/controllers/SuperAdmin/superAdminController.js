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
      UTI_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      NSDL_PAN_Card_Commission,
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
        Offline_Insurance_Pay_Commission, PAN_Card_Commission_Type, UTI_PAN_Card_Commission, UTI_PAN_Coupon_Commission, NSDL_PAN_Card_Commission , created_at
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
      UTI_PAN_Card_Commission,
      UTI_PAN_Coupon_Commission,
      NSDL_PAN_Card_Commission,
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

module.exports = {
  addPackage,
};