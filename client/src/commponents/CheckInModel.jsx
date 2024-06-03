import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import MyCustomCalender from "./MyCustomCalender";
import { useDispatch } from "react-redux";
import { updateCheckIn } from "../redux/slices/datesSlice";
const styles = stylex.create({
  calender: {
    position: "relative",
    // top:"50px",
    left: "250px",
    height: "350px",
    width: "700px",
    border: `2px solid ${colors.myGray}`,
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "white",
    zIndex: 100,
    marginTop: "-7vh",
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
  },
  close: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    backgroundColor: "black",
    color: "white",
    height: "6vh",
    width: "6vw",
    position: "absolute",
    bottom: "1vh",
    right: "5vw",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
});
export default function CheckInModel({ setClicked }) {
  const dispatch = useDispatch();
  const checkInDispatch = (dates) => {
    dispatch(updateCheckIn(dates));
  };
  return (
    <div {...stylex.props(styles.calender)}>
      <MyCustomCalender
        minDate={new Date()}
        relevantDispatch={checkInDispatch}
      />
      <button onClick={() => setClicked(null)} {...stylex.props(styles.close)}>
        close
      </button>
    </div>
  );
}
