import React from "react";
import styled from "styled-components";
import ImageResizer from "./ImageResizer";
import ImageResizerSign from "./ImageResizerSign";
import { Link } from "react-router-dom";

const CropingTool = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row p-3 rounded main-container">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="shadow p-3 mb-2 bg-body rounded section-container">
                <ImageResizer />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="shadow p-3 mb-2 bg-body rounded section-container">
                <ImageResizerSign />
              </div>
             
            </div>
          </div>
          <div className="row p-3">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 p-3">
                    <Link to="https://www.ilovepdf.com/jpg_to_pdf" target="_blank">
                      <div
                        className="p-3 border rounded jpg-to-pdf"
                        style={{ background: "#4aa821", color: "#fff" , textAlign: "center"}}
                      >
                        Convert JPG to PDF
                      </div>
                      </Link>
                    </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CropingTool;
const Wrapper = styled.div`
  .main-container {
    @media (max-width: 440px) {
      height: 33.2rem;
    }
    @media (min-width: 441px) and (max-width: 767px) {
      height: 31rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      height: 31rem;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      height: 16.5rem;
    }
    @media (min-width: 1280px) and (max-width: 1600px) {
      height: 16.5rem;
    }
    @media (min-width: 1601px) and (max-width: 2000px) {
      height: 16.5rem;
    }
  }
  .section-container {
    @media (min-width: 280px) and (max-width: 440px) {
      height: 15rem;
    }
    @media (min-width: 441px) and (max-width: 767px) {
      height: 14rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      height: 14rem;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      height: 14rem;
    }
    @media (min-width: 1280px) and (max-width: 1600px) {
      height: 14rem;
    }
    @media (min-width: 1601px) and (max-width: 2000px) {
      height: 14rem;
    }
  }
  .jpg-to-pdf{
    font-size: larger;
    font-weight: bold;
  }
  a{
    text-decoration: none;
  }
`;
