// import React, { useState } from "react";
// import styled from "styled-components";

// // Map roles to their respective prefixes
// const rolePrefixes = {
//   superadmin: "SA",
//   whitelabel: "WL",
//   superdistributer: "SD",
//   distributer: "DT",
//   retailer: "RT",
// };

// // Function to clean the name by removing special characters and spaces
// const cleanName = (name) => {
//   return name.replace(/[^a-zA-Z]/g, "");
// };

// // Function to generate the User ID
// const generateUserId = (name, role, sequence) => {
//   // Clean the name
//   const cleanedName = cleanName(name);

//   // Extract up to 4 characters from the cleaned name
//   let namePart = cleanedName.slice(0, 4).toUpperCase();

//   // If the cleaned name is less than 4 characters, pad it with additional characters from the cleaned name
//   if (cleanedName.length < 4) {
//     namePart = (cleanedName + cleanedName.slice(0, 4))
//       .slice(0, 4)
//       .toUpperCase();
//   }

//   // Get the role prefix
//   const rolePrefix = rolePrefixes[role];

//   // Determine the padding length based on the sequence number
//   const paddingLength = sequence >= 100000 ? 6 : 4;

//   // Generate the user ID with appropriate padding
//   const userId = `${namePart}${rolePrefix}${sequence
//     .toString()
//     .padStart(paddingLength, "0")}`;

//   return userId;
// };

// const DemoRegistration = () => {
//   const [sequence, setSequence] = useState({
//     superadmin: 1,
//     whitelabel: 1,
//     superdistributer: 1,
//     distributer: 1,
//     retailer: 1,
//   });

//   const [name, setName] = useState("");
//   const [role, setRole] = useState("superadmin"); // Default role
//   const [userId, setUserId] = useState("");

//   const handleRegister = () => {
//     const currentSequence = sequence[role];
//     const newUserId = generateUserId(name, role, currentSequence);

//     // Update sequence
//     setSequence((prev) => ({
//       ...prev,
//       [role]: currentSequence + 1,
//     }));

//     setUserId(newUserId);
//   };

//   return (
//     <>
//       <Wrapper>
//         <div>
//           <h1>User ID Generator</h1>

//           <input
//             type="text"
//             placeholder="Enter Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="superadmin">Superadmin</option>
//             <option value="whitelabel">Whitelabel</option>
//             <option value="superdistributer">Superdistributer</option>
//             <option value="distributer">Distributer</option>
//             <option value="retailer">Retailer</option>
//           </select>

//           <button onClick={handleRegister}>Register</button>

//           <p>Generated User ID: {userId}</p>
//         </div>
//       </Wrapper>
//     </>
//   );
// };

// export default DemoRegistration;
// const Wrapper = styled.div``;

import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";

const PanDocumentUpload = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-9 col-lg-9 col-md-9 ms-md-5 ps-md-5 col-9
                             mt-5 "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-9">
                      {/* <div className="text-center">
                                                <h3>Upload Pan Card Document</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Upload Pan Card Document
                        </h4>
                        <h6 className="">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Upload Pan Card Document
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center ">
                    <div className="col-xxl-6 col-xl-9 col-lg-9 col-md-10 col-sm-9 shadow rounded m-4  px-5 py-5 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                  readOnly
                                  value="ASHI6462"
                                />
                                <label for="floatingInputGroup1">
                                  Your User Id
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                  readOnly
                                  value="2KADAMONLINE"
                                />
                                <label for="floatingInputGroup1">Agency</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <div>
                              <div class="mb-3">
                                <label
                                  for="exampleFormControlTextarea1"
                                  class="form-label"
                                >
                                  {" "}
                                  Application Details ( Input multiple
                                  application no and it should be (space)
                                  separated)
                                </label>
                                <textarea
                                  class="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  placeholder="Enter Appication Details"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  No. of Document
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="date"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  Date of Courier
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  POD/Tracking Number
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  Courier Company Name
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="date"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  Delivery Date
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group mb-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  Delivery Location
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup1"
                                  placeholder="Transaction Number"
                                />
                                <label for="floatingInputGroup1">
                                  Confirm the Address
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div class="mb-3">
                              <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Remark"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex  flex-column flex-xl-row gap-3">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div>
                              <label for="formFileLg" class="form-label">
                                Tab to upload scan copy of POD
                              </label>
                              <input
                                class="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-start mb-3">
                            <button className="btn p-2">Upload</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PanDocumentUpload;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
`;
