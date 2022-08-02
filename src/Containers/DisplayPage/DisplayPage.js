import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

function DisplayPage(props) {
  const location = useLocation();

  const [resultObject, setResultObject] = useState({});
  const [downloadText, setDownloadText] = useState("");

  const download = (filename, text) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  useEffect(() => {
    const result = location.state?.result;
    setDownloadText(result);
    const parsedResult = JSON.parse(result);
    delete parsedResult.roll;

    setResultObject(parsedResult);
  }, []);

  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.loginDiv}>
        <div className={styles.title}>Results</div>
        <div className={styles.fields}>
          {Object.keys(resultObject).map((subject) => (
            <div className={styles.text}>
              {subject} : {resultObject[subject]}
            </div>
          ))}
        </div>
        <button
          className={styles.signin}
          onClick={() => download("results.txt", downloadText)}
        >
          Download
        </button>
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default DisplayPage;
