import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

function ViewPage(props) {
  const [result, setResult] = useState("");

  const history = useHistory();

  const onChange = (event) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event) => {
    setResult(event.target.result);
  };

  const handleView = () => {
    history.push("/display", { result });
  };

  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.loginDiv}>
        <div className={styles.logo}></div>
        <div className={styles.title}>View</div>
        <div className={styles.fields}>
          Upload Grades
          <div className={styles.input}>
            <input type="file" placeholder="Upload file" onChange={onChange} />
          </div>
        </div>
        <button className={styles.signin} onClick={handleView}>
          View
        </button>
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default ViewPage;
