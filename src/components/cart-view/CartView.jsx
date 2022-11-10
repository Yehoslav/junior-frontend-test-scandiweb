import {Component} from 'react';
import CartItem from '../cart-item';

import './cart-view.scss';

class CartView extends Component {
  render() {
    return (
      <div className="col-g8">
        <h1>Cart</h1>
        <hr />
        <CartItem />
        <hr />
        <CartItem />
        <hr />
        <CartItem />
        <hr />
        <div className="col-g8 hug">
          <div className="grid f-lg">
            <div>Tax 21%:</div>
            <div className='fp-b'>$20</div>
            <div>Quantity:</div>
            <div className='fp-b'>3</div>
            <div>Total:</div>
            <div className='fp-b'>$100</div>
          </div>
          <button className='btn__pri btn-lg f-ty ws'>Order</button>
        </div>
      </div>
      
    );
  }
}

export default CartView;
