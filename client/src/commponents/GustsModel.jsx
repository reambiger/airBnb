
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useDispatch, useSelector } from "react-redux";
import { decrementGusts, incrementGusts, selectBooking } from "../redux/slices/bookingSlice";
const styles = stylex.create({
  model: {
    zIndex: "100",
    // position: "absolute",
    width: "80%",
    marginTop: "3%",
    backgroundColor: "white",
    width: "100%",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    border: `2px solid ${colors.myGray}`,

    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  primary: { fontSize: "large" },
  secondary: { fontSize: "medium" },
  dataCol: {
    paddingTop: "5%",
    display: "flex",
    flexDirection: "column",
    height: "6vh",
    justifyContent: "space-between",
  },
  incDec: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  circle: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    border: "1px solid black",
    height: "30px",
    width: "30px",
    textAlign: "center",
    textJustify: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: "4%",
  },
  close: {
    width: "min-content",
    border: 0,
    backgroundColor: "white",
    color: "black",
    fontSize: "medium",
    marginBottom: "4%",
    borderBottom: "2px solid black",
    alignSelf: "flex-end",
    marginRight: "8%",
    // marginLeft: "80%",
  },
  disable: { opacity: "0.3" },
  limitP:{alignSelf:'center'}
});
const items = [
  { primary: "adults", secondary: "age 13 +" },
  { primary: "children", secondary: " age 2-12" },
  { primary: "infants", secondary: "under 12" },
];
 const GustsModel = ({beds }) => {
  
 const dispatch=useDispatch()
 const selectGusts=useSelector(selectBooking).gusts
  const handleIncrement = (item) => {
    dispatch(incrementGusts(item.primary));
  };
  const shouldDisable = () => {
    return selectGusts.overall === beds ? true : false;
  };
  const handleDecrement = (item) => {
    dispatch(decrementGusts(item.primary))  };

  return (
    <div {...stylex.props(styles.model)}>
      {items.map((item, i) => (
        <div key={i} {...stylex.props(styles.item)}>
          <div {...stylex.props(styles.dataCol)}>
            <div {...stylex.props(styles.primary)}>{item.primary}</div>
            <div {...stylex.props(styles.secondary)}>{item.secondary}</div>
          </div>
          <div {...stylex.props(styles.incDec)}>
            <button
              {...stylex.props(
                styles.circle,
                selectGusts[item.primary] === 0 && styles.disable
              )}
              onClick={(event) => {
                event.stopPropagation();
                handleDecrement(item);
              }}
            >
              -
            </button>
            <span>{selectGusts[item.primary]}</span>
            <button
              {...stylex.props(
                styles.circle,
                shouldDisable() && styles.disable
              )}
              onClick={(event) => {
                event.stopPropagation();
                handleIncrement(item);
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <p{...stylex.props(styles.limitP)}>This place has a maximum of {beds} guests</p>
      <button {...stylex.props(styles.close)} onClick={() => setModel(!model)}>
        close
      </button>
    </div>
  );
};

export default GustsModel;
