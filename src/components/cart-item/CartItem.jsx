import { Component } from "react";
import PropTypes from "prop-types";

import "./cart-item.scss";
// import placeholder from "../../res/img/placeholder.png";
import AttributeSelector from "../attribute-selector/AttributeSelector";
import { connect } from "react-redux";

import { selectAttribute } from "../../lib/cartSlice";

class CartItem extends Component {

  render() {
    const { inMiniCart, onIncrease, onDecrease } = this.props;
    const { price, name, brand, amount, attributes, gallery, id} = this.props;
    const { selectAttr } = this.props 

    const attrItems = attributes.map((attr) => {
      console.log(attr);

      return (<AttributeSelector
        key={attr.name}
        title={attr.name}
        selected={attr.selectedAttr}
        inMiniCart={inMiniCart}
        onAttributeSelect={(value) => selectAttr({productId: id, attrId: attr.name, value})}
        color={attr.type === "swatch"}
        attributes={attr.items.map((attr) => attr.value)}
      />)
    });

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
          <div className={inMiniCart ? "fp-l" : "fp-sb f-30 pb10"}>
            {brand}
          </div>
          <div className={inMiniCart ? "fp-l" : "fp f-30 pb16"}>{name}</div>
          <div className={inMiniCart ? "fp-sb" : "fp-b f-24 pb16"}>
            {price.currency.symbol}
            {price.amount}
          </div>
          {attrItems}
        </div>

        <div className="fp-m f-24 col sb t__center">
          <button 
            onClick={onIncrease}
            className="btn btn__sec fp-l f-30 p0" 
            style={btnStyle()}>
            +
          </button>
          <p className={inMiniCart? "f-16" : "f24"}>{amount}</p>
          <button 
            onClick={onDecrease}
            style={btnStyle()} 
            className="btn btn__sec fp-l f-30 p0">
            -
          </button>
        </div>

        <div className="image" style={imgStyle()}>
          <img src={gallery[0]} alt="Placeholder" />
        </div>
      </div>
    );
  }
}

class LoadingCartItem extends Component {
  redner () {
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
}

export { LoadingCartItem };

const mapStateToProps = (state) => ({ })

const mapDispatchToProps = (dispatch) => {
  return {
    selectAttr: (payload) => dispatch(selectAttribute(payload))
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.shape({
    currency: PropTypes.shape(
      {currency: PropTypes.string.isRequired}),
    amount: PropTypes.number.isRequired,
  }),
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selectedAttr: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      )
    })
  ),
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
