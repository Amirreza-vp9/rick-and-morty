import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useSelector } from "react-redux";

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

function EpisodeById() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id },
  });
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  const info = data.episode;

  return (
    <div className={`${thisTheme === "dark" ? "bg-d" : "bg-l"} min-h-[100vh]`}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1em",
          p: "1em",
          bgcolor: `${thisTheme === "dark" ? "#1e1e1e" : "#F6F6F6"}`,
        }}
      >
        <Typography
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
          }}
        >
          {info.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".5em",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
            }}
          >
            Episode:
          </Typography>
          <Typography
            sx={{ color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}` }}
          >
            {info.episode}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".5em",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
            }}
          >
            Air_date:
          </Typography>
          <Typography
            sx={{
              color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
            }}
          >
            {info.air_date}
          </Typography>
        </Box>
      </Box>
      <div className={`py-[5em] ${thisTheme === "dark" ? "bg-d" : "bg-l"}`}>
        <div className="flex items-center">
          <div className="flex gap-[.5em] items-center mb-[1em] ml-[5%] cursor-default">
            <div className="w-[.25em] h-[2.5em] bg-dgr rounded-md"></div>
            <div className="text-[2rem] font-bold tracking-wide text-dgr">
              Characters
            </div>
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
          {info.characters.map((item: any) => {
            return (
              <SwiperSlide
                key={item.id}
                className="p-[1em] text-center rounded-md bg-dgr cursor-pointer hover:bg-lgr"
                onClick={() => {
                  navigate(`/characterById/${item.id}`);
                }}
              >
                <img src={item.image} className="rounded-md" />
                <div className="mt-[.5em] text-[1.25rem] text-l">
                  {item.name}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default EpisodeById;
