import { useEffect, useState } from "react";
export const useGetUserStatus = () => {
  const [isOnline, set_isOnline] = useState(true);
  let interval = null;

  const InternetErrMessagenger = () => set_isOnline(navigator.onLine === true);
  // for do like this shortform

  useEffect(() => {
    interval = setInterval(InternetErrMessagenger, 1000);
    return () => {
      clearInterval(interval); // for component unmount stop the interval
    };
  }, []);
  console.log("status", isOnline);

  return { isOnline };
};
