import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Avatar,
  Button,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useSelector } from "react-redux";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      location {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
      }
      image
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

function CharacterById() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  const info = data.character;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: `${thisTheme === "dark" ? "#1e1e1e" : "#F6F6F6"}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { md: "3em", xs: "1em" },
          color: "#1e1e1e",
          flexDirection: { md: "row", xs: "column" },
          p: "1em",
        }}
      >
        <Avatar
          src={info.image}
          sx={{
            width: "15em",
            height: "15em",
            border: "5px solid #1e1e1e",
          }}
        />
        <Box>
          <Typography sx={{ fontSize: "2rem" }}>{info.name}</Typography>
          <Box sx={{ display: "flex", gap: ".5em" }}>
            <Chip
              label={info.gender}
              sx={{ fontSize: "1rem", bgcolor: "#149487", color: "whitesmoke" }}
            />
            <Chip
              label={info.species}
              sx={{ fontSize: "1rem", bgcolor: "#149487", color: "whitesmoke" }}
            />
            <Chip
              label={info.status}
              sx={{ fontSize: "1rem", bgcolor: "#149487", color: "whitesmoke" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1em",
              mt: "2em",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
              }}
            >
              Location:
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
              }}
            >
              {info.location.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1em",
        }}
      >
        <div
          className={`py-[1em] ${
            thisTheme === "dark" ? "bg-d" : "bg-l"
          } rounded-[1em] mb-[2em] mt-[1em]`}
        >
          <div className="flex gap-[.5em] items-center mb-[1em] ml-[1em] cursor-default">
            <div className="w-[.25em] h-[2.5em] bg-dgr rounded-md"></div>
            <div className="text-[2rem] font-bold tracking-wide text-dgr">
              Episodes
            </div>
          </div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            loop
            navigation={true}
            modules={[Navigation, Autoplay]}
            className={`${
              thisTheme === "dark" ? "bg-d" : "bg-l"
            } w-[20em] sm:w-[30em] md:w-[40em] lg:w-[60em] rounded-md`}
          >
            {info.episode.map((item: any) => {
              return (
                <SwiperSlide key={item.id} className="p-[.25em]">
                  <Paper sx={{ width: "auto" }}>
                    <Card
                      sx={{
                        bgcolor: `${
                          thisTheme === "dark" ? "#1e1e1e" : "#F6F6F6"
                        }`,
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: `${
                              thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"
                            }`,
                          }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {item.episode}
                        </Typography>
                        <Typography
                          sx={{
                            color: `${
                              thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"
                            }`,
                          }}
                          variant="h5"
                          component="div"
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            mb: "1.5em",
                            color: `${
                              thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"
                            }`,
                          }}
                        >
                          {item.air_date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/episodeById/${item.id}`);
                          }}
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Paper>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Box>
    </Box>
  );
}

export default CharacterById;
