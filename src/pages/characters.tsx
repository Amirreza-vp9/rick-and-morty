import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ResponsiveGrid from "../components/cards";
import LandingHeader from "./main/landigPage/header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../components/loader";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        episode {
          id
          name
          air_date
          episode
        }
      }
    }
  }
`;

interface FILTER {
  name: string;
  status: string;
  species: string;
  gender: string;
}

function Characters() {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<FILTER>({
    name: "",
    status: "",
    species: "",
    gender: "",
  });
  const [filterInfo, setFilterInfo] = useState<FILTER>({
    name: "",
    status: "",
    species: "",
    gender: "",
  });
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  const handlePagination = (e: any, p: number): void => {
    setPage(p);
  };

  const filtering = (): void => {
    setFilter(filterInfo);
  };

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, filter },
  });
  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div
      className={`flex flex-col justify-center items-center pb-[2em] ${
        thisTheme === "dark" ? "bg-d" : "bg-l"
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
              setFilterInfo({ ...filterInfo, status: e.target.value })
            }
            variant="filled"
            label="Status"
          />
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
              setFilterInfo({ ...filterInfo, species: e.target.value })
            }
            variant="filled"
            label="Species"
          />
          <TextField
            onChange={(e: any) =>
              setFilterInfo({ ...filterInfo, gender: e.target.value })
            }
            variant="filled"
            label="Gender"
          />
        </Box>
      </Box>
      <ResponsiveGrid data={data.characters.results} />
      <div className="bg-l p-[.5em] rounded-md">
        <Stack spacing={2}>
          <Pagination
            count={data.characters.info.pages}
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
export default Characters;
