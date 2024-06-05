import React, { useState } from 'react';
import styled from 'styled-components';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


const steps = [
    { number: 1, name: 'Personal Details' },
    { number: 2, name: 'Parental Information' },
    { number: 3, name: 'Address Details' },
    { number: 4, name: 'Contact Details' }
  ];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({

    // personal details
    nameTitle : '',  // select option kumari , shri, smt 
    firstName: '',
    middleName: '',
    lastName: '',
    nameOnCard : '',
    otherName : '',
    gender: '',
    dob: '',
    addressForCommunication : '',  // selected option "office or residence"
    residentState : ''  ,
    officeState : '',
    representativeState : '',
    aadhaarNumber : '',
    enrolmentId : '' ,
    NameAsPerAadhaar : '',

   // document and payment

   identityProof : '' ,
   addressProof : '' ,
   dobProof : '',


   // contact and parent details
   //contact details
   telephoneIsdCode : '',   // select country 
   areaStdCode : '',          // enter std code
   telephoneMobile : '',     // select telephone or mobile
   telephoneMobileNumber : '',
   emailId : '',
    fatherName: '',

   // parent details 

   isMotherSingleParent : '', // select yes or no;

   fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
   motherFirstName: '',
   motherMiddleName: '',
   motherLastName: '',
   namePrintedOnCard : '' , // select option for mother or father name

   // address details 
   
   // residential state

   flatDoorBlockNumber : '',
  



   
    
    
    city: '',
    state: '',
    pincode: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setCurrentStep(currentStep + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      console.log('Form Data Submitted:', formData);
    } else {
      setErrors(stepErrors);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.fatherName) newErrors.fatherName = 'Father name is required';
        break;
      case 3:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        break;
      case 4:
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;
      default:
        break;
    }
    return newErrors;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <Step4 formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <FormWrapper>
      <h2>Form 49A - PAN Application</h2>
      <div className="step-header">
        <h3>Step {steps[currentStep - 1].number}: {steps[currentStep - 1].name}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="button-group">
          {currentStep > 1 && <button type="button" onClick={handlePrevious}>Previous</button>}
          {currentStep < 4 && <button type="button" onClick={handleNext}>Next</button>}
          {currentStep === 4 && <button type="submit">Submit</button>}
        </div>
      </form>
    </FormWrapper>
  );
};

export default MultiStepForm;

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }
  .step-header {
    margin-bottom: 20px;
    text-align: center;
    h3 {
      margin: 0;
      font-size: 1.2em;
    }
  }

  button {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;