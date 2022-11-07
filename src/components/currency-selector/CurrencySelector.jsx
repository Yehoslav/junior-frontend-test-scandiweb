import {Component} from 'react';

import './currency-selector.scss';

class CurrencySelector extends Component {
  state = {
    showCurrList: false,
  }

  toggleDropdown = (prop) => {
    this.setState((state) => ({ [prop]: !state[prop] }));
  };

  render() {
    const { currency, onCurrencySelect, currencies } = this.props;
    const arrowDir = this.state.showCurrList ? "__up" : "__down";

    const content = (
      <ul className="currency-list">
        {currencies.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => onCurrencySelect(item)}
              className="font font-m currency-btn"
            >
              {item.symbol} {item.name}
            </button>
          </li>
        ))}
      </ul>
    )

    return (
          <div className="dropdown">
            <button
              onClick={() => this.toggleDropdown("showCurrList")}
              // onBlur={this.toggleDropdown}
              className="currency"
            >
              {currency.symbol}{" "}
              <i className={"arrow arrow" + arrowDir} />
            </button>
            {this.state.showCurrList ? (
            content
            ) : null}
          </div>
    );
  }
}

export default CurrencySelector;
