import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import LandingHeader from "./main/landigPage/header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Paper,
  TextField,
} from "@mui/material";
import Loader from "../components/loader";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import { useSelector } from "react-redux";

const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

interface FILTER {
  name: string;
  episode: string;
}

function Episodes() {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<FILTER>({
    name: "",
    episode: "",
  });
  const [filterInfo, setFilterInfo] = useState<FILTER>({
    name: "",
    episode: "",
  });
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  const handlePagination = (e: any, p: number): void => {
    setPage(p);
  };

  const filtering = (): void => {
    setFilter(filterInfo);
  };

  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: { page, filter },
  });
  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  const info = data.episodes.results;
  console.log(data);

  return (
    <div
      className={`flex flex-col justify-center items-center pb-[2em] ${
        thisTheme === "dark" ? "bg-d" : "bg-dgr"
      }`}
    >
      <LandingHeader />
      <Box
        sx={{
          bgcolor: "white",
          mt: "2em",
          p: ".5em",
          borderRadius: ".25em",
          border: "2px solid #149487",
        }}
      >
        <Box sx={{ display: "flex", gap: "1em" }}>
          <FilterAltSharpIcon />
          <Button
            onClick={filtering}
            variant="contained"
            sx={{ ml: "auto", width: "80%" }}
          >
            submit
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            py: "1em",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          <TextField
            onChange={(e: any) =>
              setFilterInfo({ ...filterInfo, name: e.target.value })
            }
            variant="filled"
            label="Name"
          />
          <TextField
            onChange={(e: any) =>
              setFilterInfo({ ...filterInfo, episode: e.target.value })
            }
            variant="filled"
            label="Episode"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1em",
          mt: "2em",
          px: ".5em",
        }}
      >
        {info.map((item: any) => {
          return (
            <Paper sx={{ width: "auto" }} key={item.id}>
              <Card
                sx={{
                  bgcolor: `${thisTheme === "dark" ? "#1e1e1e" : "#F6F6F6"}`,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
                    }}
                    gutterBottom
                  >
                    {item.episode}
                  </Typography>
                  <Typography
                    sx={{
                      color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
                    }}
                    variant="h5"
                    component="div"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: `${thisTheme === "dark" ? "#F6F6F6" : "#1e1e1e"}`,
                    }}
                  >
                    {item.air_date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Paper>
          );
        })}
      </Box>
      <div className="bg-l p-[.5em] rounded-md mt-[2em]">
        <Stack spacing={2}>
          <Pagination
            count={data.episodes.info.pages}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handlePagination}
          />
        </Stack>
      </div>
    </div>
  );
}
export default Episodes;
