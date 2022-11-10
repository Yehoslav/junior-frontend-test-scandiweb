import { Component } from "react";

import "./currency-selector.scss";

class CurrencySelector extends Component {
  state = {
    currency: {
      symbol: "$",
      name: "USD",
    },
  };

  selectCurrency = (currency) => {
    this.setState({
      showCurrList: false,
      currency,
    });
  };

  render() {
    const {onToggleDropdown, showDropdown} = this.props
    const arrowDir = showDropdown ? "__up" : "__down";
    // HACK: This variable is to make the component work before introducing redux
    const currencies = [
      { symbol: "$", name: "USD" },
      { symbol: "€", name: "EUR" },
    ];

    const content = (
      <ul className="currency-list">
        {currencies.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => {
                onToggleDropdown()
                this.selectCurrency(item)}}
              className="f-r fp-m currency-btn"
            >
              {item.symbol} {item.name}
            </button>
          </li>
        ))}
      </ul>
    );

    return (
      <div className="dropdown">
        <button
          onClick={onToggleDropdown}
          className="action f-r"
        >
          {this.state.currency.symbol}{" "}
          <i className={"arrow arrow" + arrowDir} />
        </button>
        {showDropdown ? content : null}
      </div>
    );
  }
}

export default CurrencySelector;
