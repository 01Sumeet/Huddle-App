import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
// import { RootState } from "../redux/store/Store";
export { PrivateRoute };
export const takeUserInfo = localStorage.getItem("userInfo");
export const getUserInfo = JSON.parse(takeUserInfo);
function PrivateRoute() {
  const navigate = useNavigate();
  //   const takeRespoce = useSelector((state) => state.LoginReducer);

  console.log("getUserInfo==😂", getUserInfo, !getUserInfo?.success);
  useEffect(() => {
    if (!getUserInfo?.success) {
      // not logged in so redirect to login page with the return url
      // state={{ from: history.location }}
      navigate("/login");
    } else {
      navigate("/chat");
    }
  }, []);

  //authorized so return child components
  return <Outlet />;
}
// import { Outlet, Navigate } from "react-router-dom";
// const PrivateRoutes = () => {
// let auth = {'token':false}
//   const takeUserInfo = localStorage.getItem("userInfo");
//   const getUserInfo = JSON.parse(takeUserInfo);
//   console.log("getUserInfo?.success", getUserInfo?.success);
//   return getUserInfo?.success ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoutes;
