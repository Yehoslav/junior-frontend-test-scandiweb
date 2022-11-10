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

    const imgStyle = () => {
      if (inMiniCart) return {minWidth: 121, height: 190}
      return {minWidth: 200, height: 288}
    }

    const btnStyle = () => {
      if (inMiniCart) return {width: 24, height: 24, lineHeight: "24px"}
      return {width: 45, height: 45, lineHeight: "45px"}
    }

    return (
      <div 
        // style={{height: 190}}
        className="row-g4">
        <div className="attributes">
          <div className={ inMiniCart ? "fp-l" : "fp-sb f-xl pb10" }>
            Brand name</div>
          <div className={ inMiniCart ? "fp-l" : "fp f-xl pb16" }>
            Item name</div>
          <div className={ inMiniCart ? "fp-sb" : "fp-b f-lg pb16" }>
            $50.00</div>
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

        <div className="fp-m f-lg col sb t__center">
          <button 
            className="btn__sec fp-l f-xl p0"
            style={btnStyle()}
          >+</button>
          <p>1</p>
          <button 
            style={btnStyle()}
            className="btn__sec fp-l f-xl p0">-</button>
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
