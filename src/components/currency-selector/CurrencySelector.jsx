import { Component } from "react";
import { connect } from "react-redux";

import "./currency-selector.scss";
import { fetchCurrencies, updateCurrency } from "../../lib/currencySlice";

class CurrencySelector extends Component {
  componentDidMount = () => {
    this.props.getCurrencies();
  };

  render() {
    const { onToggleDropdown, showDropdown } = this.props;
    const arrowDir = showDropdown ? "__up" : "__down";
    // HACK: This variable is to make the component work before introducing redux

    const {
      selectedCurrency: { symbol },
      currencies,
      selectCurrency,
    } = this.props;

    const content = currencies ? (
      <ul className="currency-list">
        {currencies.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => {
                onToggleDropdown();
                selectCurrency(item);
              }}
              className="f-18 fp-m currency-btn"
            >
              {item.symbol} {item.label}
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <div>NoCurrencies</div>
    );

    return (
      <div className="dropdown">
        <button onClick={onToggleDropdown} className="action f-18">
          {symbol} <i className={"arrow arrow" + arrowDir} />
        </button>
        {showDropdown ? content : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.currency.globalCurrency,
    currencies: state.currency.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCurrency: (curr) => dispatch(updateCurrency(curr)),
    getCurrencies: () => dispatch(fetchCurrencies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
