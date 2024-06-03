import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  footer: {
    backgroundColor: "#f2f2f2",
    padding: "20px 0",
    color: "#666",
    textAlign: "center",
    fontSize: " 14px",
    marginTop:"10vh"
  },

  p: {
    margin: "5px 0",
  },
  container: {
    // margin: "5px 0",
  },
});
const MyFooter = () => {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <p {...stylex.props(styles.p)}>© 2024 Airbnb. All rights reserved.</p>
        <p {...stylex.props(styles.p)}>Terms · Privacy · Site Map</p>
        <p {...stylex.props(styles.p)}>
          Explore · List your space · How Airbnb works · Newsroom · Investors
        </p>
        <p {...stylex.props(styles.p)}>
          Airbnb Luxe · HotelTonight · Airbnb for Work · Olympics · Careers
        </p>
        <p {...stylex.props(styles.p)}>
          Founders' Letter · Airbnb Plus · Airbnb for Pets · Gift cards ·
          Airbnb.org
        </p>
      </div>
    </footer>
  );
};

export default MyFooter;
