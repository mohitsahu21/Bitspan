import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Spinner } from "react-bootstrap";

const SambalFormEditModel = ({ item, setShowMarkEditModel, setIsRefresh }) => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [prices, setPrices] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    order_id: item.order_id,
    samagraId: item.samagra_id,
    familyId: item.family_id,
    applicantType: item.applicant_type,
    education: item.education,
    occupation: item.occupation,
    smsNotification: item.sms_notification,
    incomeTaxPayer: item.income_tax_payer,
    landOwnership: item.land_ownership,
    govtService: item.govt_service,
    mobileNumber: item.mobile_number,
    amount: item.amount,
    userId: currentUser?.userId,
  });

  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);

  //   useEffect(() => {
  //     const fetchPackage = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://2kadam.co.in/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
  //         );
  //         // console.log(response.data.data);
  //         if (Array.isArray(response.data.data)) {
  //           setPrices(response.data.data);
  //         } else {
  //           console.error("Expected an array, received:", response.data.data);
  //         }
  //       } catch (error) {
  //         console.error("Fetching package data failed:", error);
  //       }
  //     };
  //     fetchPackage();
  //   }, []);

  //   useEffect(() => {
  //     if (prices.length > 0) {
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         amount: prices[0].verify_edistrict_Certificate_Price,
  //       }));
  //     }
  //   }, [prices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "samagraId" ||
      name === "familyId" ||
      name === "mobileNumber"
    ) {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data Submitted: ", formData);
    try {
      const response = await axios.put(
        // `https://2kadam.co.in/api/auth/retailer/addSambalForm`,
        `https://2kadam.co.in/api/auth/retailer/EditSambalForm`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status == "Success") {
        Swal.fire({
          title: "Form Submitted Successfully",
          text: response?.data?.message,
          icon: "success",
        });
        setFormData({
          samagraId: "",
          familyId: "",
          applicantType: "",
          education: "",
          occupation: "",
          smsNotification: "",
          incomeTaxPayer: "",
          landOwnership: "",
          govtService: "",
          mobileNumber: "",
          amount: prices[0]?.Sambal_Price,
          userId: currentUser?.userId,
        });
        setShowMarkEditModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message || "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
    }
  };

  const handlePinChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input if current is filled, move to previous if deleted
      if (value !== "" && index < pin.length - 1) {
        pinRefs.current[index + 1].focus();
      } else if (value === "" && index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (pin[index] === "" && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };

  const verifyPin = async () => {
    try {
      const response = await axios.post(
        // `https://2kadam.co.in/api/auth/log-reg/verify-pin`,
        `https://2kadam.co.in/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return true;
      } else {
        Swal.fire({
          title: "Error verifying PIN",
          text:
            response?.data?.message || "Something went wrong! Please Try again",
          icon: "error",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      Swal.fire({
        title: "Error verifying PIN",
        text:
          error?.response?.data?.message ||
          "Something went wrong! Please Try again",
        icon: "error",
      });
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
      setPin(["", "", "", ""]);
      handleSubmit(e);
    } else {
      setPin(["", "", "", ""]); // Clear the PIN fields on incorrect entry
    }
  };

  const openPinModal = (e) => {
    e.preventDefault();
    setShowPinModal(true);
  };
  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="main shadow-none">
                {/* <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Apply Sambal</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; Apply Sambal
                      </h6>
                    </div>
                  </div>
                </div> */}
                <div className="container p-3">
                  {/* <div className="d-flex justify-content-center align-items-center">
                    <div className="col-6 mb-4 border border-danger rounded shadow-sm">
                      <h5 className="text-center m-0 p-3">Sambal</h5>
                    </div>
                  </div> */}
                  <div className="shadow p-3 mb-5 bg-body rounded">
                    <form onSubmit={openPinModal}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">समग्र आई डी :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="samagraId"
                            value={formData.samagraId}
                            onChange={handleChange}
                            required
                            maxLength={9}
                            // minLength={10}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label"> परिवार आई डी:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="familyId"
                            value={formData.familyId}
                            onChange={handleChange}
                            required
                            maxLength={9}
                            // minLength={10}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label">आवेदक का प्रकार:</label>
                          <select
                            className="form-select"
                            name="applicantType"
                            value={formData.applicantType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">- Select -</option>
                            <option value="असंगठित श्रमिक">
                              असंगठित श्रमिक
                            </option>
                            <option value="तेंदूपत्‍ता संग्राहकों">
                              तेंदूपत्‍ता संग्राहकों
                            </option>
                            <option value="गिग एवं प्लेटफॉर्म वर्कर्स">
                              गिग एवं प्लेटफॉर्म वर्कर्स
                            </option>
                          </select>
                        </div>
                        <div className="col-md-8">
                          <label className="form-label">शिक्षा:</label>
                          <select
                            className="form-select"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            required
                          >
                            <option value="">- Select -</option>
                            <option value="प्राइमरी">प्राइमरी</option>
                            <option value="मिडिल">मिडिल</option>
                            <option value="हाईस्कूल">हाईस्कूल</option>
                            <option value="हाई  सेकंडरी">हाई सेकंडरी</option>
                            <option value="स्नातक">स्नातक</option>
                            <option value="स्नातकोत्तर">स्नातकोत्तर</option>
                            <option value="निरक्षर">निरक्षर</option>
                            <option value="सक्षर">सक्षर</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          नियोजन / व्यवसाय चुनें:
                        </label>
                        <select
                          className="form-select"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          required
                        >
                          <option value="">- Select -</option>
                          <option value="कृषि में निवेश जिसमें सम्मिलित है उद्यानिकी तथा कृषि प्रसंस्करण">
                            कृषि में निवेश जिसमें सम्मिलित है उद्यानिकी तथा कृषि
                            प्रसंस्करण
                          </option>
                          <option value="दुग्ध-उद्योग (डेरी), मुर्गीपालन, सुअरपालन तथा अन्य पशुपालन में नियोजन">
                            दुग्ध-उद्योग (डेरी), मुर्गीपालन, सुअरपालन तथा अन्य
                            पशुपालन में नियोजन
                          </option>
                          <option value="मछलीपालन में नियोजन">
                            मछलीपालन में नियोजन
                          </option>
                          <option value="वानिकी में नियोजन जिसमें सम्मिलित है मुख्य तथा गौण वन उपज के उत्खनन तथा संग्रहण से संबंधित क्रियाकलाप">
                            वानिकी में नियोजन जिसमें सम्मिलित है मुख्य तथा गौण
                            वन उपज के उत्खनन तथा संग्रहण से संबंधित क्रियाकलाप
                          </option>
                          <option value="रेशम-उत्पादन में नियोजन">
                            रेशम-उत्पादन में नियोजन
                          </option>
                          <option value="लेटराइट, गोलाश्म, मृत्तिका का निकाला जाना, भवन का पत्थर, सड़क की गिट्टी, बजरी, मुरम, रेत तथा मिट्टी खदान क्रिया उत्खनन में नियोजन">
                            लेटराइट, गोलाश्म, मृत्तिका का निकाला जाना, भवन का
                            पत्थर, सड़क की गिट्टी, बजरी, मुरम, रेत तथा मिट्टी
                            खदान क्रिया उत्खनन में नियोजन
                          </option>
                          <option value="पत्थर को तोड़ने तथा दलने में नियोजन">
                            पत्थर को तोड़ने तथा दलने में नियोजन
                          </option>
                          <option value="पकी ईंट तथा टाइल बनाने में नियोजन">
                            पकी ईंट तथा टाइल बनाने में नियोजन
                          </option>
                          <option value="9.(क)किसी बाजार या दुकान या डिपो या कारखाना या भांडागार या गोदाम या किसी अन्य स्थापना, एवं (ख)मध्यप्रदेश कृषि उपज मंडी अधिनियम, 1972 (क्रमांक 24 सन् 1973) के अधीन गठित मण्डी समितियों के नियंत्रणाधीन कोई बाजार,में लदाई-उतराई, ढेर लगाने (स्टॅकिंग), पैकिंग करने, वहन करने, तौलने, मापने और ऐसे ही अन्य शारीरिक कार्य, जिसमें उसकी तैयारी तथा अन्य संयुक्त कार्य शामिल हैं, में नियोजन. ">
                            (क)किसी बाजार या दुकान या डिपो या कारखाना या
                            भांडागार या गोदाम या किसी अन्य स्थापना, एवं
                            (ख)मध्यप्रदेश कृषि उपज मंडी अधिनियम, 1972 (क्रमांक
                            24 सन् 1973) के अधीन गठित मण्डी समितियों के
                            नियंत्रणाधीन कोई बाजार,में लदाई-उतराई, ढेर लगाने
                            (स्टॅकिंग), पैकिंग करने, वहन करने, तौलने, मापने और
                            ऐसे ही अन्य शारीरिक कार्य, जिसमें उसकी तैयारी तथा
                            अन्य संयुक्त कार्य शामिल हैं, में नियोजन
                          </option>
                          <option value="सार्वजनिक परिवहन यानों में माल की लदाई या उनसे माल की उतराई से संबंधित तथा कोई अन्य आनुषंगिक या संसक्त प्रचालन में नियोजन">
                            सार्वजनिक परिवहन यानों में माल की लदाई या उनसे माल
                            की उतराई से संबंधित तथा कोई अन्य आनुषंगिक या संसक्त
                            प्रचालन में नियोजन
                          </option>
                          <option value="गोदाम में खाद्यान की लदाई, उतराई तथा वहन करना खाद्यान्नों की छटाई तथा सफाई, खाद्यान्नों का बोरों में भरना, ऐसे बोरों की सिलाई करना तथा उससे तथा आनुषंगिक तथा संसक्त अन्य कार्य में, के संबंध में नियोजन">
                            गोदाम में खाद्यान की लदाई, उतराई तथा वहन करना
                            खाद्यान्नों की छटाई तथा सफाई, खाद्यान्नों का बोरों
                            में भरना, ऐसे बोरों की सिलाई करना तथा उससे तथा
                            आनुषंगिक तथा संसक्त अन्य कार्य में, के संबंध में
                            नियोजन
                          </option>
                          <option value="खादी, हथकरघा (हैंडलूम) तथा पावरलूम उद्योग में नियोजन">
                            खादी, हथकरघा (हैंडलूम) तथा पावरलूम उद्योग में नियोजन
                          </option>
                          <option value="कपड़े का विरंजित करना (ब्लीचिंग) रंगाई तथा छपाई में नियोजन">
                            कपड़े का विरंजित करना (ब्लीचिंग) रंगाई तथा छपाई में
                            नियोजन
                          </option>
                          <option value="सिलाई में नियोजन">
                            सिलाई में नियोजन
                          </option>
                          <option value="सुगन्धित तीलियां (अगरबत्ती) के बनाने में नियोजन">
                            सुगन्धित तीलियां (अगरबत्ती) के बनाने में नियोजन
                          </option>
                          <option value="कढ़ाई, स्मॉकिंग तथा तैयार वस्त्र (रेडीमेड गारमेन्ट्स) बनाने में नियोजन">
                            कढ़ाई, स्मॉकिंग तथा तैयार वस्त्र (रेडीमेड गारमेन्ट्स)
                            बनाने में नियोजन
                          </option>
                          <option value="पापड़, अचार, जेम्स, जेली, अन्य परिरक्षित खाद्य पदार्थ, पिसे मसाले तथा वासक बनाने में नियोजन">
                            पापड़, अचार, जेम्स, जेली, अन्य परिरक्षित खाद्य
                            पदार्थ, पिसे मसाले तथा वासक बनाने में नियोजन
                          </option>
                          <option value="खाना बनाने में नियोजन">
                            खाना बनाने में नियोजन
                          </option>
                          <option value="खिलौने बनाने में नियोजन">
                            खिलौने बनाने में नियोजन
                          </option>
                          <option value="चमड़े के शोधन तथा प्रसंस्करण में नियोजन">
                            चमड़े के शोधन तथा प्रसंस्करण में नियोजन
                          </option>
                          <option value="जूते तथा चमड़े की अन्य वस्तुएं बनाने तथा मरम्मत करने में नियोजन">
                            जूते तथा चमड़े की अन्य वस्तुएं बनाने तथा मरम्मत करने
                            में नियोजन
                          </option>
                          <option value="सफाई तथा झाड़ू-बहारू सेवाओं में नियोजन">
                            सफाई तथा झाड़ू-बहारू सेवाओं में नियोजन
                          </option>
                          <option value="रैग-पिकिंग में नियोजन">
                            रैग-पिकिंग में नियोजन
                          </option>
                          <option value="दरवाजे-दरवाजे (द्वार-द्वार पर) पुराने समाचार-पत्रों (रद्दी) का संग्रहण (तथा विक्रय) तथा त्यक्त वस्तुएं (कबाड़ी) में नियोजन">
                            दरवाजे-दरवाजे (द्वार-द्वार पर) पुराने समाचार-पत्रों
                            (रद्दी) का संग्रहण (तथा विक्रय) तथा त्यक्त वस्तुएं
                            (कबाड़ी) में नियोजन
                          </option>
                          <option value="बेचने वाला (हॉकर) तथा मार्ग में फेरी लगाकर बेचने वाला (स्ट्रीट वेण्डर) के रूप में नियोजन">
                            बेचने वाला (हॉकर) तथा मार्ग में फेरी लगाकर बेचने
                            वाला (स्ट्रीट वेण्डर) के रूप में नियोजन
                          </option>
                          <option value="मोटर परिवहन कर्मकार अधिनियम, 1961 (1961 का 27) में यथा परिभाषित मोटर परिवहन कर्मकार">
                            मोटर परिवहन कर्मकार अधिनियम, 1961 (1961 का 27) में
                            यथा परिभाषित मोटर परिवहन कर्मकार
                          </option>
                          <option value="साइकिल-रिक्शा, आटो-रिक्शा तथा टैक्सी चलाने में ऐसा नियोजन जो ‘‘मोटर परिवहन कर्मकार** की श्रेणी में नहीं आता">
                            साइकिल-रिक्शा, आटो-रिक्शा तथा टैक्सी चलाने में ऐसा
                            नियोजन जो ‘‘मोटर परिवहन कर्मकार** की श्रेणी में नहीं
                            आता
                          </option>
                          <option value="आटा, तेल, दाल तथा चावल मिल में नियोजन">
                            आटा, तेल, दाल तथा चावल मिल में नियोजन
                          </option>
                          <option value="प्रायवेट सुरक्षा सेवाओं में नियोजन">
                            प्रायवेट सुरक्षा सेवाओं में नियोजन
                          </option>
                          <option value="प्लास्टिक उद्योगों में नियोजन.">
                            प्लास्टिक उद्योगों में नियोजन.
                          </option>
                          <option value="लकड़ी का काम करने की इकाइयों में नियोजन">
                            लकड़ी का काम करने की इकाइयों में नियोजन
                          </option>
                          <option value="बर्तन बनाने में नियोजन.">
                            बर्तन बनाने में नियोजन.
                          </option>
                          <option value="कारीगर (शिल्पी) जैसे लुहार, बढ़ई, गारा बनाने, चाक बनाने (कुम्हार) आदि में नियोजन">
                            कारीगर (शिल्पी) जैसे लुहार, बढ़ई, गारा बनाने, चाक
                            बनाने (कुम्हार) आदि में नियोजन
                          </option>
                          <option value="दरी तथा कारपेट बनाने में नियोजन">
                            दरी तथा कारपेट बनाने में नियोजन
                          </option>
                          <option value="आतिशबाजी तथा माचिस उद्योग में नियोजन">
                            आतिशबाजी तथा माचिस उद्योग में नियोजन
                          </option>
                          <option value="डब्बे तथा पैकिंग की अन्य सामग्री बनाने में नियोजन">
                            डब्बे तथा पैकिंग की अन्य सामग्री बनाने में नियोजन
                          </option>
                          <option value="वर्ष में 90 दिवस से कम अवधि हेतु भवन एवं अन्य संनिर्माण कार्यो में नियोजन">
                            वर्ष में 90 दिवस से कम अवधि हेतु भवन एवं अन्य
                            संनिर्माण कार्यो में नियोजन
                          </option>
                        </select>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label">
                            क्या आप व्हाट्स अप पर सूचना प्राप्त करना चाहेंगे?
                          </label>
                          <div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="smsNotification"
                                value="Yes"
                                checked={formData.smsNotification === "Yes"}
                                onChange={handleChange}
                                required
                              />
                              <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="smsNotification"
                                value="No"
                                checked={formData.smsNotification === "No"}
                                onChange={handleChange}
                              />
                              <label className="form-check-label">No</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">
                            क्या आयकर दाता हैं?
                          </label>
                          <select
                            className="form-select"
                            name="incomeTaxPayer"
                            value={formData.incomeTaxPayer}
                            onChange={handleChange}
                            required
                          >
                            <option value="">- Choose -</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="col-md-5">
                          <label className="form-label">
                            मेरे अथवा मेरे पति/पत्नी के पास एक हेक्यटेयर से अधिक
                            कृषि भूमि है:
                          </label>
                          <select
                            className="form-select"
                            name="landOwnership"
                            value={formData.landOwnership}
                            onChange={handleChange}
                            required
                          >
                            <option value="">- Choose -</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-5">
                          <label className="form-label">
                            क्या आप या आपकी पति /पत्नी किसी शासकीय सेवा में
                            कार्यरत हैं ?
                          </label>
                          <select
                            className="form-select"
                            name="govtService"
                            value={formData.govtService}
                            onChange={handleChange}
                            required
                          >
                            <option value="">- Choose -</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">मोबाइल नंबर:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            maxLength={10}
                            minLength={10}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">कीमत:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            disabled
                            readOnly
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                    <Modal
                      show={showPinModal}
                      onHide={() => setShowPinModal(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Enter 4-Digit PIN</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="pin-inputs d-flex justify-content-center">
                          {pin.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (pinRefs.current[index] = el)}
                              type="text"
                              value={digit ? "●" : ""} // Show a dot if digit is entered, otherwise empty
                              maxLength="1"
                              onChange={(e) =>
                                handlePinChange(index, e.target.value)
                              }
                              onKeyDown={(e) =>
                                e.key === "Backspace" && handleBackspace(index)
                              }
                              className="pin-digit form-control mx-1"
                              style={{
                                width: "50px",
                                textAlign: "center",
                                fontSize: "1.5rem",
                                borderRadius: "8px",
                                border: "1px solid #ced4da",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                              }}
                            />
                          ))}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowPinModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleModalSubmit}
                          disabled={isVerifying}
                        >
                          {isVerifying ? "Verifying..." : "Verify PIN"}
                          {isVerifying && (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SambalFormEditModel;

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
  .custom-dropdown {
    font-size: 16px;
    border-radius: 5px;
  }

  .custom-dropdown option {
    background-color: #e8e4f0;
    color: #343a40;
  }
`;
