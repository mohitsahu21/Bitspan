const { db } = require("../connect");
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

module.exports = {
  applyOfflineForm,
  getApplyOfflineFormByid,
  getApplyOfflineForm,
  updateApplyOfflineForm,
};
