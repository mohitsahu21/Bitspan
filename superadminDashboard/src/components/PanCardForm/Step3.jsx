import React from 'react';

const Step3 = ({ formData, handleChange }) => (
  <div>
    <div className="form-group">
      <label>Address:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>State:</label>
      <input type="text" name="state" value={formData.state} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>Pincode:</label>
      <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
    </div>
  </div>
);

export default Step3;