import { Component } from "react";

import "./attribute-selector.scss";

class AttributeSelector extends Component {
  render() {
    const { title, color, attributes, inMiniCart } = this.props;

    const titleStyle = (baseStyle = "fs-c f-r") => {
      if (inMiniCart) return "fp f-ty"
      return `t__caps ${baseStyle}`
    }

    const attrs = attributes.map((item) => {
      if (color) {
        const style = inMiniCart
          ? {width: 20, height: 20}
          : {width: 32, height: 32}

        return (
          <input 
            type="button"
            key={item}
            style={{display: "block", height: "100%", width: "100%", backgroundColor: item,}}
            className="btn btn__sec"
          />
        );
      }

      const style = inMiniCart
        ? {width: 24, height: 24, fontSize: "14px"}
        : {width: 60, height: 45, fontSize: "16px"}

      return (
        <button 
          key={item} 
          style={{
            ...style,
            fontFamily:"Source Sans Pro"
          }}
          className="btn btn__sec"
        >
          {item}
        </button>
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
