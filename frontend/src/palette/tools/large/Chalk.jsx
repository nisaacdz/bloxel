import React, { useEffect, useState, useRef } from "react";
import { Chalk, COLORS, DESIGNS, complement } from "../../../utils";
import "./Chalk.css";

const ChalkColorPreview = ({
  color,
  updateColorIdx,
  setShowColors,
  active,
}) => {
  const borderColor = complement(color);
  const colorValue = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  const classnames = `chalk-color ${active ? "active" : "inactive"}`;
  return (
    <div
      className={classnames}
      style={{
        backgroundColor: colorValue,
        border: active
          ? `2px solid rgb(${borderColor[0]}, ${borderColor[1]}, ${borderColor[2]})`
          : "none",
      }}
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

const ChalkDesignPreview = ({ active, designIdx, colorIdx, handleClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chalk = new Chalk(DESIGNS[designIdx], COLORS[colorIdx]);

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

  const borderColor = complement(COLORS[colorIdx]);

  return (
    <canvas
      className={`chalk-design ${active ? "active" : "inactive"}`}
      ref={canvasRef}
      width="20px"
      height="20px"
      style={{
        border: active
          ? `2px solid rgb(${borderColor[0]}, ${borderColor[1]}, ${borderColor[2]})`
          : "none",
      }}
      onClick={handleClick}
    ></canvas>
  );
};

const DesignPalette = ({
  designIdx,
  updateDesignIdx,
  setShowDesigns,
  colorIdx,
}) => {
  return (
    <div id="design-palette">
      {Array.from({ length: DESIGNS.length }, (value, i) => i).map((idx) => (
        <ChalkDesignPreview
          key={idx}
          designIdx={idx}
          colorIdx={colorIdx}
          active={idx == designIdx}
          handleClick={(event) => {
            event.stopPropagation();
            updateDesignIdx(idx);
            setShowDesigns(false);
          }}
        />
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
    updateActiveTool(0);
  };

  return (
    <div id="chalk-tool" onClick={handleClick} title="chalks">
      {showColors ? (
        <ColorPalette
          colorIdx={colorIdx}
          updateColorIdx={updateColorIdx}
          setShowColors={setShowColors}
        />
      ) : (
        <ChalkColorPreview
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
        <ChalkDesignPreview
          active={true}
          designIdx={designIdx}
          colorIdx={colorIdx}
          handleClick={() => {
            setShowDesigns(true);
          }}
        />
      )}
    </div>
  );
};

export default ChalkTool;
