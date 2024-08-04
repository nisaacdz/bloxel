import React, { useState } from "react";
import "./Background.css";
import { BACKGROUNDS } from "../../../utils";

const Background = ({ backgroundIdx, updateBackgroundIdx }) => {
  const [showColors, setShowColors] = useState(false);
  return (
    <div id="background" title="change board color">
      {showColors ? (
        BACKGROUNDS.map((background, idx) => {
          return (
            <BackgroundPreview
              key={idx}
              background={background}
              active={backgroundIdx == idx}
              handleClick={() => {
                updateBackgroundIdx(idx);
                setShowColors(false);
              }}
            />
          );
        })
      ) : (
        <BackgroundPreview
          key={backgroundIdx}
          background={BACKGROUNDS[backgroundIdx]}
          active={true}
          handleClick={() => {
            setShowColors(true);
          }}
        />
      )}
    </div>
  );
};

const BackgroundPreview = ({ background, active, handleClick }) => {
  const backgroundColor = `rgb(${background[0]}, ${background[1]}, ${background[2]})`;
  return (
    <div
      className={`background-preview ${active ? "active" : "inactive"}`}
      style={{ backgroundColor: backgroundColor }}
      onClick={handleClick}
    ></div>
  );
};

export default Background;
