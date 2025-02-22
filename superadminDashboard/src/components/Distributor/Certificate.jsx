import React, { useEffect } from "react";
import styled from "styled-components";
// import logo from "../../assets/images/images.png";
import logo from "../../assets/images/images.png";

const Certificate = ({ user, name, address, date, id }) => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <Wrapper>
      <div className="certificate-container">
        <div className="colored-side left"></div>
        <div id="certificate">
          <div className="header">
            <img src={logo} alt="UTIITSL Logo" className="logo" />
            {/* <div className="header-text">
              <h2>UTI Infrastructure Technology and Services Limited</h2>
            </div> */}
          </div>
          <div className="title-div">
            <h1 className="title">Certification of Authorization</h1>
          </div>
          <div className="body">
            <p className="id">
              <strong>
                {user} ID - {id}
              </strong>
            </p>
            <p className="para">
              This is to certify that Mr. / Ms. / Smt.{" "}
              <strong className="strong">{name}</strong>
            </p>
            <p className="para">
              Address: <strong className="strong">{address}</strong>
            </p>
            <p className="para">
              Date of Issue: <strong className="strong">{date}</strong>
            </p>
            <p className="para">
              is an authorized as a{" "}
              <strong className="strong">{user} of BITS PAN</strong>
            </p>
          </div>
          <div className="footer">
            <p>Authorised sign</p>
            <p className="sign">
              <strong>BITS PAN</strong>
            </p>
          </div>
        </div>
        <div className="colored-side right"></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;

  .certificate-container {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    background-color: #fff;
    border: 4px solid #8b0000;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }

  .colored-side {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
  }

  .left {
    left: 0;
    background: linear-gradient(to bottom, #0047ab, #8b0000);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .right {
    right: 0;
    background: linear-gradient(to bottom, #8b0000, #0047ab);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #certificate {
    width: 100%;
    text-align: center;
    padding: 0 30px;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .logo {
    height: 200px;
    width: 200px;
    margin-right: 20px;
  }

  .header-text {
    flex-grow: 1;
    text-align: center;
  }

  .title-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
    padding: 5px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: #f0f0f0;
  }

  .body {
    margin-bottom: 20px;
  }

  .para {
    text-align: start;
    margin: 10px 0;
    font-size: 20px;
  }

  .strong {
    border-bottom: 2px dotted black;
  }

  .footer {
    margin-top: 20px;
    border-top: 1px solid #000;
    padding-top: 10px;
  }
  .id {
    font-size: 20px;
  }
  .sign {
    font-size: 20px;
  }
`;

export default Certificate;
