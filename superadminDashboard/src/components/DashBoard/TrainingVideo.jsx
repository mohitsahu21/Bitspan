import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TrainingVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser, token } = useSelector((state) => state.user);

  const [userRelation, setUserRelation] = useState([]);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchUserRelation = async () => {
      try {
        const resposne = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserRelations/${currentUser.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = resposne.data.data;
        setUserRelation(userData);
        console.log(userData);
        const { superAdmin, white_lable } = userData;
        if (white_lable) {
          const whiteLabelResponse = await axios.get(
            `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getWhiteLableData/${white_lable}`
          );
          setApiData(whiteLabelResponse.data);
          console.log(whiteLabelResponse.data);
        } else if (superAdmin) {
          // Call Super Admin API
          const superAdminResponse = await axios.get(
            `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getSuperAdminData`
          );
          setApiData(superAdminResponse.data);
          console.log(superAdminResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserRelation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to the request header
            },
          }
        );

        if (response.status === 401) {
          // 🛑 Token expired case handle karna
          console.error("❌ Token Expired. Logging out user...");
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
          });

          dispatch(clearUser()); // Redux se user data clear
          navigate("/"); // Login page pe redirect
          return;
        }

        const result = await response.json();

        // API response structure validate karna
        if (result.success && result.data) {
          setLoading(false);
          console.log("✅ API fetched successfully:", result.data);
          setHeroData(result.data);
        } else {
          console.error("❌ Invalid API response", result);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error fetching hero data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(userRelation);
  console.log(apiData);
  console.log(apiData?.data[0]?.Company_Name);

  if (!heroData) {
    return (
      <div className={`appie-loader ${loading ? "active" : ""}`}>
        Loading...
      </div>
    );
  }
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-11 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12
                             mt-5"
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ms-xxl-5">
                      {/* <div className="text-center">
                                                <h3>Training Video</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Training Video
                        </h4>
                        <p className="mx-lg-5 px-sm-5 px-2">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Training Video
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 justify-content-center pe-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                      <iframe
                        width="100%"
                        height="500px"
                        src={apiData?.data[0]?.Training_Video_Link}
                        // src={heroData.Training_Video_Link}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default TrainingVideo;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  .guidline {
  }
  .list {
    list-style: none;
    padding-left: 0;
    font-size: 14px;
  }
`;
