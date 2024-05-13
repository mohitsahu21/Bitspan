import React from "react";
import CommonPageHeader from "../../components/CommonPageHeader/CommonPageHeader";
import Footer from "../../components/shared/Footer";
import PageHelmet from "../../components/shared/PageHelmet";
import HomeOneHeader from "../Home/HomeOneHeader/HomeOneHeader";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <PageHelmet pageTitle="Login Page" />

      <HomeOneHeader />
      <CommonPageHeader title="Login" subtitle="Login" />
      <LoginForm/>

      <Footer />
    </>
  );
};

export default Login;
