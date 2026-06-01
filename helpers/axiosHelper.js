import axios from "axios";
const rootApiep = "http://localhost:8000/api/v1";

const apiProcessr = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postNewUser = (data) => {
  const obj = {
    method: "post",
    url: rootApiep + "/users",
    data,
  };
  console.log(obj);
  return apiProcessr(obj);
};
