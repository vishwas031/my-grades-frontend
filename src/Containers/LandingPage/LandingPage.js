import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./LandingPage.module.css";
import Image from "../../Images/Security-cuate.svg";
import Card from 'react-bootstrap/Card';

function LandingPage(props) {
  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.left}>
          <h1>My<span>Grades</span></h1>
          <p>
          Bootstrap 5 is evolving with each release to better utilize CSS variables for global theme styles, individual components, and even utilities. We provide dozens of variables for colors, font styles, and more at a :root level for use anywhere. On components and utilities, CSS variables are scoped to the relevant class and can easily be modified.  
          <br/>
          Bootstrap 5 is evolving with each release to better utilize CSS variables for global theme styles, individual components, and even utilities. We provide dozens of variables for colors, font styles, and more at a :root level for use anywhere. On components and utilities, CSS variables are scoped to the relevant class and can easily be modified.  
          </p>
        </div>
        <div className={styles.right}>
          <img src={Image} alt="React Logo" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
