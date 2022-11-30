import { Component } from "react";
import  Button  from "./Button";

class ColorButton extends Component {
  render () {
    const { onClick, size, selected, value} = this.props;

    const style = (size === "small")
      ? {width: 20, height: 20}
      : {width: 32, height: 32}

    return (
      <div className={`p1 w ${selected? "sel":""}`} style={ style } >
        <Button
          type="color"
          style={{
            display: "block", 
            height: "100%", 
            width: "100%", 
            backgroundColor: value,
          }}
          onClick={onClick}
          value=""
        />
      </div>
    )
  }
}

export default ColorButton;


