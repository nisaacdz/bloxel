import { createContext } from "react";

const AppContext = createContext({
    chalk_design_idx: 0,
    chalk_color_idx: 0,
    selected_tool_idx: 0,
});

export default AppContext;