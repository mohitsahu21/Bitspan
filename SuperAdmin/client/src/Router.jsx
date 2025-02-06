// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import HomeOne from "./components/HomeOne/index.jsx";
// import HomeTwo from "./components/HomeTwo/index.jsx";
// import HomeThree from "./components/HomeThree/index.jsx";
// import HomeFour from "./components/HomeFour/index.jsx";
// import HomeFive from "./components/HomeFive/index.jsx";
// import HomeSix from "./components/HomeSix/index.jsx";
// import HomeSeven from "./components/HomeSeven/index.jsx";
// import HomeEight from "./components/HomeEight/index.jsx";
// import HomeDark from "./components/HomeDark/index.jsx";
// import HomeRtl from "./components/HomeRtl/index.jsx";
// import News from "./components/News/index.jsx";
// import SingleNews from "./components/News/SingleNews.jsx";
// import Service from "./components/Service/index.jsx";
// import AboutUs from "./components/AboutUs/index.jsx";
// import Contact from "./components/Contact/index.jsx";
// import Error from "./components/Error/index.jsx";
// import AboutUsTwo from "./components/AboutUs/AboutUsTwo.jsx";
// import Shops from "./components/Shops/index.jsx";
// import ShopDetails from './components/Shops/Details';
// import Layout from "./components/Helper/Layout.jsx";

// const router = createBrowserRouter([
//   {
//     path:'/',
//     Component:Layout,
//     children:[
//       // {
//       //   index:true,
//       //   element: <HomeOne />
//       // },
//       {
//         path: "/home-two",
//         element: <HomeTwo />
//       },
//       {
//         path: "/home-three",
//         element: <HomeThree />
//       },
//       {
//         path: "/home-four",
//         element: <HomeFour />
//       },
//       // {
//       //   path: "/home-five",
//       //   element: <HomeFive />
//       // },
//       // {
//       //   path: "/home-six",
//       //   element: <HomeSix />
//       // },
//       // {
//       //   path: "/home-seven",
//       //   element: <HomeSeven />
//       // },
//       // {
//       //   path: "/home-eight",
//       //   element: <HomeEight />
//       // },
//       // {
//       //   path: "/home-dark",
//       //   element: <HomeDark />
//       // },
//       // {
//       //   path: "/home-rtl",
//       //   element: <HomeRtl />
//       // },
//       {
//         path: "/news",
//         element: <News />
//       },
//       {
//         path: "/news/single-news",
//         element: <SingleNews />
//       },
//       {
//         path: "/service",
//         element: <Service />
//       },
//       {
//         path: "/about-us",
//         element: <AboutUs />
//       },
//       {
//         path: "/contact",
//         element: <Contact />
//       },
//       {
//         path: "/error",
//         element: <Error />
//       },
//       {
//         path: "/about-us-another",
//         element: <AboutUsTwo />
//       },
//       {
//         path: "/shops",
//         element: <Shops />
//       },
//       {
//         path: "/shops/shop-details",
//         element: <ShopDetails />
//       },
//       {
//         path: "*",
//         element: <Error />
//       },
//     ]
//   }
// ]);

// function Router() {
//   return (
//       <>
//         <RouterProvider router={router} />
//       </>
//   );
// }

// export default Router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeOne from "./components/HomeOne/index.jsx";
import HomeTwo from "./components/HomeTwo/index.jsx";
import HomeThree from "./components/HomeThree/index.jsx";
import HomeFour from "./components/HomeFour/index.jsx";
import HomeFive from "./components/HomeFive/index.jsx";
import HomeSix from "./components/HomeSix/index.jsx";
import HomeSeven from "./components/HomeSeven/index.jsx";
import HomeEight from "./components/HomeEight/index.jsx";
import HomeDark from "./components/HomeDark/index.jsx";
import HomeRtl from "./components/HomeRtl/index.jsx";
import News from "./components/News/index.jsx";
import SingleNews from "./components/News/SingleNews.jsx";
import Service from "./components/Service/index.jsx";
import AboutUs from "./components/AboutUs/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Error from "./components/Error/index.jsx";
import AboutUsTwo from "./components/AboutUs/AboutUsTwo.jsx";
import Shops from "./components/Shops/index.jsx";
import ShopDetails from "./components/Shops/Details";
import Layout from "./components/Helper/Layout.jsx";
import Register from "./components/Register/Register.jsx";
import FindId from "./components/Find ID/FindId.jsx";
import RefundPolicy from "./components/Policy/RefundPolicy.jsx";
import PrivacyPolicy from "./components/Policy/PrivacyPolicy.jsx";
import TermsCondition from "./components/Policy/TermsCondition.jsx";
import BankDetails from "./components/Bank Details/BankDetails.jsx";
import Loader from "./components/Helper/Loader.jsx";

function DynamicHome({ homePageData }) {
  console.log(homePageData);
  const [homePage, setLocalHomePage] = useState(null);
  const [loading, setLoading] = useState(true);

  const homeComponents = {
    1: <HomeTwo homePage={homePageData} />,
    2: <HomeThree homePage={homePageData} />,
    3: <HomeFour homePage={homePageData} />,
    4: <Error />,
  };

  useEffect(() => {
    const fetchHomePage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
        );

        const result = await response.json();

        console.log("API Response:", result); // ✅ Debugging

        if (result.success && result.data?.Theme_Design) {
          setLoading(false);
          setLocalHomePage(result.data.Theme_Design.toString());
          // setHomePage(result.data.Theme_Design.toString()); // ✅ Theme_Design ko string me convert karo
        } else {
          setLocalHomePage("4");
          // setHomePage(4); // ✅ Default Home Page
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Theme_Design:", error);
        setLocalHomePage("4");
        // setHomePage(4); // ✅ Error case me default page
      }
    };

    fetchHomePage();
  }, []);

  if (!homePage) {
    return (
      <div className={`appie-loader ${loading ? "active" : ""}`}>
        <Loader />
      </div>
    ); // ✅ Jab tak API response na aaye, loading dikhaye
  }

  return homeComponents[homePage] || <Error />; // ✅ Agar unknown Theme_Design aaye toh Error component dikhao
}

function Router() {
  const [homePageNew, setHomePageNew] = useState(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
        );

        const result = await response.json();

        console.log("API Response:", result); // ✅ Debugging

        if (result.success && result.data) {
          // setLoading(false);
          // setLocalHomePage(result.data.Theme_Design.toString());
          setHomePageNew(result.data); // ✅ Theme_Design ko string me convert karo
        }
        // } else {
        //   // setLocalHomePage("4");
        //   setHomePage(4); // ✅ Default Home Page
        //   // setLoading(false);
        // }
      } catch (error) {
        // setLoading(false);
        console.error("Error fetching Theme_Design:", error);
        // setLocalHomePage("4");
        setHomePageNew(4); // ✅ Error case me default page
      }
    };

    fetchHomePage();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <DynamicHome homePageData={homePageNew} />, // ✅ Dynamic Home Component
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/news/single-news",
          element: <SingleNews />,
        },
        {
          path: "/service",
          element: <Service />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/contact",
          element: <Contact homePage={homePageNew} />,
        },
        {
          path: "/error",
          element: <Error />,
        },
        {
          path: "/about-us-another",
          element: <AboutUsTwo />,
        },
        {
          path: "/shops",
          element: <Shops />,
        },
        {
          path: "/shops/shop-details",
          element: <ShopDetails />,
        },
        {
          path: "/Register",
          element: <Register homePage={homePageNew} />,
        },
        {
          path: "/FindId",
          element: <FindId homePage={homePageNew} />,
        },
        {
          path: "/Bank-Details",
          element: <BankDetails homePage={homePageNew} />,
        },
        {
          path: "/RefundPolicy",
          element: <RefundPolicy homePage={homePageNew} />,
        },

        {
          path: "/PrivacyPolicies",
          element: <PrivacyPolicy homePage={homePageNew} />,
        },
        {
          path: "/Terms-and-Condition",
          element: <TermsCondition homePage={homePageNew} />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
