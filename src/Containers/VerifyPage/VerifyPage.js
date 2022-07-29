import React, { useState } from "react";
import keccak256 from "keccak256";
import { toast } from "react-toastify";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

import { verifyGrades } from "../../Services/users.service";

function VerifyPage(props) {
  const [roll, setRoll] = useState("");
  const [sem, setSem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
    setResult(event.target.result);
  };

  const handleVerify = async () => {
    try {
      console.log("calling");
      setLoading(true);
      const data = await verifyGrades(
        roll,
        sem,
        keccak256(result).toString("hex")
      );
      console.log(data);
      if (data.verified)
        notify(
          "The Result is 100% correct and is not being tempered.",
          "success"
        );
      else notify("Result is tampered!", "error");
    } catch (err) {
      notify(err.message || "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.loginDiv}>
        <div className={styles.logo}></div>
        <div className={styles.title}>Verify</div>
        <div className={styles.fields}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Roll Number of Student"
              value={roll}
              onChange={({ target: { value } }) => setRoll(value)}
            />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Semester Number"
              value={sem}
              onChange={({ target: { value } }) => setSem(value)}
            />
          </div>
          Upload Grades
          <div className={styles.input}>
            <input type="file" placeholder="Upload file" onChange={onChange} />
          </div>
        </div>
        <button className={styles.signin} onClick={handleVerify}>
          {loading ? "Loading" : "Verify"}
        </button>
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default VerifyPage;
