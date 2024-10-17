import React, { useState } from "react";
import styled from "styled-components";

// Map roles to their respective prefixes
const rolePrefixes = {
  superadmin: "SA",
  whitelabel: "WL",
  superdistributer: "SD",
  distributer: "DT",
  retailer: "RT",
};

// Function to clean the name by removing special characters and spaces
const cleanName = (name) => {
  return name.replace(/[^a-zA-Z]/g, "");
};

// Function to generate the User ID
const generateUserId = (name, role, sequence) => {
  // Clean the name
  const cleanedName = cleanName(name);

  // Extract up to 4 characters from the cleaned name
  let namePart = cleanedName.slice(0, 4).toUpperCase();

  // If the cleaned name is less than 4 characters, pad it with additional characters from the cleaned name
  if (cleanedName.length < 4) {
    namePart = (cleanedName + cleanedName.slice(0, 4))
      .slice(0, 4)
      .toUpperCase();
  }

  // Get the role prefix
  const rolePrefix = rolePrefixes[role];

  // Determine the padding length based on the sequence number
  const paddingLength = sequence >= 100000 ? 6 : 4;

  // Generate the user ID with appropriate padding
  const userId = `${namePart}${rolePrefix}${sequence
    .toString()
    .padStart(paddingLength, "0")}`;

  return userId;
};

const DemoRegistration = () => {
  const [sequence, setSequence] = useState({
    superadmin: 1,
    whitelabel: 1,
    superdistributer: 1,
    distributer: 1,
    retailer: 1,
  });

  const [name, setName] = useState("");
  const [role, setRole] = useState("superadmin"); // Default role
  const [userId, setUserId] = useState("");

  const handleRegister = () => {
    const currentSequence = sequence[role];
    const newUserId = generateUserId(name, role, currentSequence);

    // Update sequence
    setSequence((prev) => ({
      ...prev,
      [role]: currentSequence + 1,
    }));

    setUserId(newUserId);
  };

  return (
    <>
      <Wrapper>
        <div>
          <h1>User ID Generator</h1>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="superadmin">Superadmin</option>
            <option value="whitelabel">Whitelabel</option>
            <option value="superdistributer">Superdistributer</option>
            <option value="distributer">Distributer</option>
            <option value="retailer">Retailer</option>
          </select>

          <button onClick={handleRegister}>Register</button>

          <p>Generated User ID: {userId}</p>
        </div>
      </Wrapper>
    </>
  );
};

export default DemoRegistration;
const Wrapper = styled.div``;
