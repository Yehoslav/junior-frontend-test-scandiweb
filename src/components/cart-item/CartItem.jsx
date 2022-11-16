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
    const { inMiniCart, onIncrease, onDecrease } = this.props;
    const { price, name, brand,amount, attributes, productImg } = this.props;

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


    const attrItems = attributes.map((attr) => {
      console.log(attr);

      return (<AttributeSelector
        key={attr.name}
        title={attr.name}
        inMiniCart={inMiniCart}
        color={attr.type === "swatch"}
        attributes={attr.items.map((attr) => attr.value)}
      />)
    }
    );
    console.dir(attrItems)

    const imgStyle = () => {
      if (inMiniCart) return { minWidth: 121, height: 190 };
      return { minWidth: 200, height: 288 };
    };

    const btnStyle = () => {
      if (inMiniCart) return { width: 24, height: 24, lineHeight: "24px" };
      return { width: 45, height: 45, lineHeight: "45px" };
    };


    return (
      <div
        // style={{height: 190}}
        className="row-g4"
      >
        <div className="attributes">
          <div className={inMiniCart ? "fp-l" : "fp-sb f-xl pb10"}>
            {brand}
          </div>
          <div className={inMiniCart ? "fp-l" : "fp f-xl pb16"}>{name}</div>
          <div className={inMiniCart ? "fp-sb" : "fp-b f-lg pb16"}>
            {price.currency.symbol}
            {price.amount}
          </div>
          {attrItems}
        </div>

        <div className="fp-m f-lg col sb t__center">
          <button 
            onClick={onIncrease}
            className="btn__sec fp-l f-xl p0" 
            style={btnStyle()}>
            +
          </button>
          <p>{amount}</p>
          <button 
            onClick={onDecrease}
            style={btnStyle()} 
            className="btn__sec fp-l f-xl p0">
            -
          </button>
        </div>

        <div className="image" style={imgStyle()}>
          <img src={productImg} alt="Placeholder" />
        </div>
      </div>
    );
  }
}

export default CartItem;
