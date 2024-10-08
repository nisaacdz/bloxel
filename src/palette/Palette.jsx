import React, {
  forwardRef,
  useEffect,
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
import SlideLeft from "./tools/Left";
import SlideRight from "./tools/Right";
import ResetTool from "./tools/Reset";
import SettingsTool from "./tools/Settings";
import LeaveApp from "./tools/Leave";
import FullScreen from "./tools/Restore";
import Sizes from "./tools/large/Sizes";

const fullSize = { width: 600, height: 45 };
const collapsedSize = { width: 60, height: 32 };

const Palette = forwardRef(
  (
    {
      updateActiveTool,
      backgroundIdx,
      updateBackgroundIdx,
      colorIdx,
      designIdx,
      sizeIdx,
      updateColorIdx,
      updateDesignIdx,
      updateSizeIdx,
      clearDrawingBoard,
      screenData,
      delPage,
      addPage,
      nextPage,
      prevPage,
      saveData,
      handleReset,
      handleLeave,
      handleRestore,
      handleSettings,
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState(false);
    const [paletteIdx, setPaletteIdx] = useState(0);
    const container = useRef(null);
    const size = useRef(fullSize);
    const position = useRef({
      x: (window.innerWidth - size.current.width) / 2,
      y: window.innerHeight - size.current.height - 15,
    });
    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
      window.addEventListener("resize", onresize);
      return () => {
        window.removeEventListener("resize", onresize);
      };
    }, []);

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

      dragOffset.current = {
        x: event.clientX - position.current.x,
        y: event.clientY - position.current.y,
      };

      container.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    };

    const handleDragEnd = (event) => {
      event.preventDefault();
      dragOffset.current = { x: 0, y: 0 };
    };

    const handleDragLeave = (event) => {
      //TODO
      event.preventDefault();
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
      size.current = collapsedSize;
      reposition();
      setCollapsed(true);
    };

    const onExpand = (event) => {
      size.current = fullSize;
      reposition();
      setCollapsed(false);
    };

    const onresize = (event) => {
      position.current = {
        x: (window.innerWidth - size.current.width) / 2,
        y: window.innerHeight - size.current.height - 15,
      };

      if (
        (window.innerWidth < size.current.width + 5 ||
          window.innerHeight < size.current.height + 5) &&
        !collapsed
      ) {
        onCollapse(event);
      } else {
        container.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }
    };

    const handleSlideLeft = () => {
      setPaletteIdx(0);
    };

    const handleSlideRight = () => {
      setPaletteIdx(1);
    };

    if (collapsed) {
      return (
        <div
          id="palette-collapsed"
          draggable="true"
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onDragLeave={handleDragLeave}
          ref={container}
          onClick={(event) => event.stopPropagation()}
          style={{
            transform: `translate(${position.current.x}px, ${position.current.y}px)`,
          }}
        >
          <button className="palette-resizer expand" onClick={onExpand}>
            <img src="./max.svg" alt="maximize palette" />
          </button>
        </div>
      );
    }

    let contents;
    if (paletteIdx === 0) {
      contents = (
        <>
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
          <SlideRight onSlideRight={handleSlideRight} />
          <button className="palette-resizer collapse" onClick={onCollapse}>
            <img src="./min.svg" alt="minimize palette" />
          </button>
        </>
      );
    } else if (paletteIdx === 1) {
      contents = (
        <>
          <SlideLeft onSlideLeft={handleSlideLeft} />
          <Sizes sizeIdx={sizeIdx} updateSizeIdx={updateSizeIdx}/>
          <PrevTool prevPage={prevPage} screenData={screenData} />
          <NextTool nextPage={nextPage} screenData={screenData} />
          <AddTool addPage={addPage} screenData={screenData} />
          <DelTool delPage={delPage} screenData={screenData} />
          <ResetTool handleReset={handleReset} />
          <LeaveApp handleLeave={handleLeave}/>
          <FullScreen handleRestore={handleRestore}/>
          <SaveTool saveData={saveData} />
          <SettingsTool handleSettings={handleSettings}/>
          <button className="palette-resizer collapse" onClick={onCollapse}>
            <img src="./min.svg" alt="minimize palette" />
          </button>
        </>
      );
    } else {
      // Shouldn't be reached! I am putting this here just in case!
      setPaletteIdx(0);
    }

    return (
      <div
        id="palette"
        draggable="true"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragLeave}
        ref={container}
        style={{
          transform: `translate(${position.current.x}px, ${position.current.y}px)`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {contents}
      </div>
    );
  }
);

export default Palette;
