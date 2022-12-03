import { Component } from "react";
import Button from "./Button";

class ColorButton extends Component {
  render() {
    const { onClick, size, selected } = this.props;

    const style =
      size === "small" ? { width: 20, height: 20 } : { width: 32, height: 32 };

    return (
      <div className={`p1 btnw ${selected ? "sel" : ""}`} style={style}>
        <Button
          type="color"
          style={{
            display: "block",
            height: "100%",
            width: "100%",
            backgroundColor: this.props.children,
          }}
          onClick={onClick}
        />
      </div>
    );
  }
}

export default ColorButton;
