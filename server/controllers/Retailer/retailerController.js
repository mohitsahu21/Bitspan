const { getDataFromClientApi } = require("../../APIS URL/instpayApis");
const { db } = require("../../connect");
const moment = require("moment-timezone");

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
  const { mobile_no, operator_name, amount, orderid, created_by_userid } =
    req.body;

  if (
    !mobile_no ||
    !operator_name ||
    !amount ||
    !orderid ||
    !created_by_userid
  ) {
    return res
      .status(400)
      .json({ status: "Failure", error: "Please fill all the fields" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const query = `INSERT INTO offline_recharge 
    (mobile_no, operator_name, amount, orderid, created_by_userid, created_at) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [mobile_no, operator_name, amount, orderid, created_by_userid, createdAt],
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
      });
    }
  );
};

module.exports = {
  applyOfflineForm,
  getApplyOfflineFormByid,
  getApplyOfflineForm,
  updateApplyOfflineForm,
  bankidForm,
};

// const getBalance = (req, res) => {
//   const token = process.env.APITokenInstapay;
//   const username = process.env.APIUsernameInstapay;

//   // Optional additional parameters, e.g., from the request
//   const additionalParams = { format: "json" };

//   getDataFromClientApi(
//     "/v3/recharge/balance",
//     token,
//     username,
//     additionalParams
//   )
//     .then((data) => {
//       res.json(data); // Send the data back to the client as JSON
//     })
//     .catch((error) => {
//       res.status(500).send("Error fetching data from client API");
//     });
// };

// const getApplyOfflineForm = (req, res) => {
//   const { fromDate, toDate } = req.query;

//   let query = `SELECT * FROM apply_offline_form ORDER BY id DESC`;

//   if (fromDate && toDate) {
//     query += ` WHERE created_at BETWEEN '${fromDate}' AND '${toDate}' ORDER BY created_at DESC`;
//   } else {
//     query += " ORDER BY created_at DESC";
//   }

//   db.query(query, (err, result) => {
//     if (err) {
//       console.error("Error getting data from MySQL:", err);
//       res.status(500).json({ error: "Database error" });
//       return;
//     }
//     res.status(200).json(result);
//   });
// };
