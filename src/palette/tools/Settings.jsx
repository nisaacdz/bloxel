import React from "react";

const SettingsTool = ({ }) => {
  return (
    <button
      id="settings-tool"
      className={"simple-btn inactive"}
      title="settings"
    >
      <img
        className="settings-tool-img tool-img"
        src="./settings.svg"
        alt="settings-tool-btn"
      />
    </button>
  );
};

export default SettingsTool;
