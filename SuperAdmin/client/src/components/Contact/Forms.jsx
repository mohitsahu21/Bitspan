import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

function Forms({ homePage }) {
  console.log(homePage);
  // const [heroData, setHeroData] = useState("");
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(""); // ✅ Response message state

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
  //       );
  //       const result = await response.json();

  //       // API response structure validate karna
  //       if (result.success && result.data) {
  //         console.log("✅ API fetched successfully:", result.data);
  //         setHeroData(result.data);
  //       } else {
  //         console.error("❌ Invalid API response", result);
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching hero data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //form
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Address: "",
    Mobile_No: "",
    // subject: "",
    Message: "",
  });

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.Name.trim()) newErrors.Name = "Full Name is required";
    if (!formData.Email) {
      newErrors.Email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
      newErrors.Email = "Enter a valid email address";
    }
    if (!formData.Mobile_No) {
      newErrors.Mobile_No = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.Mobile_No)) {
      newErrors.Mobile_No = "Enter a valid 10-digit phone number";
    }
    // if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.Message.trim()) newErrors.Message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(""); // ✅ Reset previous response message

    if (validateForm()) {
      try {
        // ✅ Replace with your actual API URL
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/SAContactUs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "✅ Your message has been sent successfully!",
            confirmButtonColor: "#3085d6",
          });

          // ✅ Reset form after successful submission
          setFormData({
            Name: "",
            Email: "",
            Address: "",
            Mobile_No: "",
            // subject: "",
            Message: "",
          });
          setErrors({});
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: `❌ Error: ${result.message || "Something went wrong."}`,
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Network Error!",
          text: "❌ Network error. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Validation Error!",
        text: "❌ Please fill all required fields correctly.",
        confirmButtonColor: "#f39c12",
      });
    }
  };

  return (
    <>
      <section className="contact-section ">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="contact--info-area ">
                <h3>Get in touch</h3>
                <p>
                  Ready to begin something new? Simply fill out the form and
                  kickstart your journey!
                </p>
                <div className="single-info">
                  <h5>Address</h5>
                  <p>
                    <i className="fal fa-home"></i>
                    {/* {heroData.Address} */}
                    {homePage?.Address}
                  </p>
                </div>
                <div className="single-info">
                  <h5>Phone</h5>
                  <p>
                    <a
                      href={`tel:${homePage?.Calling_No}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <i className="fal fa-phone"></i>
                      {/* {heroData.Calling_No} */}
                      {homePage?.Calling_No}
                    </a>
                  </p>
                  <br />
                  <p>
                    <a
                      href={`https://wa.me/${homePage?.Whatsapp_No}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <i class="fab fa-whatsapp"></i>
                      {homePage?.Whatsapp_No}
                      {/* {heroData.Whatsapp_No} */}
                    </a>
                  </p>
                  {/* <FaWhatsapp className="fal" /> */}
                </div>
                <div className="single-info">
                  <h5>Email</h5>
                  <p>
                    <a
                      href={`mailto:${homePage?.Email_Id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <i className="fal fa-envelope"></i>
                      {homePage?.Email_Id}
                      {/* {heroData.Email_Id} */}
                      <br />
                      {/* help@education.com */}
                    </a>
                  </p>
                </div>
                <div className="ab-social mb-3 ">
                  <h5>Follow Us</h5>
                  <a className="fac" href={homePage?.Facebook_Link}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="twi" href={homePage?.Twitter_Link}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="you" href={homePage?.Youtube_Link}>
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a className="lin" href={homePage?.LinkedIn_Link}>
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="insta" href={homePage?.Instagram_Link}>
                    <i className="fab fa-instagram pt-1"></i>
                  </a>

                  {/* <a className="Whatsapp" href={homePage?.Whatsapp_No}>
                    <i class="fab fa-whatsapp"></i>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="contact-form">
                <h4>Let’s Connect</h4>
                <p>Reach out to us and start a conversation today!</p>
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Name"
                      placeholder="Full Name"
                      id="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      required
                    />
                    {errors.Name && (
                      <small className="error">{errors.Name}</small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      placeholder="Email Address"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                    />
                    {errors.Email && (
                      <small className="error">{errors.Email}</small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Address"
                      placeholder="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Mobile_No"
                      id="Mobile_No"
                      placeholder="Phone Number"
                      value={formData.Mobile_No}
                      onChange={handleChange}
                      required
                      minLength={10} // Ensures at least 10 characters
                      maxLength={10} // Limits to 10 characters
                      pattern="[0-9]{10}" // Ensures only 10-digit numbers
                      title="Enter a valid 10-digit phone number"
                    />
                    {errors.Mobile_No && (
                      <small className="error">{errors.Mobile_No}</small>
                    )}
                  </div>

                  {/* <div className="col-md-12">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && (
                      <small className="error">{errors.subject}</small>
                    )}
                  </div> */}

                  <div className="col-md-12">
                    <textarea
                      name="Message"
                      placeholder="Message"
                      value={formData.Message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {errors.Message && (
                      <small className="error">{errors.Message}</small>
                    )}
                  </div>

                  {/* <div className="col-md-6">
                    <div className="condition-check">
                      <input
                        id="terms-conditions"
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                      />
                      <label htmlFor="terms-conditions">
                        I agree to the <a href="#">Terms & Conditions</a>
                      </label>
                      {errors.termsAccepted && (
                        <small className="error">{errors.termsAccepted}</small>
                      )}
                    </div>
                  </div> */}

                  <div className="col-md-12 d-flex justify-content-end">
                    <input type="submit" value="Send Message" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bisylms-map">
        <iframe title="map" src={homePage?.Google_Map_Link}></iframe>
      </div>
    </>
  );
}

export default Forms;
