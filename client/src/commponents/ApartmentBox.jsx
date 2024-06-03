import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { FaStar } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
const styles = stylex.create({
  apartmentBox: {
    width: "19vw",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  img: {
    width: "100%",
    height: "70%",
    borderRadius: "20px",
    boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  text: {},
  location: {
    fontWeight: "550",
    fontSize: "larger",
  },
  address: {
    color: "gray",
    fontWeight: "100",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  review:{
    display:"flex",
    flexDirection:"row",
    width:"40px",
    justifyContent:"space-between"
  }
});
const ApartmentBox = ({ apartment }) => {
  const navigate=useNavigate()
  const navigateToApartment=()=>{
    navigate(`/ApartmentPage/${apartment._id}`)
  }
  return (
    <div {...stylex.props(styles.apartmentBox)}>
      <img
      onClick={()=>navigateToApartment()}
        {...stylex.props(styles.img)}
        src={apartment.imgs.mainImg}
        alt="bammer"
      />
      <div {...stylex.props(styles.data)}>
        <div {...stylex.props(styles.text)}>
          <div {...stylex.props(styles.location)}>
            {apartment.city.cityName.replaceAll("_", " ")}
          </div>
          <div {...stylex.props(styles.address)}>{apartment.address}</div>
          <div>{apartment.priceForNight}$ night</div>
        </div>
        <div {...stylex.props(styles.review)}>
          {apartment.reviews?.overall}
          <FaStar />
        </div>
      </div>
    </div>
  );
};

export default ApartmentBox;
