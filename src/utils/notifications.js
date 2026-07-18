import { toast } from "react-toastify";

export const completeToast = (toastId, status, message) => {
  toast.update(toastId, {
    render: message,
    type: status === "success" ? "success" : "error",
    isLoading: false,
    autoClose: 3500,
    closeButton: true,
  });
};

export const requestWithToast = async (
  request,
  { pending, success, error = "Something went wrong. Please try again." },
) => {
  const toastId = toast.loading(pending);

  try {
    const result = await request;
    const nestedError = result?.data?.status?.toLowerCase() === "error";
    const status =
      result?.status === "success" && !nestedError ? "success" : "error";
    const message =
      result?.data?.message ||
      result?.message ||
      (status === "success" ? success : error);

    completeToast(toastId, status, message);
    return { ...result, status };
  } catch (requestError) {
    completeToast(toastId, "error", requestError?.message || error);
    return { status: "error", message: requestError?.message || error };
  }
};
