import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

interface PROPS {
  data: [];
}

export default function ResponsiveGrid({ data }: PROPS) {
  const navigate: Function = useNavigate();
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  const cardClick = (id: string): void => {
    navigate(`/characterById/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
        gap: "3em",
        p: "2em",
      }}
    >
      {data.map((item: any) => (
        <Paper
          sx={{
            bgcolor: `${thisTheme === "dark" ? "#149487" : "#1e1e1e"}`,
            width: "20em",
          }}
          key={item.id}
        >
          <Card
            sx={{
              width: "20em",
              p: ".25em",
              bgcolor: `${thisTheme === "dark" ? "#149487" : "#1e1e1e"}`,
            }}
          >
            <CardMedia sx={{ height: 300 }} image={item.image} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "whitesmoke" }}
              >
                {item.name}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: "-1em",
              }}
            >
              <Button
                size="small"
                variant="contained"
                onClick={() => cardClick(item.id)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Paper>
      ))}
    </Box>
  );
}
