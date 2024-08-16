import "./Sizes.css";
import { DefaultChalk } from "../../../utils";
import { ChalkSizes } from "../../../utils";

const Sizes = ({ sizeIdx, updateSizeIdx }) => {
  return (
    <div id="chalk-sizes" title="chalk sizes">
      {ChalkSizes.map((scale, idx) => {
        return (
          <ChalkSizePreview
            key={idx}
            active={idx == sizeIdx}
            handleClick={() => {
              updateSizeIdx(idx);
            }}
            scale={scale}
          />
        );
      })}
    </div>
  );
};

const ChalkSizePreview = ({ active, handleClick, scale }) => {
  const widthValue = Math.ceil(DefaultChalk.raw_sizeX() * scale);
  const heightValue = Math.ceil(DefaultChalk.raw_sizeY() * scale);
  const titleValue = `x${scale}`;
  return (
    <div
      className={`size-preview ${active ? "active" : "inactive"}`}
      title={titleValue}
      style={{
        width: `${widthValue}px`,
        height: `${heightValue}px`,
      }}
      onClick={handleClick}
    ></div>
  );
};

export default Sizes;
