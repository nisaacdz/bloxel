import React, { useEffect, useState, useRef } from "react";
import { createChalk, COLORS, DESIGNS, DefaultChalk } from "../../../chalks";
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

const ChalkDesignPreview = ({ design, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const chalk = createChalk(design, color);

    const width = chalk.sizeX();
    const height = chalk.sizeY();
    canvas.width = width;
    canvas.height = height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const [r, g, b, a] = chalk.idx_ptr(x, y);
        const imageData = ctx.getImageData(y, x, 1, 1);
        imageData.data[0] = r;
        imageData.data[1] = g;
        imageData.data[2] = b;
        imageData.data[3] = a;
        ctx.putImageData(imageData, y, x);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onScrollCapture={1.5}
      width="20px"
      height="20px"
    ></canvas>
  );
};

const DesignPalette = ({
  designIdx,
  updateDesignIdx,
  setShowDesigns,
  color,
}) => {
  return (
    <div id="design-palette">
      {DESIGNS.map((design, idx) => (
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
          <ChalkDesignPreview key={idx} design={design} color={color} />
        </div>
      ))}
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
    updateActiveTool(DefaultChalk);
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
          color={COLORS[colorIdx]}
        />
      ) : (
        <div
          id="chalk-preview"
          onClick={(event) => {
            event.stopPropagation();
            setShowDesigns(true);
          }}
        >
          <ChalkDesignPreview
            key={designIdx}
            design={DESIGNS[designIdx]}
            color={COLORS[colorIdx]}
          />
        </div>
      )}
    </div>
  );
};

export default ChalkTool;
