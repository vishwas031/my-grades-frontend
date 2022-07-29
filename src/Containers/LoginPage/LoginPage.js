import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";
import styles from "../../Components/Form/Form.module.css";

import { login } from "../../Services/admin.service";
import { ADMIN_TOKEN } from "../../redux/User/UserTypes";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAdminLogin = async () => {
    try {
      setLoading(true);
      const data = await login(email, password);
      console.log(data);
      notify("Successfully logged in!", "success");
      dispatch({ type: ADMIN_TOKEN, payload: { token: data.apiKey } });
      history.push("/upload");
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
        <div className={styles.title}>Login</div>
        <div className={styles.fields}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </div>
          <div className={styles.input}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </div>
        </div>
        <button className={styles.signin} onClick={handleAdminLogin}>
          {loading ? "Loading..." : "Login"}
        </button>
        <div className={styles.link}></div>
      </div>
    </div>
  );
}

export default LoginPage;
