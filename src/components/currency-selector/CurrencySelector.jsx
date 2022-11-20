import { Component } from "react";
import { connect } from "react-redux";

import "./currency-selector.scss";
import {updateCurrency} from "../../lib/currencySlice";

import { 
  client, 
  Query 
} from "@tilework/opus";

client.setEndpoint("http://localhost:4000");

const myQuery = new Query("currencies", true)
        .addField("symbol")
        .addField("label")

class CurrencySelector extends Component {
  state = {
    currencies: []
  }

  componentDidMount = () => {
    client.post(myQuery)
      .then(res => this.setState({currencies: res.currencies}))
  }

  render() {
    const {onToggleDropdown, showDropdown} = this.props
    const arrowDir = showDropdown ? "__up" : "__down";
    // HACK: This variable is to make the component work before introducing redux
    const {currencies} = this.state;

    console.dir(this.props)
    const {currency: {symbol}, selectCurrency } = this.props

    const content = (
      <ul className="currency-list">
        {currencies.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => {
                onToggleDropdown()
                selectCurrency(item.symbol)}}
              className="f-18 fp-m currency-btn"
            >
              {item.symbol} {item.label}
            </button>
          </li>
        ))}
      </ul>
    );

    return (
      <div className="dropdown">
        <button
          onClick={onToggleDropdown}
          className="action f-18"
        >
          {symbol}{" "}
          <i className={"arrow arrow" + arrowDir} />
        </button>
        {showDropdown ? content : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCurrency: (curr) => dispatch(updateCurrency(curr)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
