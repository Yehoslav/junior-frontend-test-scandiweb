import { Component } from "react";

import "./cart-item.scss";
import placeholder from "../../res/img/placeholder.png";

class CartItem extends Component {
  state = {
    // WARN: Default should be true
    loading: false,
  };

  render() {
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

    return (
      <div className="row-g4">
        <div className="attributes">
          <div className="font-l">Brand name</div>
          <div className="font-l">Item name</div>
          <div className="font-sb">$50.00</div>
          <div>
            <div className="font-ty">Size:</div>
            <div className="row-g8">
              <button className="btn-sm btn__sec">XS</button>
              <button className="btn-sm btn__sec">S</button>
              <button className="btn-sm btn__sec sel">M</button>
              <button className="btn-sm btn__sec">L</button>
            </div>
          </div>
        </div>

        <div className="font-m col sb t__center">
          <button className="btn-sm btn__sec">+</button>
          <p>1</p>
          <button className="btn-sm btn__sec">-</button>
        </div>

        <div className="image">
          <img
            width="121px"
            src={placeholder}
            alt="Product image"
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
