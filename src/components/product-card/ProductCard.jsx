import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./product-card.scss";

import placeholder from "../../res/img/placeholder.png";

import { CartIcon } from "../mini-cart";

class ProductCard extends Component {
  render() {
    const {
      name,
      brand,
      gallery,
      linkPath,
      price: {
        currency: { symbol },
        amount,
      },
      btnAction,
      onCartClick,
    } = this.props;

    const btnClass = (action) => {
      switch (action) {
        case "REMOVE":
          return "prd-btn rm";

        case "ADD":
          return "prd-btn add";

        case "OUT OF STOCK":
          return "prd-btn"

        default:
          return "";
      }
    };

    return (
      <div className="card">
        <Link to={linkPath} className="card-link">
          <div className="image">
            <img src={gallery[0] || placeholder} alt={brand + name} />
            {
            ( btnAction === "OUT OF STOCK")
              ? (<div className="f-30 fp">OUT OF STOCK</div>)
              : ""
            }
          </div>

          <button onClick={onCartClick} className={btnClass(btnAction)}>
            <CartIcon />
          </button>

            {brand} {name}

          <div className="fp-m">
            {symbol} {amount}
          </div>
        </Link>
      </div>
    );
  }
}

export class ProductCardLoading extends Component {
  render() {
    return (
      <div className="card">
        <div className="image loading"> </div>
        <div className="p16 mb5 ml5 mr30 loading"></div>
        <div className="p16 mb5 ml5 mr30 loading"> </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  brand: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.shape({
      symbol: PropTypes.string.isRequired,
    }),
  }),
  btnAction: PropTypes.oneOf(["ADD", "OUT OF STOCK", "REMOVE"]).isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default ProductCard;
