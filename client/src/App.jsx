import { Route, Routes } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import Layout from "./layout/Layout";
import * as stylex from "@stylexjs/stylex";
import { colors } from "./tokens.stylex";
import BookingPage from "./pages/BookingPage";
import SucssfullBookingPage from "./pages/SucssfullBookingPage";
import MidScreenModel from "./commponents/MidScreenModel";
import CondoDeploymentPage from "./commponents/CondoDeploymentPage";
const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
    height: "110vh",
    width: "100vw",
    margin: "0 auto",
    padding: "0",
    fontFamily: "Heebo', sans-serif",
  },
});

function App() {
  return (
    <div {...stylex.props(styles.page)}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedPage />} />

          <Route path={"/ApartmentPage/:id"} element={<ApartmentPage />} />
          <Route
            path={"/sucssfullBooking/:id"}
            element={<SucssfullBookingPage />}
          />
          <Route path={"/BookingPage/:id"} element={<BookingPage />} />
          <Route
            path={"/condoDeploymentPage"}
            element={<CondoDeploymentPage />}
          />
        </Route>
      </Routes>
      <MidScreenModel />
    </div>
  );
}

export default App;
