import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import { colors } from "../tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import ShallowSearchBar from "./ShallowSearchBar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdditionalNavBar from "./AdditionalNavBar";
import MidScreenModel from "../commponents/MidScreenModel";
import MyFooter from "./MyFooter";

const styles = stylex.create({
  header: {
    borderBottom: `1px solid ${colors.myGray}`,
    width: "100vw",
    minHeight: "10vh",
    maxHeight: "30vh",
    position: "fixed",
    top: 0,
    margin: "0 auto",
    marginBottom:"10px",
    padding: "0 auto",
    backgroundColor: "white",
    zIndex:"10"
  },
  show: {
    height: "30vh",
  },
});
const Layout = () => {
  const [show, setShow] = useState("primary");
  const [scroll, setScroll] = useState({ previous: 0, current: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShow("primary");
      } else if (
        Math.abs(scroll.previous - scroll.current) >20 &&
        show === "primary"
      ) {
        setShow("shallow");
      }
      setScroll({ current: window.scrollY, previous: scroll.current });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [show, scroll]);

  const primaryVariants = {
    hidden: { opacity: 1, scale: 0.1 },
    visible: { opacity: 1, scale: 1 },
  };

  const shallowVariants = {
    hidden: { opacity: 1, scale: 2 },
    visible: { opacity: 1, scale: 1 },
  };
  const transition = { duration: 3, ease: "easeInOut" };
  return (
    <>
      <header {...stylex.props(styles.header)}>
        {show === "shallow" ? (
          <motion.section
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={shallowVariants}
            transition={{ transition }} // Increased duration for a smoother transition
          >
            <Navbar>
              <ShallowSearchBar setShow={setShow} />
            </Navbar>
          </motion.section>
        ) : (
          <motion.section
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={primaryVariants}
            transition={{ transition }} // Increased duration for a smoother transition
          >
            <Navbar>
              <AdditionalNavBar />
            </Navbar>
            <SearchBar />
          </motion.section>
        )}{" "}
      </header>
      <main>
        <Outlet />
      </main>
      <MidScreenModel></MidScreenModel>
      <MyFooter></MyFooter>
    </>
  );
};

export default Layout;
