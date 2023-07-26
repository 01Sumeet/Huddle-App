import axios from "axios";

const axiosInstance = async () => {
  // you need to be careful in next.js for adding cookies.
  // You could be on the server or on client. this code will work for client assuming that you will be using on client side
  // I belive you are using `parser` to get cookies. get the token
  const yourToken = "whatever";
  const authToken = localStorage.getItem("accessToken");
  const axiosClient = axios.create({
    baseURL: "http://localhost:4001/api/v1",
    headers: {
      // this is how u set in your code
      Authorization: `Bearer ${authToken}`,
    },
  });

  axiosClient.interceptors.response.use(
    (res) => {
      console.log("res", res);
    },
    (error) => {
      console.log("error", error);

      if (error?.response?.status === 400) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
        throw error;
      }
    }
  );

  return axiosClient;
};
export default axiosInstance;
