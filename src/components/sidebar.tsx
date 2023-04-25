import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTheme } from "../redux/themeSlicer";
import { useSelector } from "react-redux";

interface LABEL {
  inputProps: {
    "aria-label": string;
  };
}

const label: LABEL = { inputProps: { "aria-label": "Switch demo" } };

interface HOVER {
  characters: boolean;
  episodes: boolean;
  home: boolean;
}

const SideBar = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<HOVER>({
    characters: false,
    episodes: false,
    home: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  const openSideBar = (): void => {
    setOpen(!open);
  };

  const switchTheme = (e: any): void => {
    if (e.target.checked === true) {
      dispatch(setCurrentTheme("dark"));
    } else {
      dispatch(setCurrentTheme("light"));
    }
  };

  return (
    <div className="absolute z-[5]">
      <div
        className={`md:hidden flex flex-col gap-[1em] fixed z-10 right-0 justify-center items-center border-l-[2px] border-b-[2px] border-dgr ${
          thisTheme === "dark" ? "bg-d" : "bg-l"
        } h-[7em] w-[5em]`}
      >
        <div
          className={`${
            open ? "pt-[.25em]" : "gap-[.25em]"
          } trans h-[2em] flex cursor-pointer rotate-[90deg]`}
          onClick={openSideBar}
        >
          <div
            className={`${
              open ? "h-[1.5em] mr-[-.8px] rotate-[45deg]" : "h-[2em]"
            } w-[2px] bg-dgr trans`}
          ></div>
          <div
            className={`${
              open ? "ml-[-.8px] rotate-[-45deg]" : ""
            } w-[2px] bg-dgr h-[1.5em] trans`}
          ></div>
        </div>
        <Switch
          {...label}
          onChange={switchTheme}
          checked={thisTheme === "dark" ? true : false}
        />
      </div>
      <div
        className={`md:flex hidden min-h-[100vh] trans ${
          open ? "w-[6em]" : "w-[12em]"
        } z-10 ${
          thisTheme === "dark" ? "bg-d" : "bg-l"
        } text-dgr fixed right-0 border-l-2 border-l-dgr flex-col justify-center items-center gap-[3em]`}
      >
        <Switch
          {...label}
          onChange={switchTheme}
          checked={thisTheme === "dark" ? true : false}
        />
        <div
          className={`${
            open ? "" : "gap-[.25em]"
          } trans h-[2em] flex cursor-pointer`}
          onClick={openSideBar}
        >
          <div
            className={`${
              open ? "h-[1.5em] mr-[-.8px] rotate-[45deg]" : "h-[2em]"
            } w-[2px] bg-dgr trans`}
          ></div>
          <div
            className={`${
              open ? "ml-[-.8px] rotate-[-45deg]" : ""
            } w-[2px] bg-dgr h-[1.5em] trans`}
          ></div>
        </div>
        <div
          className={`${
            open ? "ml-[-7em] opacity-0 cursor-default" : "cursor-pointer"
          } ver-text america trans tracking-wider`}
          onClick={() => navigate("/")}
        >
          HOME
        </div>
        <div
          className={`${
            open ? "ml-[-7em] opacity-0 cursor-default" : "cursor-pointer"
          } ver-text america trans tracking-wider`}
          onClick={() => navigate("/characters")}
        >
          CHARACTERS
        </div>
        <div
          className={`${
            open ? "ml-[-7em] opacity-0 cursor-default" : "cursor-pointer"
          } ver-text america trans tracking-wider`}
          onClick={() => navigate("/episodes")}
        >
          EPISODES
        </div>
      </div>
      {open ? (
        <div
          className={`fixed h-[100vh] navbar text-dgr 
             america justify-center
          tracking-wider text-[2rem] ${
            thisTheme === "dark" ? "bg-d" : "bg-l"
          } w-[100vw] md:pr-[3em] flex flex-col items-center gap-[1em]`}
        >
          <div
            className="flex gap-[.5em] cursor-pointer trans justify-center items-center h-[2em] px-[.25em]"
            onMouseEnter={() => setHover({ ...hover, characters: true })}
            onMouseLeave={() => setHover({ ...hover, characters: false })}
            onClick={() => {
              navigate("/characters");
              setOpen(false);
            }}
          >
            <div>CHARACTERS</div>
            {hover.characters ? (
              <EastIcon
                className="arrow"
                sx={{
                  fontSize: "2.5rem",
                  display: { sm: "block", xs: "none" },
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div
            className="flex gap-[.5em] cursor-pointer trans justify-center items-center h-[2em] px-[.25em]"
            onMouseEnter={() => setHover({ ...hover, episodes: true })}
            onMouseLeave={() => setHover({ ...hover, episodes: false })}
            onClick={() => {
              navigate("/episodes");
              setOpen(false);
            }}
          >
            <div>EPISODES</div>
            {hover.episodes ? (
              <EastIcon
                className="arrow"
                sx={{
                  fontSize: "2.5rem",
                  display: { sm: "block", xs: "none" },
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div
            className="flex gap-[.5em] cursor-pointer trans justify-center items-center h-[2em] px-[.25em]"
            onMouseEnter={() => setHover({ ...hover, home: true })}
            onMouseLeave={() => setHover({ ...hover, home: false })}
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
          >
            <div>HOME</div>
            {hover.home ? (
              <EastIcon
                className="arrow"
                sx={{
                  fontSize: "2.5rem",
                  display: { sm: "block", xs: "none" },
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default SideBar;
