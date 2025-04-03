import React from "react";
import github from "../assets/github.png";
import twitter from "../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li><a href="#">Tentang</a></li>
        <li><a href="#">Teknologi</a></li>
        <li><a href="#">Fitur</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>

      {/* garis di bawah navigasi */}
      <hr className="footer-line" />

      <div className="footer-bottom">
        <p className="copyright">2025 © Sertifichain. All Right Reserved</p>
        <div className="social-icons">
          <img src={github} alt="GitHub" />
          <img src={twitter} alt="Twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
