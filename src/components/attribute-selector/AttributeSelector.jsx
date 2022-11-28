import { Component } from "react";
import PropTypes from "prop-types";

import "./attribute-selector.scss";

class AttributeSelector extends Component {
  render() {
    const { 
      selected, 
      title, 
      color, 
      attributes, 
      inMiniCart, 
      onAttributeSelect
    } = this.props;

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
        ? {minWidth: 24, padding: "0 4px", height: 24, fontSize: "14px"}
        : {minWidth: 60, padding: "0 4px", height: 45, fontSize: "16px"}

      return (
        <button 
          key={item}
          onClick={() => onAttributeSelect(item)}
          style={style}
          className={`bbtn ${baseClass}`}>
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

AttributeSelector.propTypes = {
  title: PropTypes.string.isRequired, 
  color: PropTypes.bool.isRequired, 
  inMiniCart: PropTypes.bool, 
  selected: PropTypes.string, 
  attributes: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired, 
  onAttributeSelect: PropTypes.func.isRequired,
}

export default AttributeSelector;
