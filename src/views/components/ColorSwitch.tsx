import React from "react";

const ColorSwitch = React.forwardRef(
  (
    {
      title,
      children,
      position,
    }: {
      title: string;
      position: {
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
      };
      children: React.ReactElement;
    },
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    const { top, left, right, bottom } = position;
    const ColorSwitchStyle: object = {
      position: "fixed",
      width: "250px",
      top: top && top,
      left: left && left,
      bottom: bottom && bottom,
      right: right && right,
      display: "inline",
      border: "1px solid grey",
      borderRadius: " 1em",
      backgroundColor: " rgba(0, 0, 0, .5)",
      color: "white",
      zIndex: "1000",
    };
    return (
      <div style={ColorSwitchStyle}>
        <div style={{ margin: "10px 0", paddingLeft: "60px" }}>
          <input type="color" ref={ref} style={{ marginRight: "10px" }} />
          {children}
        </div>
        <label
          style={{
            marginLeft: "10px",
            display: "inline-block",
            width: "250px",
            fontSize: "12px",
          }}
        >
          {title}
        </label>
      </div>
    );
  }
);

export default ColorSwitch;
