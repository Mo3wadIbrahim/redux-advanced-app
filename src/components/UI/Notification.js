import classes from "./Notification.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
const Notification = (props) => {
  const dispatch = useDispatch();
  const hideNotificationHandler = () => {
    dispatch(uiActions.hideNotification());
  };
  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <button onClick={hideNotificationHandler}>Close</button>
    </section>
  );
};

export default Notification;
