import React, { useState, useEffect } from "react";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import HeaderHomeTwo from "../HomeTwo/HeaderHomeTwo";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";

const Register = ({ homePage }) => {
  console.log(homePage);
  const [fees, setFees] = useState(""); // Store selected user's fee
  const [userFeesData, setUserFeesData] = useState({}); // Store API data
  const currentUrl = window.location.href;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    UserName: "",
    ContactNo: "",
    Email: "",
    PanCardNumber: "",
    City: "",
    AadharNumber: "",
    BusinessName: "",
    State: "",
    PinCode: "",
    role: "",
    paymentMode: "Online Payment",
    Status: "Pending",
    amount: fees,
    source: "Super Admin Website",
    payment_status: "Pending",
    White_Label_Website_URL: "NA",
    // Super_Admin_Website_URL: currentUrl,
    created_By_User_Id: "SA-ASHI0002",
    created_By_User_Role: "SuperAdmin",
    created_By_Website: currentUrl,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
        );
        const result = await response.json();

        if (result.success && result.data) {
          console.log("✅ API Fetched Successfully:", result.data);
          setUserFeesData({
            Retailer: result.data.Retailer_Joining_Price,
            Distributor: result.data.Distributor_Joining_Price,
            SuperDistributor: result.data.Super_Distributor_Joining_Price,
            WhiteLabel: result.data.White_Label_Joining_Price,
          });
        } else {
          console.error("❌ Invalid API Response", result);
        }
      } catch (error) {
        console.error("❌ Error Fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Role Selection and Fee Update
  const handleFees = (e) => {
    const selectedRole = e.target.value;
    console.log("Selected Role:", selectedRole); // Debugging
    const selectedFees = userFeesData[selectedRole];
    console.log("Selected Fee:", selectedFees); // Debugging

    setFees(selectedFees || ""); // Update fee state
    setFormData({ ...formData, role: selectedRole, amount: selectedFees });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data you're sending to check before submission
    console.log("Submitting data:", formData);

    setIsLoading(true);

    if (Object.values(formData).some((value) => value === "")) {
      alert("⚠️ All fields are required! Please fill out the form completely.");
      return;
    }

    try {
      const response = await axios.post(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/upiwf/userRegiserOnline",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);

      if (response.data.status) {
        Swal.fire({
          title: "Payment Link Created Successfully",
          // text: `${response.data.message} /n Your Order Id is ${response.data.data.result.orderId}
          // /n Your User Id is ${response.data.data.result.orderId}`,

          html: `
          ${response.data.message} 
          <br><b>Your Order ID:</b> ${response.data.data.result.orderId} 
          <br><b>Your User ID:</b> ${response.data.data.result.orderId}
        `,

          icon: "success",
        }).then(() => {
          // Navigate to the payment URL after closing the alert
          // window.location.href = response.data.data.result.payment_url;
          window.open(response.data.data.result.payment_url, "_blank");
        });
        // navigate(/${response.data.data.result.payment_url})
        setFormData({
          UserName: "",
          ContactNo: "",
          Email: "",
          PanCardNumber: "",
          City: "",
          AadharNumber: "",
          BusinessName: "",
          State: "",
          PinCode: "",
          role: "",
          paymentMode: "Online Payment",
          Status: "Pending",
          amount: fees,
          source: "Super Admin Website",
          payment_status: "Pending",
          White_Label_Website_URL: "NA",
          // Super_Admin_Website_URL: currentUrl,
          created_By_User_Id: "SA-ASHI0002",
          created_By_User_Role: "SuperAdmin",
          created_By_Website: currentUrl,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
      // alert("Failed to submit form. Please try again.");
      Swal.fire({
        title: "Error",
        text:
          error?.response?.data.message ||
          "Failed to submit form. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}
      <HeaderNews
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeroNews
        title="Register"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/Register", title: "Register" },
        ]}
      />
      <div className="" style={{ backgroundColor: "#EEF1F6" }}>
        <section className="contact__help  p-relative custom">
          <div className="contact__shape">
            <img className="dot" src="assets/img/icon/contact/dot.png" alt="" />
            <img
              className="shape"
              src="assets/img/icon/contact/shape.png"
              alt=""
            />
          </div>
          <div className="container mt-5 p-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-12 col-xl-12">
                <div
                  className="card shadow card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                      Registration Form
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="firstName">
                              Name
                            </label>
                            <input
                              type="text"
                              id="Name"
                              className="form-control form-control-lg"
                              required
                              pattern="^[A-Za-z ]+$"
                              title="Only letters and spaces allowed"
                              value={formData.UserName}
                              onChange={handleChange}
                              name="UserName"
                              placeholder=" Enter FullName"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 ">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="mobileNumber"
                            >
                              Mobile No.
                            </label>
                            <input
                              type="text"
                              id="mobileNumber"
                              className="form-control form-control-lg"
                              required
                              pattern="^[0-9]{10}$"
                              title="Enter a 10-digit mobile number"
                              value={formData.ContactNo}
                              // onChange={handleChange}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // सिर्फ नंबर रहने दें
                                if (value.length <= 10) {
                                  setFormData({
                                    ...formData,
                                    ContactNo: value,
                                  });
                                }
                              }}
                              name="ContactNo"
                              placeholder="Enter a 10-digit mobile number"
                              maxLength={10}
                              minLength={10}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="emailAddress"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="emailAddress"
                              className="form-control form-control-lg"
                              required
                              value={formData.Email}
                              onChange={handleChange}
                              name="Email"
                              placeholder="Enter Your Email Address"
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="panCard">
                              Pan Card
                            </label>
                            <input
                              type="text"
                              id="panCard"
                              className="form-control form-control-lg"
                              required
                              value={formData.PanCardNumber}
                              onChange={handleChange}
                              name="PanCardNumber"
                              placeholder="Enter Your PAN (e.g., ABCDE1234F)"
                              style={{ textTransform: "uppercase" }}
                              pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                              title="PAN card number should be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
                              maxLength={10}
                              minLength={10}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="city">
                              City
                            </label>
                            <input
                              type="text"
                              id="City"
                              className="form-control form-control-lg"
                              required
                              value={formData.City}
                              onChange={handleChange}
                              name="City"
                              placeholder="Enter Your City Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="city">
                              Aadhaar No.
                            </label>
                            <input
                              type="text"
                              id="AadharNumber"
                              className="form-control form-control-lg"
                              required
                              pattern="^[0-9]{12}$"
                              title="Enter a valid 12-digit Aadhaar number"
                              value={formData.AadharNumber}
                              // onChange={handleChange}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // सिर्फ नंबर रहने दें
                                if (value.length <= 12) {
                                  setFormData({
                                    ...formData,
                                    AadharNumber: value,
                                  });
                                }
                              }}
                              name="AadharNumber"
                              placeholder="Enter Your 12-digit Aadhaar number"
                              maxLength={12}
                              minLength={12}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="Shop">
                              Shop / Company Name
                            </label>
                            <input
                              type="text"
                              id="Shop"
                              className="form-control form-control-lg"
                              required
                              value={formData.BusinessName}
                              onChange={handleChange}
                              name="BusinessName"
                              placeholder="Enter Your Shop/Company Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="region" className="form-label">
                            Select a State or Union Territory in India:
                          </label>
                          <select
                            className="select form-control form-control-lg"
                            required
                            value={formData.State}
                            onChange={handleChange}
                            name="State"
                          >
                            <option value="">
                              Select a state or union territory...
                            </option>

                            <optgroup label="States">
                              <option value="Andhra Pradesh">
                                Andhra Pradesh
                              </option>
                              <option value="Arunachal Pradesh">
                                Arunachal Pradesh
                              </option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal Pradesh">
                                Himachal Pradesh
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Madhya Pradesh">
                                Madhya Pradesh
                              </option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Manipur">Manipur</option>
                              <option value="Meghalaya">Meghalaya</option>
                              <option value="Mizoram">Mizoram</option>
                              <option value="Nagaland">Nagaland</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Sikkim">Sikkim</option>
                              <option value="Tamil Nadu">Tamil Nadu</option>
                              <option value="Telangana">Telangana</option>
                              <option value="Tripura">Tripura</option>
                              <option value="Uttar Pradesh">
                                Uttar Pradesh
                              </option>
                              <option value="Uttarakhand">Uttarakhand</option>
                              <option value="West Bengal">West Bengal</option>
                            </optgroup>

                            <optgroup label="Union Territories">
                              <option value="Andaman and Nicobar Islands">
                                Andaman and Nicobar Islands
                              </option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Dadra and Nagar Haveli">
                                Dadra and Nagar Haveli
                              </option>
                              <option value="Daman and Diu">
                                Daman and Diu
                              </option>
                              <option value="Lakshadweep">Lakshadweep</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Puducherry">Puducherry</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        {/* <div className="col-12">
                          <select className="select form-control-lg">
                            <option value="1" disabled>
                              Choose option
                            </option>
                            <option value="2">Subject 1</option>
                            <option value="3">Subject 2</option>
                            <option value="4">Subject 3</option>
                          </select>
                          <label className="form-label select-label">
                            Choose option
                          </label>
                        </div> */}
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="pincode">
                              Pincode
                            </label>
                            <input
                              type="text"
                              id="pincode"
                              className="form-control form-control-lg"
                              required
                              pattern="^[0-9]{6}$"
                              title="Enter a valid 6-digit pincode"
                              value={formData.PinCode}
                              onChange={handleChange}
                              name="PinCode"
                              placeholder="Enter 6-digit pincode"
                              maxLength={6}
                              minLength={6}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label
                              htmlFor="region"
                              className="form-label select-label"
                            >
                              Select User Type:
                            </label>
                            <select
                              id="role" // Change the id to match the role
                              name="role" // Ensure the name attribute is "role"
                              className="form-control form-control-lg"
                              value={formData.role}
                              onChange={handleFees}
                            >
                              <option value="">Select User Type...</option>
                              <option value="Retailer">RETAILER</option>
                              <option value="Distributor">DISTRIBUTER</option>
                              <option value="SuperDistributor">
                                SUPER DISTRIBUTER
                              </option>
                              <option value="WhiteLabel">WHITE LABEL</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              for="region"
                              className="form-label select-label"
                            >
                              Select Payment Mode
                            </label>
                            <select
                              id="pay method"
                              name="pay method"
                              className="select form-control form-control-lg"
                              required
                              value={formData.paymentMode}
                            >
                              <option value="">Select Payment Mode...</option>

                              <option value="Online Payment">
                                Online Payment
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="fees">
                              Fee in Rupees
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={fees}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2 text-center">
                        <input
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value={isLoading ? "Processing..." : "Submit"}
                          disabled={isLoading}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterHomeTwo homePage={homePage} />
      {/* <BackToTop className="back-to-top-2 mb-2" /> */}
      {/* <ScrollingInfo /> */}
    </>
  );
};

export default Register;
