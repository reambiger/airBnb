import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApartmentById } from "../api";
import { useParams } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import ImagesGrid from "../commponents/ImagesGrid";
import Facilities from "../commponents/Facilities";
import ReviewsDisplay from "../commponents/ReviewsDisplay";
import AmentiasDiplsy from "../commponents/AmentiasDiplsy";
import SleepFacilities from "../commponents/SleepFacilities";
import BookingTab from "../commponents/BookingTab";
import { formatUnderScore, returnGustsAllowed } from "../../utils";
const styles = stylex.create({
  header: {
    fontSize: "xx-large",
    paddingVertical: "3vh",
    // fontWeight:"bold"
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    paddingTop: "15%",
    minHeight: "100vh",
  },
});
const ApartmentPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["apartment", id],
    queryFn: () => fetchApartmentById(id),
  });

  if (isLoading) return <div {...stylex.props(styles.pageBody)}></div>;
  if (error) {
    dispatch(setError("sorry something want wrong"));
    return <div {...stylex.props(styles.pageBody)}></div>;
  }

  return (
    <div {...stylex.props(styles.pageBody)}>
      <header {...stylex.props(styles.header)}>
        {formatUnderScore(data.city.cityName)} , {data.address}
      </header>
      {/* <main > */}
      <ImagesGrid imgs={data.imgs} />
      <SleepFacilities rooms={data.amenities.rooms} />
      <BookingTab
        price={data.priceForNight}
        beds={returnGustsAllowed(data.amenities.rooms)}
        renting={data.renting}
      />
      <Facilities facilities={data.reviews} />
      <AmentiasDiplsy amenities={data.amenities} />

      <ReviewsDisplay reviews={data.reviews.recommendations} />
      {/* todos:add roms and beds */}
      {/* </main> */}
    </div>
  );
};

export default ApartmentPage;
