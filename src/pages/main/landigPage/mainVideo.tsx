import React, { useState } from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useSelector } from "react-redux";

function MainVideo() {
  const [play, setPlay] = useState<boolean>(false);
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  const playVideo = (): void => {
    setPlay(true);
  };

  const stopVideo = (): void => {
    setPlay(false);
  };

  return (
    <div
      className={`flex justify-center items-center flex-col py-[2em] ${
        thisTheme === "dark" ? "bg-d" : "bg-l"
      }`}
    >
      <img src="/static/images/text.png" className="pb-[1em]" />
      {play ? (
        <div className="relative w-[90%]">
          <video className="rounded-md" autoPlay loop>
            <source src="/static/videos/randm.mp4" type="video/mp4"></source>
          </video>
          <CancelOutlinedIcon
            className="absolute text-dye top-[.5em] left-[.5em] cursor-pointer"
            fontSize="large"
            onClick={stopVideo}
          />
        </div>
      ) : (
        <div className="relative w-[90%]">
          <video
            className="rounded-md"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
          >
            <source src="/static/videos/randm.mp4" type="video/mp4"></source>
          </video>
          <PlayCircleFilledWhiteOutlinedIcon
            fontSize="large"
            className="anim-scale absolute top-[48%] left-[48%] translate-x-[-50%] translate-y-[-50%] cursor-pointer text-dye scale-[2]"
            onClick={playVideo}
          />
        </div>
      )}
    </div>
  );
}

export default MainVideo;
