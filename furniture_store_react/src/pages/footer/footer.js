import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="footer py-3">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <Link to="/" className="nav-link"><li className="nav-item">Home</li></Link>
                    <Link className="nav-link"><li className="nav-item">Features</li></Link>
                    <Link className="nav-link"><li className="nav-item">Pricing</li></Link>
                    <Link className="nav-link"><li className="nav-item">FAQs</li></Link>
                    <Link to="/about" className="nav-link"><li className="nav-item">About</li></Link>
                </ul> 
                <p className="text-center">© 2026 Furniture Store, Inc</p>
            </footer>
        </>
    )
}

export default Footer;