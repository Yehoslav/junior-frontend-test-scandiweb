import {Component} from 'react';
import CartItem from '../cart-item';

import './cart-view.scss';

class CartView extends Component {
  render() {
    return (
      <div className="col-g8">
        <h1 className='t_upper fp-b f-32'>Cart</h1>
        <hr />
        <CartItem />
        <hr />
        <CartItem />
        <hr />
        <CartItem />
        <hr />
        <div className="col-g8 hug">
          <div className="grid f-24">
            <div>Tax 21%:</div>
            <div className='fp-b'>$20</div>
            <div>Quantity:</div>
            <div className='fp-b'>3</div>
            <div>Total:</div>
            <div className='fp-b'>$100</div>
          </div>
          <button 
            style={{height: 43}}
            className='btn__pri f-14 t__upper ws'>Order</button>
        </div>
      </div>
      
    );
  }
}

export default CartView;
