import { Component } from "react";
import PropTypes from "prop-types";

import "./attribute-selector.scss";
import Button, { ColorButton } from "../button";

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
      if (color) return (
        <ColorButton
          key={`${item}-wrapper`}
          onClick={() => onAttributeSelect(item)}
          selected={item === selected}
          size={inMiniCart? "small":"big"}
          value={item}
        />
      );

      return (
        <Button 
          key={item}
          type="secondary"
          onClick={() => onAttributeSelect(item)}
          value={item}
          classes="pl5 pr5"
          selected={item === selected}
          size={inMiniCart? "tiny":"small"}
        />
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
