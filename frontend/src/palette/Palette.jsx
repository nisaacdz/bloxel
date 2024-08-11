import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./Palette.css";
import ChalkTool from "./tools/large/Chalk";
import DusterTool from "./tools/Duster";
import ClearTool from "./tools/Clear";
import NextTool from "./tools/Next";
import PrevTool from "./tools/Prev";
import AddTool from "./tools/Add";
import DelTool from "./tools/Del";
import Background from "./tools/large/Background";
import SaveTool from "./tools/save";

const Palette = forwardRef(
  (
    {
      updateActiveTool,
      backgroundIdx,
      updateBackgroundIdx,
      colorIdx,
      designIdx,
      updateColorIdx,
      updateDesignIdx,
      clearDrawingBoard,
      screenData,
      delPage,
      addPage,
      nextPage,
      prevPage,
      saveData,
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState(false);
    const container = useRef(null);
    const size = useRef({ width: 660, height: 44 });
    const position = useRef({
      x: (window.innerWidth - size.current.width) / 2,
      y: window.innerHeight - size.current.height - 5,
    });
    const dragOffset = useRef({ x: 0, y: 0 });

    useImperativeHandle(
      ref,
      () => ({
        withinRect: (x, y) => {
          const rect = container.current.getBoundingClientRect();
          const x1 = rect.left;
          const y1 = rect.top;
          const x2 = x1 + rect.width;
          const y2 = y1 + rect.height;

          return x >= x1 && y >= y1 && x < x2 && y < y2;
        },
      }),
      []
    );

    const handleDragStart = (event) => {
      event.stopPropagation();
      const rect = container.current.getBoundingClientRect();
      dragOffset.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      event.dataTransfer.setDragImage(new Image(), 0, 0);
    };

    const handleDrag = (event) => {
      event.preventDefault();
      if (!event.clientX || !event.clientY) return;

      const { x: offsetX, y: offsetY } = dragOffset.current;

      const posX = event.clientX - offsetX;
      const posY = event.clientY - offsetY;

      const maxY = window.innerHeight - container.current.offsetHeight;
      const maxX = window.innerWidth - container.current.offsetWidth;

      position.current = {
        x: Math.min(Math.max(0, posX), maxX),
        y: Math.min(Math.max(0, posY), maxY),
      };

      container.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    };

    const handleDragEnd = () => {
      // Reset drag offset
      dragOffset.current = { x: 0, y: 0 };
    };

    const reposition = () => {
      const maxY = window.innerHeight - size.current.height;
      const maxX = window.innerWidth - size.current.width;

      position.current = {
        x: Math.min(Math.max(0, position.current.x), maxX),
        y: Math.min(Math.max(0, position.current.y), maxY),
      };
    };

    const onCollapse = (event) => {
      //event.stopPropagation();
      size.current = { width: 60, height: 32 };
      reposition();
      setCollapsed(true);
    };

    const onExpand = (event) => {
      event.stopPropagation();
      size.current = { width: 660, height: 44 };
      reposition();
      setCollapsed(false);
    };

    if (collapsed) {
      return (
        <div
          id="palette-collapsed"
          draggable="true"
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          ref={container}
          style={{
            transform: `translate(${position.current.x}px, ${position.current.y}px)`,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <button className="palette-resizer" onClick={onExpand}>
            <img src="./max.svg" alt="maximize palette" />
          </button>
        </div>
      );
    }

    return (
      <div
        id="palette"
        draggable="true"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        ref={container}
        style={{
          transform: `translate(${position.current.x}px, ${position.current.y}px)`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Background
          backgroundIdx={backgroundIdx}
          updateBackgroundIdx={updateBackgroundIdx}
        />
        <ChalkTool
          colorIdx={colorIdx}
          updateColorIdx={updateColorIdx}
          designIdx={designIdx}
          updateDesignIdx={updateDesignIdx}
          updateActiveTool={updateActiveTool}
        />
        <DusterTool updateActiveTool={updateActiveTool} />
        <ClearTool clearDrawingBoard={clearDrawingBoard} />
        <PrevTool prevPage={prevPage} screenData={screenData} />
        <NextTool nextPage={nextPage} screenData={screenData} />
        <AddTool addPage={addPage} screenData={screenData} />
        <DelTool delPage={delPage} screenData={screenData} />
        <SaveTool saveData={saveData} />
        <div></div>
        <button className="palette-resizer" onClick={onCollapse}>
          <img src="./min.svg" alt="minimize palette" />
        </button>
      </div>
    );
  }
);

export default Palette;
