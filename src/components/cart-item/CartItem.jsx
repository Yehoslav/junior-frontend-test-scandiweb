import {Component} from 'react';

import './cart-item.scss';
import placeholder from "../../res/img/placeholder.png";

class CartItem extends Component {
  render() {
    return (
      <div className="row-g4">

        <div className="attributes">
          <div className="font-l">Brand name</div>
          <div className="font-l">Item name</div>
          <div className="font-sb">$50.00</div>
          <div>
            <div className="font-ty">
              Size:
            </div>
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
            // height="190px"
            src={placeholder}
            alt="Image placeholder"
          />
        </div>

      </div>
    );
  }
}

export default CartItem;
