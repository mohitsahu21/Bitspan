import React from "react";
import { Link } from "react-router-dom";
import BlogFour from "../../assets/images/user.png";
import BlogFive from "../../assets/images/coupon.png";
import BlogSix from "../../assets/images/growth.png";
import BlogSeven from "../../assets/images/blog-7.jpg";

function BlogHomeThree() {
  return (
    <>
      <section className="appie-blog-3-area pt-90 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-section-title text-center">
                <h3 className="appie-title">How it Works</h3>
                <p>Lets Join ! Become Our Family Member</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="appie-blog-item-3 mt-30">
                <div className="thumb">
                  <img src={BlogFour} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <small className="text-success text-start">Step 1</small>
                    <br />
                    <a href="/news/single-news">Create An Account</a>
                  </h5>
                  <div className="meta-item">
                    <p>
                      Create Own Team With Your Super Distributer, Distributer
                      And Retailer Accounts.
                    </p>
                    {/* <ul>
                      <li>
                        <i className="fal fa-clock" /> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments" /> July 14, 2022
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appie-blog-item-3 mt-30">
                <div className="thumb">
                  <img src={BlogFive} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <small className="text-success text-start">Step 2</small>
                    <br />
                    <a href="/news/single-news">Buy & Distribute Coupon</a>
                  </h5>
                  <div className="meta-item">
                    <p>
                      Buy Coupon And Distribute Coupons To Your Team With
                      Realtime Coupon Updation.
                    </p>
                    {/* <ul>
                      <li>
                        <i className="fal fa-clock" /> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments" /> July 14, 2022
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-3">
              <div className="appie-blog-item-3 mt-30">
                <div className="thumb">
                  <img src={BlogSix} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <small className="text-success text-start">Step 3</small>
                    <br />
                    <a href="/news/single-news">Check History</a>
                  </h5>
                  <div className="meta-item">
                    <p>
                      Get The Realtime Coupon Buying Data, Distributed Data And
                      Joining Data.
                    </p>
                    {/* <ul>
                      <li>
                        <i className="fal fa-clock" /> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments" /> July 14, 2022
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="appie-blog-item-3 mt-30">
                <div className="thumb">
                  <img src={BlogSeven} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/news/single-news">
                      20 Myths About Mobile Applications
                    </a>
                  </h5>
                  <div className="meta-item">
                    <ul>
                      <li>
                        <i className="fal fa-clock" /> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments" /> July 14, 2022
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-lg-12">
              <div className="blog-btn text-center mt-60">
                <Link className="main-btn" to="/news">
                  View All Posts <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogHomeThree;
