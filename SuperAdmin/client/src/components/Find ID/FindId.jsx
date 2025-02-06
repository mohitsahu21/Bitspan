import React, { useState, useEffect } from "react";

import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";

import Drawer from "../Mobile/Drawer.jsx";

import HeaderHomeTwo from "../HomeTwo/HeaderHomeTwo";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo";
import ProjectHomeOne from "../HomeOne/ProjectHomeOne.jsx";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";

const FindId = ({ homePage }) => {
  console.log(homePage);
  const [panNumber, setPanNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [drawer, drawerAction] = useToggle(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult([]); // Ensure result is always an array

    try {
      const response = await fetch(
        // `https://your-api.com/find-pan?pan=${panNumber}`
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUsersUsingPAN/${panNumber}`
      );
      const data = await response.json();
      console.log(data);
      if (data.success && data.data.length > 0) {
        setResult(data.data);
      } else {
        setError("❌ User Not Found! Please check the PAN number.");
      }
    } catch (err) {
      setError("🚨 Something went wrong! Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Drawer drawer={drawer} action={drawerAction.toggle} />
      <HeaderNews
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      {/* <Drawer drawer={drawer} /> */}
      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}

      <HeroNews
        title="Find UserId"
        breadcrumb={[
          { link: "/", title: "home" },
          { link: "/FindId", title: "Find UserId" },
        ]}
      />

      <div className="container mt-md-5 py-5">
        <div className="row justify-content-center mt-5 p-0 p-md-5">
          <div className="col-xl-9   ">
            <div className="card p-4 shadow">
              <h3 className="text-center mb-3">Find User by PAN</h3>
              <form onSubmit={handleSearch}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter PAN Number(e.g. ASDFG1234A)"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    style={{ textTransform: "uppercase" }}
                    required
                    pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                    title="PAN card number should be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
                    maxLength={10}
                    minLength={10}
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  // onClick={handleSearch}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search User"}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3 text-center">
                  {error}
                </div>
              )}

              {result?.length > 0 &&
                result.map((item) => {
                  return (
                    <div key={item.UserId} className="alert alert-success mt-3">
                      <h5>User Details</h5>
                      <p>
                        <strong>Name:</strong> {item.UserName}
                      </p>
                      <p>
                        <strong>UserId:</strong> {item.UserId}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <FooterHomeTwo homePage={homePage} />
      <BackToTop className="back-to-top-2 mb-2" />
      <ScrollingInfo />
    </>
  );
};

export default FindId;
