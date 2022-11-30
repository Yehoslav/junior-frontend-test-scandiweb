import { Component } from "react";
import Button from "./Button";

class ImageButton extends Component {
  render() {
    const { onClick, alt, classes, selected, value } = this.props;

    const style = { width: 80, height: 80 };

    return (
      <div className={`p1 w ${selected ? "sel" : ""}`} style={style}>
        <Button
          type="secondary"
          classes={classes}
          style={{
            display: "block",
            height: "100%",
            width: "100%",
            border: "none",
          }}
          onClick={onClick}
        >
          <img
            src={value}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt={alt}
          />
        </Button>
      </div>
    );
  }
}

export default ImageButton;
