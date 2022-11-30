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
      console.dir(item)

      const btnProps = {
        selected: item.id === selected,
        value: item.displayValue,
        key: item.id, 
        onClick: () => onAttributeSelect(item.id),
      }

      if (color) return (
        <ColorButton
          {...btnProps}
          size= {inMiniCart? "small":"big"}
        />
      );

      return (
        <Button 
          {...btnProps}
          type="secondary"
          classes="pl5 pr5"
          size= {inMiniCart? "tiny":"small"}
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
      PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
      value: PropTypes.string,
    })
    ).isRequired, 
  onAttributeSelect: PropTypes.func.isRequired,
}

export default AttributeSelector;
