import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

import { fetchResults } from "../../Services/users.service";

const NodeRSA = require("node-rsa");

function ResultsPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [rollno, setRollno] = useState("");
  const [sem, setSem] = useState("");

  const notify = (message, type) =>
    toast(message, {
      type,
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const onChange = (event) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event) => {
    setPrivateKey(event.target.result);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await fetchResults(rollno, sem);
      setIsLoading(false);

      const private_key = new NodeRSA(privateKey);
      const decryptedResult = private_key.decrypt(data.result, "utf8");

      history.push("/display", { result: decryptedResult });
    } catch (err) {
      setIsLoading(false);
      notify("Incorrect private key", "error");
    }
  };

  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.loginDiv}>
        <div className={styles.logo}></div>
        <div className={styles.title}>Results</div>
        <div className={styles.fields}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Roll Number (20XXBCS-0XX)"
              value={rollno}
              onChange={({ target: { value } }) => setRollno(value)}
            />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Semester No."
              value={sem}
              onChange={({ target: { value } }) => setSem(value)}
            />
          </div>
          Upload Private Key
          <div className={styles.input}>
            <input
              type="file"
              placeholder="Upload Private key"
              onChange={onChange}
            />
          </div>
        </div>
        <button className={styles.signin} onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default ResultsPage;
