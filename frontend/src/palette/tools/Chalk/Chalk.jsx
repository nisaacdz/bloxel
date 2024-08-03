import React, { useEffect, useState, useRef } from "react";
import { createChalk, COLORS, DESIGNS, DefaultChalk } from "../../../utils";
import "./Chalk.css";

const ChalkColorPreview = ({
  color,
  updateColorIdx,
  setShowColors,
  active,
}) => {
  const background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  const classnames = `color-palette-item ${active ? "active" : "inactive"}`;
  return (
    <div
      className={classnames}
      style={{ backgroundColor: background }}
      onClick={() => {
        updateColorIdx();
        setShowColors();
      }}
    ></div>
  );
};

const ColorPalette = ({ colorIdx, updateColorIdx, setShowColors }) => {
  return (
    <div id="color-palette">
      {COLORS.map((color, idx) => {
        return (
          <ChalkColorPreview
            key={idx}
            color={color}
            active={colorIdx == idx}
            updateColorIdx={() => updateColorIdx(idx)}
            setShowColors={() => setShowColors(false)}
          />
        );
      })}
    </div>
  );
};

const ChalkDesignPreview = ({ designIdx, colorIdx }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chalk = createChalk(DESIGNS[designIdx], COLORS[colorIdx]);

    const width = chalk.sizeY();
    const height = chalk.sizeX();
    canvas.width = height;
    canvas.height = width;

    const imageData = ctx.createImageData(height, width);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const [r, g, b, a] = chalk.idx_ptr(x, y);
        const index = (x * height + y) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [designIdx, colorIdx]);

  return <canvas ref={canvasRef} width="20px" height="20px"></canvas>;
};

const DesignPalette = ({
  designIdx,
  updateDesignIdx,
  setShowDesigns,
  colorIdx,
}) => {
  return (
    <div id="design-palette">
      {Array.from({ length: DESIGNS.length }, (value, index) => index).map(
        (idx) => (
          <div
            key={idx}
            className={`chalk-design ${
              idx === designIdx ? "active" : "inactive"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              updateDesignIdx(idx);
              setShowDesigns(false);
            }}
          >
            <ChalkDesignPreview key={idx} designIdx={idx} colorIdx={colorIdx} />
          </div>
        )
      )}
    </div>
  );
};

const ChalkTool = ({
  colorIdx,
  updateColorIdx,
  designIdx,
  updateDesignIdx,
  updateActiveTool,
}) => {
  const [showColors, setShowColors] = useState(false);
  const [showDesigns, setShowDesigns] = useState(false);

  const handleClick = (event) => {
    updateActiveTool(0);
  };

  return (
    <div id="chalk-tool" onClick={handleClick}>
      {showColors ? (
        <ColorPalette
          colorIdx={colorIdx}
          updateColorIdx={updateColorIdx}
          setShowColors={setShowColors}
        />
      ) : (
        <ChalkColorPreview
          key={colorIdx}
          color={COLORS[colorIdx]}
          active={true}
          updateColorIdx={() => {}}
          setShowColors={() => setShowColors(true)}
        />
      )}
      {showDesigns ? (
        <DesignPalette
          designIdx={designIdx}
          updateDesignIdx={updateDesignIdx}
          setShowDesigns={setShowDesigns}
          colorIdx={colorIdx}
        />
      ) : (
        <div
          className="chalk-preview chalk-design active"
          onClick={() => {
            setShowDesigns(true);
          }}
        >
          <ChalkDesignPreview
            key={designIdx}
            designIdx={designIdx}
            colorIdx={colorIdx}
          />
        </div>
      )}
    </div>
  );
};

export default ChalkTool;
