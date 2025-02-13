import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../../assets/images/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const HomePageSetting = () => {
  const [errors, setErrors] = useState({});
  const homepageBgRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const validateImage = (event, width, height, field, preview, inputRef) => {
    const file = event.target.files[0];

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (!file) return;

    // Check if the file type is valid
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "* Please select a valid image.",
      }));
      inputRef.current.value = null; // Clear the input field
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }

    // ✅ Check if file size exceeds the limit
    if (file.size > maxSize) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `* File size should not exceed 5MB.`,
      }));
      inputRef.current.value = null; // Clear the input field
      return;
    }

    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width !== width || img.height !== height) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: `* Image dimensions should be ${width}x${height}px`,
          }));
          inputRef.current.value = null; // Clear the input field
          return;
        } else {
          const reader = new FileReader();
          const { name } = event.target;
          reader.onload = () => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: file, // Use the Base64 string to preview the image
              [preview]: reader.result, // Store the preview URL
            }));
          };

          reader.readAsDataURL(file);

          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "",
          }));
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const [data, setData] = useState([]);
  // const qrCodeRef = useRef(null);
  // const [Offer_Banner, setOffer_Banner] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    whiteLabel_id: userId,
    Theme_Design: "",
    Company_Name: "",
    About_Us: "",
    Notice: "",
    Training_Video_Link: "",
    Show_Offer_Banner: "",
    Offer_Banner: null,
    Offer_Banner_Preview: null,
    Google_Map_Link: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
        `http://localhost:7777/api/auth/whiteLabel/getWhitelabelSettings/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );
      setData(data.data);
      setFormData({
        id: data.data.id,
        whiteLabel_id: userId,
        Theme_Design: data.data.Theme_Design,
        Company_Name: data.data.Company_Name,
        About_Us: data.data.About_Us,
        Notice: data.data.Notice,
        Training_Video_Link: data.data.Training_Video_Link,
        Show_Offer_Banner: data.data.Show_Offer_Banner,
        Offer_Banner: data.data.Offer_Banner,
        Offer_Banner_Preview: data.data.Offer_Banner,
        Google_Map_Link: data.data.Google_Map_Link,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your token is expired. Please login again.",
        });

        dispatch(clearUser()); // Logout user
        navigate("/"); // Redirect to login
      } else {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Data",
          text:
            error.response?.data?.message ||
            "An error occurred while fetching data. Please try again.",
        });
      }
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleFileChange = (e) => {
  //     const { name } = e.target;
  //     setFormData({
  //         ...formData,
  //         [name]: e.target.files[0], // Handle file input
  //     });
  // };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    // Reset error message
    setQrCodeError("");

    if (file) {
      // Check file type
      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(file.type)) {
        setQrCodeError("Please upload a valid image (JPEG or PNG).");
        qrCodeRef.current.value = null; // Clear the input field
        return; // Stop further processing
      }

      const reader = new FileReader();

      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: file, // Use the Base64 string to preview the image
          QR_Code_Preview: reader.result, // Store the preview URL
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const formDataToSend = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //     formDataToSend.append(key, value);
    // });

    const formDataSend = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //     if (key !== "QR_Code_Preview" ) {
    //         // Exclude the preview URL and id from submission
    //         formDataSend.append(key, value);
    //         console.log(key,value)
    //     }
    // });
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "Offer_Banner_Preview") {
        // Exclude the preview URL and id from submission
        formDataSend.append(key, value);
        console.log(key, value);
      }
    });
    formDataSend.append("Offer_Banner_Preview", data.Offer_Banner);
    console.log(formDataSend);

    try {
      const response = await axios.post(
        "http://localhost:7777/api/auth/whiteLabel/UpdateHomePageSetting",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/UpdateHomePageSetting",
        formDataSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Details updated successfully!",
        });
        setErrors({});
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update details. Please try again.",
        });
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error updating details:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
      Swal.fire({
        icon: "error",
        title: "Failed to update details. Please try again.",
      });
    }
  };
  console.log(formData);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center mb-4">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="main shadow-none">
                  <div className="row g-4 shadow bg-body-tertiary rounded m-1 px-3 pb-4">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden ">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <>
                        <div className="text-center">
                          <h4>Enter All Correct Details For Update</h4>
                        </div>
                        <div className=" col-sm-12">
                          <label for="name" class="form-label">
                            Theme Design
                          </label>
                          <div class="input-group flex-nowrap">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="Theme_Design"
                              value={formData.Theme_Design}
                              onChange={handleChange}
                            >
                              <option selected>---Select---</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                        <div className=" col-sm-12">
                          <label for="name" class="form-label">
                            Company Name
                          </label>
                          <div class="input-group flex-nowrap">
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="Enter Enter Company Namek"
                              name="Company_Name"
                              value={formData.Company_Name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div class="mb-2">
                            <label for="homePara1" className="form-label">
                              About Us
                            </label>
                            <textarea
                              placeholder="Enter About Us"
                              className="form-control"
                              id="homePara1"
                              rows="2"
                              name="About_Us"
                              value={formData.About_Us}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div class="mb-2">
                            <label for="homePara1" className="form-label">
                              Change Notice
                            </label>
                            <textarea
                              placeholder="Enter Notice"
                              className="form-control"
                              id="homePara1"
                              rows="2"
                              name="Notice"
                              value={formData.Notice}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label for="name" class="form-label">
                            Change Training Video
                          </label>
                          <div class="input-group flex-nowrap">
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="Enter Training Video Link"
                              name="Training_Video_Link"
                              value={formData.Training_Video_Link}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label for="name" class="form-label">
                            Show Offer Banner
                          </label>
                          <div class="input-group flex-nowrap">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="Show_Offer_Banner"
                              value={formData.Show_Offer_Banner}
                              onChange={handleChange}
                            >
                              <option selected>Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-12 mt-5">
                          <label for="name" class="form-label">
                            Offer Banner (450 X 150)px
                          </label>
                          <div>
                            <img
                              src={formData.Offer_Banner_Preview}
                              width={600}
                              height={100}
                              className="img-fluid"
                            />
                          </div>
                          <div class="input-group flex-nowrap">
                            <input
                              type="file"
                              id="name"
                              name="Offer_Banner"
                              class="form-control"
                              onChange={(e) =>
                                validateImage(
                                  e,
                                  450,
                                  150,
                                  "Offer_Banner",
                                  "Offer_Banner_Preview",
                                  homepageBgRef
                                )
                              }
                              accept="image/png, image/jpeg"
                              ref={homepageBgRef}
                            />
                          </div>
                          <span className="text-danger">
                            {" "}
                            {errors["Offer_Banner"] && (
                              <div className="error">
                                {errors["Offer_Banner"]}
                              </div>
                            )}
                          </span>
                        </div>

                        <div className="col-sm-12  mt-5">
                          <label for="name" class="form-label">
                            Google Map Link
                          </label>
                          <div class="input-group flex-nowrap">
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="Enter Google Map Link"
                              name="Google_Map_Link"
                              value={formData.Google_Map_Link}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-center mb-2">
                            <button
                              type="submit"
                              className="btn p-2"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "UPDATE"}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default HomePageSetting;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  @media (min-width: 1025px) and (max-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
      padding-left: 13rem;
    }
  }
`;
