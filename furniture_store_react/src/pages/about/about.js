import React from "react";
import "./about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faClock, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";

const About = () => {
    return (
        <>
            <main className="content orders-main body">
                <section className="">
                    <h2>About Us</h2>
                    <div className="d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-6 img-div"></div>
                        <div className=" col-12 col-md-6 text-div">
                            <p className="about-paragraph">At Furniture Store, we believe that furniture is more than just items that fill a space—it’s a reflection of who you are, your personality, and your lifestyle.
                                We take pride in providing you with top-notch, affordable furniture that turns your house into a home. Whether you’re furnishing your living room, bedroom, or workspace, we’ve got the perfect pieces to create a cozy, comfortable, and stylish environment.
                            </p>
                            <Link to="/contact" className="contact-link">
                                <div className="contact-div">Contact Us</div>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="home-section5">
                    <div className="text-center home-categories">
                        {/* <p>Furniture picks every room style</p> */}
                        <h2>Our Services</h2>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center cards about-section">
                        <div className="d-flex shipping align-items-center justify-content-center py-3 py-md-0">
                            <FontAwesomeIcon icon={faTruck} className="icons"></FontAwesomeIcon>
                            <h4 className="m-0">Free Shipping</h4>
                        </div>
                        <div className="d-flex clock align-items-center justify-content-center py-3 py-md-0">
                            <FontAwesomeIcon icon={faClock} className="icons"></FontAwesomeIcon>
                            <h4 className="m-0">Support 24/7</h4>
                        </div>
                        <div className="d-flex money align-items-center justify-content-center py-3 py-md-0">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="icons"></FontAwesomeIcon>
                            <h4 className="m-0">Money return</h4>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default About;