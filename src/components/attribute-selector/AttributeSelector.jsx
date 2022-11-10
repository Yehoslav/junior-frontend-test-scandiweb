import { Component } from "react";

import "./attribute-selector.scss";

class AttributeSelector extends Component {
  render() {
    const { title, color, attributes, inMiniCart } = this.props;

    const titleStyle = (baseStyle = "fs-c f-r") => {
      if (inMiniCart) return "fp f-ty"
      return baseStyle
    }

    const attrs = attributes.map((item) => {
      if (color) {
        return (
          <input 
            type="button"
            key={item}
            style={{ backgroundColor: item,  width: 20, height:20}}
            className="btn btn__sec"
          />
        );
      }
      return (
        <button 
          key={item} 
          style={{width: 24, height: 24}}
          className="btn btn__sec fp-sb">
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
