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
            style={{ backgroundColor: item, ...style}}
            className="btn btn__sec"
          />
        );
      }

      const style = inMiniCart
        ? {width: 24, height: 24}
        : {width: 60, height: 45}

      return (
        <button 
          key={item} 
          style={{...style}}
          className="btn btn__sec fp-sb"
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
