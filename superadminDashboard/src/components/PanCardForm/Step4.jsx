import React from 'react';

const Step4 = ({ formData, handleChange }) => (
  <div>
    <div className="form-group">
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>Phone Number:</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
    </div>
  </div>
);

export default Step4;