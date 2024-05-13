import React from 'react';
import CommonPageHeader from '../../components/CommonPageHeader/CommonPageHeader';
import Footer from '../../components/shared/Footer';
import PageHelmet from '../../components/shared/PageHelmet';
import HomeOneHeader from '../Home/HomeOneHeader/HomeOneHeader';
import RegisterForm from './RegisterForm/RegisterForm';


const Register = () => {
    return (
        <>
           <PageHelmet pageTitle="Register Page" />
  
           <HomeOneHeader/>
           <CommonPageHeader title="Register" subtitle="Register" />
           <RegisterForm/>
          
           <Footer/>
        </>
     );
}

export default Register