const { getDataFromClientApi } = require("../../APIS URL/instpayApis");
const { db } = require("../../connect");
const moment = require("moment-timezone");
const multer = require("multer");

const applyOfflineForm = (req, res) => {
  const {
    applicant_name,
    applicant_father,
    applicant_number,
    applicant_select_service,
    other,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = "http://localhost:7777";
  const attached_form = req.files.attached_form
    ? `${domain}/uploads/${req.files.attached_form[0].filename}`
    : null;
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : null;
  const attached_sign = req.files.attached_sign
    ? `${domain}/uploads/${req.files.attached_sign[0].filename}`
    : null;
  // const attached_kyc = req.files.attached_kyc
  //   ? `${domain}/uploads/${req.files.attached_kyc[0].filename}`
  //   : null;
  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : null;

  const query = `
        INSERT INTO apply_offline_form (
            applicant_name,
            applicant_father,
            applicant_number,
            applicant_select_service,
            other,
            attached_form,
            attached_photo,
            attached_sign,
            attached_kyc,
            created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      applicant_name,
      applicant_father,
      applicant_number,
      applicant_select_service,
      other,
      attached_form,
      attached_photo,
      attached_sign,
      attached_kyc,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      res
        .status(200)
        .json({ message: "Form submitted successfully", id: result.insertId });
    }
  );
};

const getApplyOfflineFormByid = (req, res) => {
  const id = req.params.id; // Extracting the id from the request parameters
  const query = `SELECT * FROM apply_offline_form WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    // Use array to pass the parameter
    if (err) {
      console.error("Error getting data from MySQL:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ message: "Form not found" });
      return;
    }

    res.status(200).json(result[0]); // Return the first result as it is a single form
  });
};

const getApplyOfflineForm = (req, res) => {
  const { fromDate, toDate } = req.query;

  let query = `SELECT * FROM apply_offline_form`;

  if (fromDate && toDate) {
    query += ` WHERE created_at BETWEEN '${fromDate}' AND '${toDate}' ORDER BY created_at DESC`;
  } else {
    query += " ORDER BY created_at DESC";
  }

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error getting data from MySQL:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.status(200).json(result);
  });
};

const updateApplyOfflineForm = (req, res) => {
  const id = req.params.id;
  const { status, note } = req.body;

  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const query = `UPDATE apply_offline_form SET status = ?, note = ?, updated_at = ? WHERE id = ?`;

  db.query(query, [status, note, updatedAt, id], (err, result) => {
    if (err) {
      console.error("Error updating data in MySQL:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    res.status(200).json({ message: "Form updated successfully" });
  });
};

const bankidForm = (req, res) => {
  const {
    applicant_name,
    applicant_father,
    applicant_mother,
    applicant_number,
    email,
    applicant_select_service,
    aadhar_card,
    pan_card,
    business_name,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = "http://localhost:7777";
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : null;

  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : null;
  const bank_passbook = req.files.bank_passbook
    ? `${domain}/uploads/${req.files.bank_passbook[0].filename}`
    : null;
  const shop_photo = req.files.shop_photo
    ? `${domain}/uploads/${req.files.shop_photo[0].filename}`
    : null;
  const electric_bill = req.files.electric_bill
    ? `${domain}/uploads/${req.files.electric_bill[0].filename}`
    : null;

  const query = `
        INSERT INTO apply_offline_form (
            applicant_name,
    applicant_father,
    applicant_mother,
    applicant_number,
    email,
    applicant_select_service,
    aadhar_card,
    pan_card,
    business_name,
    attached_photo,
    attached_kyc,
    bank_passbook,
    shop_photo,
    electric_bill,
    created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      applicant_name,
      applicant_father,
      applicant_mother,
      applicant_number,
      email,
      applicant_select_service,
      aadhar_card,
      pan_card,
      business_name,
      attached_photo,
      attached_kyc,
      bank_passbook,
      shop_photo,
      electric_bill,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      res
        .status(200)
        .json({ message: "Form submitted successfully", id: result.insertId });
    }
  );
};

const offlineRecharge = (req, res) => {
  const { mobile_no, operator_name, amount, recharge_Type, created_by_userid } =
    req.body;
  // console.log(req.body);

  if (!mobile_no || !operator_name || !amount) {
    return res
      .status(400)
      .json({ status: "Failure", error: "Please fill all the fields" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Function to generate new order ID
  const generateNewOrderId = (maxOrderId) => {
    let numericPart = parseInt(maxOrderId.replace("OR", "")) + 1;
    return `OR${String(numericPart).padStart(9, "0")}`; // Ensures it remains OR00001, OR00002, etc.
  };

  // Query to get the maximum order ID
  const getMaxOrderIdQuery = `SELECT MAX(orderid) as maxOrderId FROM offline_recharge`;

  db.query(getMaxOrderIdQuery, (err, result) => {
    if (err) {
      console.error("Error fetching maximum order ID:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }

    let maxOrderId = result[0].maxOrderId || "OR00000"; // Default if no order ID is present
    let newOrderId = generateNewOrderId(maxOrderId);

    // Function to check if order ID is unique
    const checkOrderIdUnique = () => {
      const checkOrderIdQuery = `SELECT orderid FROM offline_recharge WHERE orderid = ?`;

      db.query(checkOrderIdQuery, [newOrderId], (err, result) => {
        if (err) {
          console.error("Error checking order ID:", err);
          return res
            .status(500)
            .json({ status: "Failure", error: "Database error" });
        }

        if (result.length > 0) {
          // Order ID exists, generate a new one
          newOrderId = generateNewOrderId(newOrderId);
          checkOrderIdUnique(); // Recursively check until unique
        } else {
          // Order ID is unique, proceed with inserting the record
          const insertQuery = `INSERT INTO offline_recharge 
            (mobile_no, operator_name, amount, orderid, recharge_Type, created_by_userid, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

          db.query(
            insertQuery,
            [
              mobile_no,
              operator_name,
              amount,
              newOrderId,
              recharge_Type,
              created_by_userid,
              createdAt,
            ],
            (err, result) => {
              if (err) {
                console.error("Error inserting data into MySQL:", err);
                return res
                  .status(500)
                  .json({ status: "Failure", error: "Database error" });
              }

              res.status(200).json({
                status: "Success",
                message: "Data inserted successfully",
                id: result.insertId,
                orderid: newOrderId,
              });
            }
          );
        }
      });
    };

    // Start the check for order ID uniqueness
    checkOrderIdUnique();
  });
};

const getRechargeData = (req, res) => {
  let query = `SELECT * FROM offline_recharge`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ status: "failure", error: err.message });
    }

    return res.status(200).json({ status: "success", data: result });
  });
};

const getApiRechargeData = (req, res) => {
  let query = `SELECT * FROM recharges`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ status: "failure", error: err.message });
    }

    return res.status(200).json({ status: "success", data: result });
  });
};

const offlineDthConnection = (req, res) => {
  const {
    operatorName,
    first_name,
    last_name,
    full_address,
    postal_code,
    number,
    amount,
    message, // Removed orderid from req.body since it's generated
    user_id,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !full_address ||
    !postal_code ||
    !number ||
    !amount ||
    !message
  ) {
    return res
      .status(400)
      .json({ status: "Failure", error: "Please fill all the fields" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Function to generate new order ID
  const generateNewOrderId = (maxOrderId) => {
    let numericPart = parseInt(maxOrderId.replace("DOR", "")) + 1;
    return `DOR${String(numericPart).padStart(5, "0")}`; // Generates DOR00001, etc.
  };

  // Query to get the maximum order ID
  const getMaxOrderIdQuery = `SELECT MAX(orderid) as maxOrderId FROM offline_dth_connection`;

  db.query(getMaxOrderIdQuery, (err, result) => {
    if (err) {
      console.error("Error fetching maximum order ID:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }

    let maxOrderId = result[0].maxOrderId || "DOR00000"; // Default if no order ID is present
    let newOrderId = generateNewOrderId(maxOrderId);

    // Function to check if order ID is unique
    const checkOrderIdUnique = () => {
      const checkOrderIdQuery = `SELECT orderid FROM offline_dth_connection WHERE orderid = ?`;

      db.query(checkOrderIdQuery, [newOrderId], (err, result) => {
        if (err) {
          console.error("Error checking order ID:", err);
          return res
            .status(500)
            .json({ status: "Failure", error: "Database error" });
        }

        if (result.length > 0) {
          // Order ID exists, generate a new one
          newOrderId = generateNewOrderId(newOrderId);
          checkOrderIdUnique(); // Recursively check until unique
        } else {
          // Order ID is unique, proceed with inserting the record
          const insertQuery = `INSERT INTO offline_dth_connection
            (operatorName,
    first_name,
    last_name,
    full_address,
    postal_code,
    number,
    amount,
    orderid,
    message,
    user_id, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          db.query(
            insertQuery,
            [
              operatorName,
              first_name,
              last_name,
              full_address,
              postal_code,
              number,
              amount,
              newOrderId, // Using the newly generated order ID
              message,
              user_id,
              createdAt,
            ],
            (err, result) => {
              if (err) {
                console.error("Error inserting data into MySQL:", err);
                return res
                  .status(500)
                  .json({ status: "Failure", error: "Database error" });
              }

              res.status(200).json({
                status: "Success",
                message: "Data inserted successfully",
                id: result.insertId,
                orderid: newOrderId, // Return the new order ID to the client
              });
            }
          );
        }
      });
    };

    // Start the check for order ID uniqueness
    checkOrderIdUnique();
  });
};

const panFromData = (req, res) => {
  const {
    application_type,
    select_title,
    name,
    father_name,
    mother_name,
    dob,
    gender,
    office_address,
    aadhar_details,
    Address_Communication_OfficeResident,
    alternative_communication_Address,
    mobile_no,
    email_id,
    pin_code,
    state,
    Change_Request,
    Charge_Amount,
    user_id,
    status,
    note,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = "http://localhost:7777";

  console.log("Request body:", req.body);
  console.log("Uploaded files:", req.files);

  // Handle files carefully
  const documentUpload =
    req.files && req.files.documentUpload
      ? req.files.documentUpload
          .map((file) => `${domain}/panUploads/${file.filename}`)
          .join(",")
      : null;

  const attachment_form =
    req.files && req.files.attachment_form
      ? `${domain}/panUploads/${req.files.attachment_form[0].filename}`
      : null;

  const attachment_photo =
    req.files && req.files.attachment_photo
      ? `${domain}/panUploads/${req.files.attachment_photo[0].filename}`
      : null;

  const attachment_signature =
    req.files && req.files.attachment_signature
      ? `${domain}/panUploads/${req.files.attachment_signature[0].filename}`
      : null;

  const sql = `INSERT INTO pan_offline (
    application_type, select_title, name, father_name, mother_name, dob, gender, office_address, aadhar_details,
    Address_Communication_OfficeResident, alternative_communication_Address, mobile_no, email_id, pin_code, state,
    Change_Request, documentUpload, attachment_form, attachment_signature, attachment_photo, Charge_Amount, user_id,
    status, note, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    application_type,
    select_title,
    name,
    father_name,
    mother_name,
    dob,
    gender,
    office_address,
    aadhar_details,
    Address_Communication_OfficeResident,
    alternative_communication_Address,
    mobile_no,
    email_id,
    pin_code,
    state,
    Change_Request,
    documentUpload,
    attachment_form,
    attachment_signature,
    attachment_photo,
    Charge_Amount,
    user_id,
    status,
    note,
    createdAt,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Form data submitted successfully",
      formId: result.insertId,
    });
  });
};

const nsdlTransactionNewRequest = (req, res) => {
  const query = `SELECT * FROM nsdlpan ORDER BY id DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const nsdlTransactionCorrection = (req, res) => {
  const query = `SELECT * FROM nsdlpancorrection ORDER BY id DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const panFourZeroGetAPI = (req, res) => {
  const query = `SELECT * FROM pan_offline ORDER BY id DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const complainInsertApi = (req, res) => {
  const { complainType, transactionNo, mobileNo, remark, userID } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = "http://localhost:7777";

  const complainFile =
    req.files && req.files.complainFile
      ? `${domain}/complainUpload/${req.files.complainFile[0].filename}`
      : null;

  const insertquery = `INSERT INTO complaindata (complainType, transactionNo, mobileNo, remark, complainFile, userID, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    complainType,
    transactionNo,
    mobileNo,
    remark,
    complainFile,
    userID,
    createdAt,
  ];

  db.query(insertquery, values, (err, result) => {
    if (err) {
      console.log(`Error Inserting record: ${err.message}`);
      return res.status(500).json({ status: "Failure", error: err.message });
    } else {
      res.status(201).json({
        status: "Success",
        message: "Submitted Successfully",
        resultID: result.insertId,
      });
    }
  });
};

const complainGetData = (req, res) => {
  const query = `SELECT * FROM complaindata ORDER BY id DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const profileInfo = (req, res) => {
  const {
    UserId,
    UserType,
    UserName,
    ContactNo,
    Email,
    PanCardNumber,
    AadharNumber,
    BusinessName,
    City,
    State,
    PinCode,
  } = req.body;

  if (
    !UserId ||
    !UserType ||
    !UserName ||
    !ContactNo ||
    !Email ||
    !PanCardNumber ||
    !AadharNumber ||
    !BusinessName ||
    !City ||
    !State ||
    !PinCode
  ) {
    return res
      .status(400)
      .json({ status: "Failure", error: "Please fill all details" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = "http://localhost:7777";

  const aadharFront =
    req.files && req.files.aadharFront
      ? `${domain}/profile-data/${req.files.aadharFront[0].filename}`
      : null;

  const aadharBack =
    req.files && req.files.aadharBack
      ? `${domain}/profile-data/${req.files.aadharBack[0].filename}`
      : null;

  const panCardFront =
    req.files && req.files.panCardFront
      ? `${domain}/profile-data/${req.files.panCardFront[0].filename}`
      : null;

  const insertQuery = `INSERT INTO userprofile (UserId, UserType, UserName, ContactNo, Email, PanCardNumber, AadharNumber, BusinessName, City, State, PinCode, AadharFront, AadharBack, PanCardFront, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const insertValue = [
    UserId,
    UserType,
    UserName,
    ContactNo,
    Email,
    PanCardNumber,
    AadharNumber,
    BusinessName,
    City,
    State,
    PinCode,
    aadharFront,
    aadharBack,
    panCardFront,
    createdAt,
  ];

  db.query(insertQuery, insertValue, (err, result) => {
    if (err) {
      console.log(`Error Inserting record: ${err.message}`);
      return res.status(500).json({ status: "Failure", error: err.message });
    } else {
      res.status(201).json({
        status: "Success",
        message: "Submitted Successfully",
        resultID: result.insertId,
      });
    }
  });
};

module.exports = {
  applyOfflineForm,
  getApplyOfflineFormByid,
  getApplyOfflineForm,
  updateApplyOfflineForm,
  bankidForm,
  offlineRecharge,
  getRechargeData,
  getApiRechargeData,
  offlineDthConnection,
  panFromData,
  nsdlTransactionNewRequest,
  nsdlTransactionCorrection,
  panFourZeroGetAPI,
  complainInsertApi,
  complainGetData,
  profileInfo,
};

// const panFromData = (req, res) => {
//   const {
//     application_type,
//     select_title,
//     name,
//     father_name,
//     mother_name,
//     dob,
//     gender,
//     office_address,
//     aadhar_details,
//     Address_Communication_OfficeResident,
//     alternative_communication_Address,
//     mobile_no,
//     email_id,
//     pin_code,
//     state,
//     Change_Request,
//     Charge_Amount,
//     user_id,
//     status,
//     note,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   const domain = "http://localhost:7777";

//   const documentUpload = req.files.documentUpload
//     ? req.files.documentUpload
//         .map((file) => `${domain}/panUploads/${file.filename}`)
//         .join(",")
//     : null;
//   const attachment_form = req.files.attachment_form
//     ? `${domain}/panUploads/${req.files.attachment_form[0].filename}`
//     : null;
//   const attachment_photo = req.files.attachment_photo
//     ? `${domain}/panUploads/${req.files.attachment_photo[0].filename}`
//     : null;
//   const attachment_signature = req.files.attachment_signature
//     ? `${domain}/panUploads/${req.files.attachment_signature[0].filename}`
//     : null;

//   // Insert query
//   const sql = `INSERT INTO pan_offline (
//         application_type, select_title, name, father_name, mother_name, dob, gender, office_address, aadhar_details,
//         Address_Communication_OfficeResident, alternative_communication_Address, mobile_no, email_id, pin_code, state,
//         Change_Request, document_upload, attachment_form, attachment_signature, attachment_photo, Charge_Amount, user_id,
//         status, note, created_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     application_type,
//     select_title,
//     name,
//     father_name,
//     mother_name,
//     dob,
//     gender,
//     office_address,
//     aadhar_details,
//     Address_Communication_OfficeResident,
//     alternative_communication_Address,
//     mobile_no,
//     email_id,
//     pin_code,
//     state,
//     Change_Request,
//     documentUpload,
//     attachment_form,
//     attachment_signature,
//     attachment_photo,
//     Charge_Amount,
//     user_id,
//     status,
//     note,
//     createdAt,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({
//       message: "Form data submitted successfully",
//       formId: result.insertId,
//     });
//   });
// };
