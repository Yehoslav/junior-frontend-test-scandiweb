import { Component } from "react";

import "./attribute-selector.scss";

class AttributeSelector extends Component {
  render() {
    const { selected, title, color, attributes, inMiniCart, onAttributeSelect} = this.props;

    const titleStyle = (baseStyle = "fs-c f-18") => {
      if (inMiniCart) return "fp f-14"
      return `t__upper ${baseStyle}`
    }

    const attrs = attributes.map((item) => {
      const baseClass = (item === selected) ? "sel" : "";
      if (color) {
        const style = inMiniCart
          ? {width: 20, height: 20}
          : {width: 32, height: 32}

        return (
          <div className={`p1 w ${baseClass}`}
            key={`${item}-wrapper`}
            style={{
              ...style,
              // border: "1px solid var(--primary)"
          }}>
            <input 
              type="button"
              key={item}
              onClick={() => onAttributeSelect(item)}
              style={{display: "block", height: "100%", width: "100%", backgroundColor: item,}}
              className="btn btn__sec"
            />
          </div>
        );
      }

      const style = inMiniCart
        ? {width: 24, height: 24, fontSize: "14px"}
        : {width: 60, height: 45, fontSize: "16px"}
      return (
        <>
          <input 
            type="radio"
            key={item} 
            defaultChecked={item === selected}
            name={`${title.split(" ").join("-")}-radio`}
            // className={`btn btn__sec ${baseClass}`}
            id={`${item}-${title.split(" ").join("-")}-radio`}
            onClick={() => onAttributeSelect(item)}
          />
          <label 
            key={`${item}-lbl`} 
            tabIndex={0}
            style={{
              ...style,
              fontFamily:"Source Sans Pro"
            }}
            htmlFor={`${item}-${title.split(" ").join("-")}-radio`}>
            {item}
          </label>
        </>
      );
    });

    return (
      <div>
        <div className={titleStyle()}>{title}</div>
        <div className="row-g8">{attrs}</div>
      </div>
    );
  }
}

export default AttributeSelector;
