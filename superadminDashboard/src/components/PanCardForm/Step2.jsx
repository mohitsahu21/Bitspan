import React from 'react';

const Step2 = ({ formData, handleChange,errors }) => (
  <div>
    <div className="form-group">
      <label>Father's Name:</label>
      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
      {errors.fatherName && <div style={{ color: 'red' }}>{errors.fatherName}</div>}
    </div>
    <div className="form-group">
      <label>Date of Birth:</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
);

export default Step2;