import { Component } from "react";
import PropTypes from "prop-types";

import "./button.scss";

class Button extends Component {
  getSize = (size) => {
    switch (size) {
      case  "tiny":
        return [{minWidth: 24, height: 24}, "f-14"]
      case "small":
        return [{minWidth: 60, height: 45}, "f-16"]
      case "big":
        return [{width: 400, height: 45}, "pl10 pr10 f-16"]
      default:
        return [{}, null]
    }
  } 

  render() {
    const { onClick, type, size, selected, classes, style } = this.props;

    const [btnSize, fontSize] = this.getSize(size);

    const getType = (type) => {
      if (type === "primary") return "pri";
      if (type === "color") return "color";
      if (type === "inactive") return "wobble";
      return "sec";
    };
    const className = `${classes || "" } p0 btn__${getType(type)} ${selected? "sel":""} ${fontSize || ""}` 

    return (
      <button 
        onClick={onClick} 
        className={className} 
        style={{...style, ...btnSize}}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "inactive", "secondary", "color"]).isRequired,
  style: PropTypes.object,
  size: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
