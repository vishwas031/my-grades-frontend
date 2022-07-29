import axios from "axios";

import { ADMIN_LOGIN_URL, UPLOAD_GRADES_URL } from "../Utils/constants";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(ADMIN_LOGIN_URL, { email, password });

    return data;
  } catch (err) {
    throw err.response.data;
  }
};

export const uploadResults = async (file, sem, token) => {
  try {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("sem", sem);
    const { data } = await axios.post(UPLOAD_GRADES_URL, formData, {
      headers: { Authorization: token },
    });

    return data;
  } catch (err) {
    throw err.response.data;
  }
};
