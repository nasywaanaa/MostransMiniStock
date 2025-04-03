import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logoh1 from "../assets/ministockh1.png";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="hero">
        <h1>Manage Inventory Easily<br /></h1>
        <img src={logoh1} alt="Logo" className="logoh1" />
        <p>MiniStock is a simple warehouse management system to track incoming and outgoing goods, monitor inventory levels, and stay in control all in real time.</p>
        <button className="cta">Let’s Get Started</button>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
