import { getUser } from "../../helpers/axiosHelper";

export const autoLogin = async () => {
  const accessJWT = localStorage.getItem("accessJWT");
  if (!accessJWT) {
    return {};
  }

  //call api to get user
  const { status, data } = await getUser();
  return status === "success" ? data.user : {};
};
