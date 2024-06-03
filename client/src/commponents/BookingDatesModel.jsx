import React from 'react'
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import MyCustomCalender from "./MyCustomCalender";
import { useDispatch } from "react-redux";
import BookingCalendar from './BookingCalendar';
import { cleanCalender } from '../redux/slices/apartmentDatesSlice';
const styles = stylex.create({
  box: {
    position: 'absolute',
    right: "0",
    height: "400px",
    width: "700px",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "white",
    zIndex: 1,
    display:'flex',
    flexDirection:"column",
    alignItems:"flex-end",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    
  },
  children:{},
  close:{
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    backgroundColor:"black",
    color:"white",
    height:"6vh",
    width:"6vw",
    position:"absolute",
    bottom:"5vh",
    right:"5vw",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  cancel:{
    position:"absolute",
    marginRight:"7vw",
    bottom:"5vh",
    right:"5vw",
    border:0,
    backgroundColor:"white",
    color:"black",
    fontSize:'medium',
    borderBottom:"2px solid black"

  }
});
const BookingDatesModel = ({children,setCalendarClicked,calendarClicked}) => {
  const dispatch=useDispatch()
  return (
    <div {...stylex.props(styles.box)}>
    <div {...stylex.props(styles.children)}>{children}</div>
    <BookingCalendar setCalendarClicked={setCalendarClicked} calendarClicked={calendarClicked} />
    <button {...stylex.props(styles.close)} onClick={()=>setCalendarClicked(null)}>close</button>
    <button {...stylex.props(styles.cancel)} onClick={()=>dispatch(cleanCalender())}>Clear dates</button>
    </div>
  )
}

export default BookingDatesModel