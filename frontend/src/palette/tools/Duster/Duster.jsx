import React from "react";
import './Duster.css';
import { DefaultDuster } from "../../../duster";

const DusterTool = ({updateActiveTool}) => {
    const handleClick = (event) => {
        updateActiveTool(DefaultDuster)
    };
    return (<div id="duster-tool" onClick={handleClick}>
        Duster
    </div>)
};

export default DusterTool;