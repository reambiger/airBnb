import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import { colors } from "../tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import BookingTab from "../commponents/BookingTab";

const styles = stylex.create({});
const ApartmentLayout = () => {
  return (
    <>
      <BookingTab />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ApartmentLayout;
