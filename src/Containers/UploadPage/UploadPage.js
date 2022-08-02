import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

import { uploadResults } from "../../Services/admin.service";

function UploadPage(props) {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
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

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const data = await uploadResults(file, sem, user.token);
      setIsLoading(false);
      notify("Results successfully uploaded!", "success");
    } catch (err) {
      setIsLoading(false);
      notify(
        err?.message || "Some error has occurred, please try again later!",
        "error"
      );
    }
  };

  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.loginDiv}>
        <div className={styles.logo}></div>
        <div className={styles.title}>Upload Results</div>
        <div className={styles.fields}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Semester No."
              value={sem}
              onChange={({ target: { value } }) => setSem(value)}
            />
          </div>
          <div className={styles.input}>
            <input type="text" placeholder="Batch number" />
          </div>
          <div className={styles.input}>
            <input
              type="file"
              placeholder="Upload Grades"
              onChange={({ target: { files } }) => setFile(files[0])}
            />
          </div>
        </div>
        <button className={styles.signin} onClick={handleUpload}>
          {isLoading ? "Loading..." : "Upload Results"}
        </button>
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default UploadPage;
