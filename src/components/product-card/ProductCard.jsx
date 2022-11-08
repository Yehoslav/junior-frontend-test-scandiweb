import { Component } from "react";
import { Link } from "react-router-dom";

import "./product-card.scss";
import placeholder from "../../res/img/placeholder.png";

import {CartIcon} from '../mini-cart';

class ProductCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="image">
          <img src={placeholder} alt="" />
          <button className="add-btn">
            <CartIcon />
          </button>
        </div>
        <Link to="/product/example" className="font-l">Appolo something there</Link>
        <div className="font-m">$500.00</div>
      </div>
    );
  }
}

export default ProductCard;
