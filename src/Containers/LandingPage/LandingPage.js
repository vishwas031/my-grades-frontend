import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./LandingPage.module.css";
import Image from "../../Images/Security-cuate.svg";

function LandingPage(props) {
  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.left}>
          <h1>My<span>Grades</span></h1>
          <h3>We ensure the <span>confidentiality</span> and <span>authenticity</span> in students grades.</h3>
          <br/>
          <p>
          Result can only be accessed by the respective registered student, no intruder can access and manipulate the grades. To ensure student do not mis-use the result and temper his/her grades, we use blockchain to provide high level of authenticity. 
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
