import React, { useState } from "react";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { IoMdPerson } from "react-icons/io";

const ImageResizerSign = () => {
  const [image, setImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 400, 200);
      canvas.toBlob(
        (blob) => {
          const resizedURL = URL.createObjectURL(blob);
          setResizedImage(resizedURL);
        },
        "image/jpeg",
        1
      );
    };
  };

  const downloadImage = () => {
    saveAs(resizedImage, "resized-image.jpg");
  };

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <h4>Get Signature</h4>
              </div>
              <div className="upload-container">
                <label className="upload-label">Upload Photo</label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="upload-input"
                />
              </div>

              <div className="text-dark text-start">
                <p className="fs-6 fw-bold">
                  Width = 400, Height = 200, DPI = 600
                </p>
              </div>

              {image && !resizedImage && (
                <div>
                  {/* Show when image is uploaded but not yet resized */}
                  {/* <img src={image} alt="Original" style={{ maxWidth: "100%" }} /> */}
                  <button className="btn btn-secondary" onClick={resizeImage}>
                    Resize Image
                  </button>
                </div>
              )}

              {resizedImage && (
                <div>
                  {/* Show when image is resized */}
                  {/* <h2>Resized Image</h2> */}
                  {/* <img src={resizedImage} alt="Resized" style={{ maxWidth: "100%" }} /> */}
                  <button className="btn btn-secondary" onClick={downloadImage}>
                    Download Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ImageResizerSign;
const Wrapper = styled.div`
  .upload-container {
    margin-bottom: 10px;
  }
  .upload-label {
    font-weight: bold;
  }
  .upload-input {
    padding: 5px;
    border: 1px solid #ccc;
  }
`;
