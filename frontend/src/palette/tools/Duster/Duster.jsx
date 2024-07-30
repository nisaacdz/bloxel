import React from "react";
import './Duster.css';
import { DefaultDuster } from "../../../duster";

const DusterTool = ({updateActiveTool}) => {
    const handleClick = (event) => {
        updateActiveTool(DefaultDuster)
    };
    return (<div id="duster-tool" onClick={handleClick}>
        <img id="duster-tool-img" src="./eraser2.svg" alt="easer-img"/>
    </div>)
};

export default DusterTool;