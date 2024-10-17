import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IncompletePanFormZlink = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // Access the data passed from the previous component
    const { data } = location.state || {};
    console.log(data)

    // Extract the content of the form tag
// const formContent = data.match(/<form[^>]*>([\s\S]*?)<\/form>/)?.[0];



// Extract the JSON part from the value attribute
let reqData;
const reqMatch = data.match(/name="req"[^>]*value='([^']+)'/);

if (reqMatch && reqMatch[1]) {
    try {
        // Parse the JSON string into a JavaScript object
         reqData = JSON.parse(reqMatch[1]);
        console.log(reqData);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
    }
}
    
  useEffect(() => {
    // Automatically submit the form when the component is mounted
    document.getElementById('panForm').submit();
    navigate('/incomplete-request-zlink');
  }, []);

  return (
    <form
      id="panForm"
      name="panForm"
      target="_blank"
      action="https://assisted-service.egov-nsdl.com/SpringBootFormHandling/incompleteApplication"
      method="post"
    >
      <input
        type="hidden"
        name="req"
        id="req"
        value={JSON.stringify(reqData)}
      />
      <center>
        <img
          src="/bootstrap/img/nsdl.png"
          alt="NSDL Logo"
          style={{ height: '100px', width: 'auto' }}
        />
        <br />
        <br />
        Redirecting to PAN application portal...
        <br />
        <br />
        <br />
        <input
          className="btn btn-success btn-lg btn-block"
          id="nsdl_btn"
          value="......"
          type="submit"
        />
      </center>
    </form>
  );
};

export default IncompletePanFormZlink;