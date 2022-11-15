import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./product-card.scss";
// import placeholder from "../../res/img/placeholder.png";

import { CartIcon } from "../mini-cart";

class ProductCard extends Component {
  render() {
    const { currency, id, name, gallery, prices } = this.props;
    console.log(currency)
    console.dir(prices);

    const globSymbol = currency.symbol

    const {
      currency: { symbol },
      amount,
    } = prices.filter((item) => item.currency.symbol === globSymbol)[0];

    return (
      <div 
        // style={{backgroundColor: "red"}}
        className="card">
        <div className="image">
          <img src={gallery[0]} alt="Placeholder" />
        </div>
        <button className="add-btn">
          <CartIcon />
        </button>
        <Link to={`/product/${id}`} className="fp-l">
          {name}
        </Link>
        <div className="fp-m">
          {symbol}
          {amount}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string),
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
      }),
    })
  ),
};

export default connect(mapStateToProps)(ProductCard);
