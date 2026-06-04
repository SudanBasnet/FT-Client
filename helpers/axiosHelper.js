import axios from "axios";
const rootApiep = "http://localhost:8000/api/v1";

const getAccessJWT = () => {
  return localStorage.getItem("accessJWT");
};

const apiProcessr = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    const errorResponse = {
      status: "error",
      message: error.response?.data?.message || error.message,
    };

    return errorResponse;
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

//login user
export const loginUser = (data) => {
  const obj = {
    method: "post",
    url: rootApiep + "/users/login",
    data,
  };
  console.log(obj);
  return apiProcessr(obj);
};

//get user profile
export const getUser = (data) => {
  const obj = {
    method: "get",
    url: rootApiep + "/users",
    headers: {
      Authorization: getAccessJWT(),
    },
    data,
  };
  console.log(obj);
  return apiProcessr(obj);
};

//login user
export const postNewTransaction = (data) => {
  const obj = {
    method: "post",
    url: rootApiep + "/transactions",

    headers: {
      Authorization: getAccessJWT(),
    },
    data,
  };
  console.log(obj);
  return apiProcessr(obj);
};
