

import React, { useEffect } from 'react';
import styled from 'styled-components';


const Certificate = ({ name, address, date, id }) => {
      useEffect(()=>{
         window.print()
      },[])

  return (
    <Wrapper>
      <div className="certificate-container">
        <div id="certificate">
          <div className="header">
            <img src="path/to/logo.png" alt="UTIITSL Logo" className="logo" />
          </div>
          <div className="title-div">
            <h1 className="title">Certification of Authorization</h1>
          </div>
          <div className="body">
            <p className="id"><strong>SUPER DISTRIBUTOR ID - {id}</strong></p>
            <p className="para">This is to certify that Mr. / Ms. / Smt. <strong className="strong">{name}</strong></p>
            <p className="para">Address: <strong className="strong">{address}</strong></p>
            <p className="para">Date of Issue: <strong className="strong">{date}</strong></p>
            <p className="para">is an authorized as a <strong className="strong">SUPER DISTRIBUTOR of BITS PAN</strong></p>
          </div>
          <div className="footer">
            <p>Authorised sign</p>
            <p><strong>BITS PAN</strong></p>
          </div>
        </div>
        
      </div>
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f8f9fa;

  .certificate-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;
    padding: 20px;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }

  #certificate {
    width: 100%;
    text-align: center;
  }

  .header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .logo {
    height: 50px;
  }

  .title-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    padding: 5px;
    border: 2px solid black;
    border-radius: 10px;
  }

  .body {
    margin-bottom: 20px;
  }

  .para {
    text-align: start;
    margin: 10px 0;
  }

  .strong {
    border-bottom: 2px dotted black;
  }

  .footer {
    margin-top: 20px;
    border-top: 1px solid #000;
    padding-top: 10px;
  }
`;

export default Certificate;