import React from "react";

const SettingsTool = ({ handleSettings }) => {
  return (
    <button
      id="settings-tool"
      className={"simple-btn inactive"}
      title="settings"
      onClick={handleSettings}

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
