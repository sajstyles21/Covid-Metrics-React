import React from "react";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="outerFooter">
        <div className="leftSide">
          <span>
            <b>Covid Metrics</b>
          </span>
          <p className="desc">
            All latest information and metrics about Covid-19 for all countries.
          </p>
          <div className="socialLinks">
            <a
              href="https://www.facebook.com/SaJsTyl/"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/surajax/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram />
            </a>
            <a
              href="https://twitter.com/SaJsTyLeS"
              rel="noreferrer"
              target="_blank"
            >
              <Twitter />
            </a>
          </div>
        </div>
        <div className="rightSide">
          <p>Chandigarh, Punjab, India</p>
          <p>+91 9780094701</p>
          <p>sharmasuraj41@gmail.com</p>
        </div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "15px" }}>
        &copy; 2022 Suraj Sharma
      </p>
    </>
  );
};

export default Footer;
