import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uiActions from "../store/ui";
const Notification = ({ intial }) => {
  const view = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    let cid = setTimeout(() => {
      dispatch(uiActions.change({ status: undefined, message: undefined }));
    }, 2000);
    return () => clearTimeout(cid);
  }, [view.status, dispatch]);
  if (!view.status) {
    return <></>;
  }
  const styles = view.status === "success" ? "n-bg" : "n-bg error";
  return (
    <>
      <div className={styles}>{view.message}</div>
      <div className="animate"></div>
    </>
  );
};
export default Notification;
