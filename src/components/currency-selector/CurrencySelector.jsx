import { Component } from "react";

import "./currency-selector.scss";

class CurrencySelector extends Component {
  state = {
    showCurrList: false,
    currency: {
      symbol: "$",
      name: "USD",
    },
  };

  toggleDropdown = (prop) => {
    this.setState((state) => ({ [prop]: !state[prop] }));
  };

  selectCurrency = (currency) => {
    this.setState({
      showCurrList: false,
      currency,
    });
  };

  render() {
    const arrowDir = this.state.showCurrList ? "__up" : "__down";
    // HACK: This variable is to make the component work before introducing redux
    const currencies = [
      { symbol: "$", name: "USD" },
      { symbol: "€", name: "EUR" },
      { symbol: "Y", name: "YEN" },
      { symbol: "R", name: "RON" },
      { symbol: "P", name: "RUB" },
    ];

    const content = (
      <ul className="currency-list">
        {currencies.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => this.selectCurrency(item)}
              className="font font-m currency-btn"
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
          onClick={() => this.toggleDropdown("showCurrList")}
          // onBlur={this.toggleDropdown}
          className="currency font"
        >
          {this.state.currency.symbol}{" "}
          <i className={"arrow arrow" + arrowDir} />
        </button>
        {this.state.showCurrList ? content : null}
      </div>
    );
  }
}

export default CurrencySelector;
