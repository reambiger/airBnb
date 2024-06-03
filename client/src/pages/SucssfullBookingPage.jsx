import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useLocation } from "react-router-dom";
import { differenceInMonths, format, getDay } from "date-fns";
import { convertStringToDate } from "../../utils";
const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30vh",
  },
  box: {
    height: "60vh",
    width: "60vw",
    border: `1px solid ${colors.myGray}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
    backgroundColor: "white",
  },
  ownerInfo: {
    display: "flex",
    flexDirection: "column",
  },
  subHeader: { fontSize: "larger" },
  Info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // paddingVertical: "2vh",
  },
  header: { fontSize: "xx-large", color: colors.bold },
  img: {
    height: "40vh",
    width: "20vw",
    borderTopLeftRadius: "27px",
    borderTopRightRadius: "27px",
    borderBottomRightRadius: "27px",
    borderBottomLeftRadius: "27px",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    paddingTop: "5vh",
    fontSize: "large",
  },
  fieldName: {
    color: colors.bold,
    // borderBottom: `1px solid ${colors.bold}`,
    marginRight: "2%",
    width: "fit-content",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${colors.myGray}`,
  },
});
const SucssfullBookingPage = () => {
  const relevantDatesPrasnatition = (dates) => {
    const rentingStartDate = convertStringToDate(dates.rentingStartDate);
    const rentingEndDate = convertStringToDate(dates.rentingEndDate);

    if (differenceInMonths(rentingStartDate, rentingEndDate) === 0) {
      return `${getDay(rentingStartDate)}-${getDay(rentingEndDate)} ${format(rentingStartDate, "MMMM")}`;
    }
    return `${getDay(rentingStartDate)}${format(rentingStartDate, "MMMM")}-${getDay(rentingEndDate)}${format(rentingEndDate, "MMMM")}`;
  };

  const location = useLocation();
  const apartmentData = location.state?.data;
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.box)}>
        <header {...stylex.props(styles.header)}>
          your apartment have been booked sucssfuly
        </header>
        <div {...stylex.props(styles.data)}>
          <img {...stylex.props(styles.img)} src={apartmentData.imgs.mainImg} />
          <div {...stylex.props(styles.Info)}>
            <div {...stylex.props(styles.ownerInfo)}>
              {/* <div {...stylex.props(styles.subHeader)}>Owner Info</div> */}
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldName)}>Owner Name:</span>
                <span>{apartmentData.user.fullName}</span>
              </div>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldName)}>Owner Email:</span>
                <span>{apartmentData.user.email}</span>
              </div>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldName)}>Owner Phone number:</span>
                <span>{apartmentData.user.phoneNumber}</span>
              </div>
            </div>
            <div >
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldName)}>Dates:</span>
                <span>{relevantDatesPrasnatition(apartmentData.dates)}</span>
              </div>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldName)}>Address:</span>

                <span>
                  {apartmentData.address},{apartmentData.city.cityName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SucssfullBookingPage;
