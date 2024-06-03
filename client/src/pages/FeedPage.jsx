import React, { useEffect, useState } from "react";
import Feed from "../commponents/Feed";
import { fetchApartments, userEnterWebsite } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { selectRender } from "../redux/slices/apartmentSlice";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens.stylex";
import { setError } from "../redux/slices/midScreenSlice";
const styles = stylex.create({
  FeedPage: {
    width: "96%",
    paddingHorizontal: "2%",
    paddingTop: "15%",
    minHeight:"100vh"
  },
  button: {
    height: "10vh",
    width: "10vw",
    backgroundColor: "black",
    color: "white",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    fontSize: "large",
    marginLeft: "45%",
  },
});
const FeedPage = () => {
  const render = useSelector(selectRender);
  const dispatch= useDispatch()

  useEffect(() => {
    const apiRequest = sessionStorage.getItem("apiRequest");
    if (apiRequest) {
    } else {
      sessionStorage.setItem(
        "apiRequest",
        "http://localhost:8000/userEnterWebsite?"
      );
    }
  }, [render]);

  const { fetchNextPage, data, status, isLoading, isError } = useInfiniteQuery({
    queryKey: ["apartments", "infinite"],
    getNextPageParam: (prevData) => prevData.pagination.nextPage,
    queryFn: ({ pageParam = 1 }) => fetchApartments(pageParam),
  });
  if (isLoading) {
    return (
      <main {...stylex.props(styles.FeedPage)}>
        <div>...loading</div>
      </main>
    );
  }
  if (isError) {
    dispatch(setError("sorry something want wrong"))
    return (
      <main {...stylex.props(styles.FeedPage)}>
       
      </main>
    );  }

  return (
    <main {...stylex.props(styles.FeedPage)}>
      <Feed apartmentsPages={data.pages} />

      <button {...stylex.props(styles.button)} onClick={fetchNextPage}>
        Show more
      </button>
    </main>
  );
};

export default FeedPage;
