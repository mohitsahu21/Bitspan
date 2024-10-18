


import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectPanForm = () => {

    const location = useLocation();

    // Access the data passed from the previous component
    const { enc_data } = location.state || {};
    console.log(enc_data)


// Parse the enc_data when it's available
let cleanedEncData;
if (enc_data) {
  cleanedEncData = JSON.parse(enc_data);
  console.log(cleanedEncData);
}


useEffect(() => {
    if (cleanedEncData) {
      const submitRequest = () => {
        const url = 'https://assisted-service.egov-nsdl.com/SpringBootFormHandling/newPanReq';
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.target = "_blank";
        // The formData you want to submit
        const formData = {
          reqEntityData: {
            txnid: cleanedEncData.reqEntityData.txnid,
            reqTs: cleanedEncData.reqEntityData.reqTs,
            entityId: cleanedEncData.reqEntityData.entityId,
            dscProvider: cleanedEncData.reqEntityData.dscProvider,
            dscSerialNumber: cleanedEncData.reqEntityData.dscSerialNumber,
            dscExpiryDate: cleanedEncData.reqEntityData.dscExpiryDate,
            returnUrl: cleanedEncData.reqEntityData.returnUrl,
            formData: cleanedEncData.reqEntityData.formData,
            authKey: cleanedEncData.reqEntityData.authKey,
            branchCode: cleanedEncData.reqEntityData.branchCode,
          },
          signature: cleanedEncData.signature,
        };

        // Create a single input field with the entire formData as a JSON string
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'req'; // This matches the structure of your axios request
        input.value = JSON.stringify(formData); // JSON stringify the entire formData

        form.appendChild(input);

        // Append the form to the document body and submit it
        document.body.appendChild(form);
        form.submit();
      };

      // Trigger the form submission
      submitRequest();
       // navigate(-1);
       window.history.back(); // Navigates back to the previous page
    }
  }, [cleanedEncData]); // The useEffect will run when cleanedEncData changes or is set

  return (
    <div>
      <h1>PAN API Request</h1>
       {/* You could still have a button to submit manually, but the form will auto-submit */}
       <button onClick={() => cleanedEncData && submitRequest()}>Submit PAN Request</button>
    </div>
  );
};

export default RedirectPanForm;