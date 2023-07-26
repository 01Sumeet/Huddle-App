import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export { PrivateRoute };
export const takeUserInfo = localStorage.getItem("userInfo");
export const getUserInfo = JSON.parse(takeUserInfo);
function PrivateRoute() {
  const navigate = useNavigate();
  //   const takeRespoce = useSelector((state) => state.LoginReducer);
  //  console.log("getUserInfo==😂", getUserInfo, !getUserInfo?.success);
  useEffect(() => {
    if (!getUserInfo?.success) {
      // not logged in so redirect to login page with the return url
      // state={{ from: history.location }}
      navigate("/login");
    } else {
      navigate("/chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //authorized so return child components
  return <Outlet />;
}
