import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { useSelector } from "react-redux";

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default function LandingSwiper() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={`py-[5em] ${thisTheme === "dark" ? "bg-d" : "bg-l"} `}>
      <div className="flex items-center">
        <div className="flex gap-[.5em] items-center mb-[1em] ml-[5%] cursor-default">
          <div className="w-[.25em] h-[2.5em] bg-dgr rounded-md"></div>
          <div className="text-[2rem] font-bold tracking-wide text-dgr">
            Characters
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/characters");
          }}
          className="text-[1.5rem] font-bold tracking-wide text-dgr hover:text-lgr cursor-pointer mb-[.5em] ml-auto mr-[5%]"
        >
          show more
        </div>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        loop
        navigation={true}
        modules={[Navigation, Autoplay]}
        className={`${
          thisTheme === "dark" ? "bg-d" : "bg-l"
        } w-[90%] rounded-md`}
      >
        {data.characters.results.map((item: any) => {
          return (
            <SwiperSlide
              key={item.id}
              className="p-[1em] text-center rounded-md bg-dgr cursor-pointer hover:bg-lgr"
              onClick={() => navigate(`/characterById/${item.id}`)}
            >
              <img src={item.image} className="rounded-md" />
              <div className="mt-[.5em] text-[1.25rem] text-d">{item.name}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
