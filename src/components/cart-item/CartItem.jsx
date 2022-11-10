import { Component } from "react";

import "./cart-item.scss";
import placeholder from "../../res/img/placeholder.png";
import AttributeSelector from "../attribute-selector/AttributeSelector";

class CartItem extends Component {
  state = {
    // WARN: Default should be true
    loading: false,
  };

  render() {
    const { inMiniCart } = this.props

    if (this.state.loading) {
      return (
        <div className="row-g4 load">
          <div className="atts">
            <div className="text loading"></div>
            <div className="text loading"></div>
            <div className="text loading"></div>
            <div className="row-g8">
              <div className="btn-sm loading"></div>
              <div className="btn-sm loading"></div>
              <div className="btn-sm loading"></div>
              <div className="btn-sm loading"></div>
            </div>
          </div>
          <div className="col sb">
            <div className="btn-sm loading"></div>
            <div className="btn-sm loading"></div>
          </div>
          <div className="image loading"></div>
        </div>
      );
    }

    const brandStyle = (baseStyle = "") => {
      if (inMiniCart) return "fp-l"
      return `fp-sb f-xl ${baseStyle}`
    }

    const itemNameStyle = (baseStyle = "") => {
      if (inMiniCart) return "fp-l"
      return `fp f-xl ${baseStyle}`
    }

    const priceStyle = (baseStyle="") => {
      if (inMiniCart) return "fp-sb"
      return `fp-b f-lg ${baseStyle}`
    }

    const imgStyle = () => {
      if (inMiniCart) return {minWidth: 121, height: 190}
      return {minWidth: 200, height: 288}
    }

    return (
      <div 
        // style={{height: 190}}
        className="row-g4">
        <div className="attributes">
          <div className={brandStyle()}>Brand name</div>
          <div className={itemNameStyle()}>Item name</div>
          <div className={priceStyle()}>$50.00</div>
          <AttributeSelector
            title="Size:"
            inMiniCart={inMiniCart}
            attributes={["XL", "L", "M", "S"]}/>
          <AttributeSelector
            title="Color:"
            inMiniCart={inMiniCart}
            color={true}
            attributes={["red", "yellow", "green"]}/>
        </div>

        <div className="fp-m col sb t__center">
          <button 
            className="btn__sec f-r"
            style={{width: 24, height: 24, padding: 0}}
          >+</button>
          <p>1</p>
          <button 
            style={{width: 24, height: 24, padding: 0}}
            className="btn__sec f-r">-</button>
        </div>

        <div 
          className="image"
          style={imgStyle()}
        >
          <img
            src={placeholder}
            alt="Placeholder" />
        </div>
      </div>
    );
  }
}

export default CartItem;
