import axios from "axios";
const rootApiep = "http://localhost:8000/api/v1";

const apiProcessr = async ({ method, url, data, rejectOnError = false }) => {
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
    const errorResponse = {
      status: "error",
      message: error.response?.data?.message || error.message,
    };

    if (rejectOnError) {
      throw errorResponse;
    }

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
    rejectOnError: true,
  };
  console.log(obj);
  return apiProcessr(obj);
};
