import React from "react";
import MainVideo from "./landigPage/mainVideo";
import LandingSwiper from "../../components/swiper/landingSwiper";

function LandingPage() {
  return (
    <div className="w-[100%]">
      <MainVideo />
      <LandingSwiper />
    </div>
  );
}

export default LandingPage;
