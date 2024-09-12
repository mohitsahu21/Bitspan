import React from "react";
import Lottie from "react-lottie";
import animationData from "../loading-effect.json";
import styled from "styled-components";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Wrapper>
        <h3 className="text-center text-secondary">Please Wait...</h3>
        <Lottie options={defaultOptions} height={400} width={400} />
      </Wrapper>
    </>
  );
};

export default Loading;
const Wrapper = styled.div``;
