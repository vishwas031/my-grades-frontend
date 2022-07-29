import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar(props) {
  const state = useSelector((state) => state.user);

  function route1() {
    switch (state.user) {
      case "Admin":
        return "";
      case "Verifier":
        return "View";
      case "Student":
        return "Register";
      default:
        break;
    }
  }
  function route2() {
    switch (state.user) {
      case "Admin":
        return state.token ? "Upload" : "Login";
      case "Verifier":
        return "Verify";
      case "Student":
        return "Results";
      default:
        break;
    }
  }

  function routeLink1() {
    switch (state.user) {
      case "Admin":
        return "/landing";
      case "Verifier":
        return "/view";
      case "Student":
        return "/register";
      default:
        break;
    }
  }
  function routeLink2() {
    switch (state.user) {
      case "Admin":
        return state.token ? "/upload" : "/login";
      case "Verifier":
        return "/verify";
      case "Student":
        return "/results";
      default:
        break;
    }
  }
  const history = useHistory();
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.brand} onClick={() => history.push("/")}>
          <h1 className={styles.title}>MyGrades </h1>
        </div>
        <div
          className={styles.links}
          onClick={() => history.push(routeLink1())}
        >
          {route1()}
        </div>
        <div
          className={styles.links}
          onClick={() => history.push(routeLink2())}
        >
          {route2()}
        </div>
      </div>
    </>
  );
}

export default NavBar;
