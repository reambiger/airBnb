import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import AddressForm from "./AddressForm";
import { useGeoLocation } from "../customHooks/useGeoLocation";
import MapComponent from "./MapComponent";
import UseMyCurrentLocation from "./UseMyCurrentLocation";
const styles = stylex.create({
  display: {
    display: "flex",
    flexDirection: "column",
    height: "60VH",
    alignItems: "center",
  },
  subHeader: { fontSize: "larger", color: "rgb(135,135,135)" },
  header: { fontSize: "2.5rem", marginBottom: "2vh" },
  headers: { display: "flex", flexDirection: "column", marginBottom: "5vh" },
});
const CondoLocation = () => {
  const { getUserLocation } = useGeoLocation();
  const [initialAddress, setInitialAddress] = useState(null); // Initialize with null

  const fetchUserLocation = async () => {
    try {
      const address = await getUserLocation();
      setInitialAddress(address.initialAddress);
    } catch (error) {
      console.error("Error fetching user location:", error);
      setInitialAddress(null);
    }
  };


  // console.log("🚀 ~ CondoLocation ~ location:", location)
  return (
    <section {...stylex.props(styles.display)}>
      <header {...stylex.props(styles.headers)}>
        <div {...stylex.props(styles.header)}>Confirm your address</div>
        <div {...stylex.props(styles.subHeader)}>
          Your address is only shared with guests after they’ve made a
          reservation.
        </div>
      </header>
      <main>
        <UseMyCurrentLocation onClick={fetchUserLocation}/>
        <AddressForm initialAddress={initialAddress} />
        {/* <MapComponent/> */}
      </main>
    </section>
  );
};

export default CondoLocation;
