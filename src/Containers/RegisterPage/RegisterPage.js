import React, { useState } from "react";
import { toast } from "react-toastify";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

import { register, verifyOtp } from "../../Services/users.service";

const NodeRSA = require("node-rsa");

function RegisterPage(props) {
  const [roll, setRoll] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

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

  const generateKeyPair = () => {
    const key = new NodeRSA({ b: 512 });
    const publicKey = key.exportKey("public");
    const privateKey = key.exportKey("private");

    return { publicKey, privateKey };
  };

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

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await register(roll);
      notify("OTP sent to mail!", "success");
      setOtpSent(true);
    } catch (err) {
      notify("User already Registered", "info");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { publicKey, privateKey } = generateKeyPair();
      await verifyOtp(roll, otp, publicKey);
      notify("Successfully registered!", "success");
      download("private_key.txt", privateKey);
    } catch (err) {
      notify("Wrong OTP", "warning");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={styles.back}>
      <NavBar />
      <div className={styles.loginDiv}>
        <div className={styles.logo}></div>
        <div className={styles.title}>Register</div>
        {otpSent ? (
          <>
            <div className={styles.fields}>
              <div className={styles.input}>
                <input
                  type="password"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={({ target: { value } }) => setOtp(value)}
                />
              </div>
            </div>
            <button className={styles.signin} onClick={handleRegister}>
              {loading ? "Loading..." : "Register"}
            </button>
          </>
        ) : (
          <>
            <div className={styles.fields}>
              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="Roll Number (20XXBCS-0XX)"
                  value={roll}
                  onChange={({ target: { value } }) => setRoll(value)}
                />
              </div>
            </div>
            <button className={styles.signin} onClick={handleSendOtp}>
              {loading ? "Loading..." : "Get OTP"}
            </button>
          </>
        )}
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default RegisterPage;
