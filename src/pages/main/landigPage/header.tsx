import React from "react";
import { useSelector } from "react-redux";

function LandingHeader() {
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  return (
    <div
      className={`w-[100%] ${
        thisTheme === "dark" ? "bg-d" : "bg-l"
      } sm:h-[10em]`}
    >
      <img
        src="/static/images/text.png"
        className="absolute left-[50%] md:left-[45%] sm:top-[.5em] translate-x-[-50%]"
      />
      <img src="/static/images/randmrun.jpg" className="ml-auto sm:hidden" />
    </div>
  );
}

export default LandingHeader;
