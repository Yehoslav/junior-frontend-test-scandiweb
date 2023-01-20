import { Component } from "react";
import { NavLink } from "react-router-dom";

import MiniCart from "../mini-cart";
import CurrencySelector from "../currency-selector";
import { getCategories } from "../../lib/database";

import "./navbar.scss";
import logo from "../../res/img/logo.svg";

class Navbar extends Component {
  state = {
    activeDropdown: "",
    categories: []
  };

  toggleDropdown = (prop) => {
    this.setState(({ activeDropdown }) => ({
      activeDropdown: activeDropdown === prop ? "" : prop,
    }));
  };

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({categories})
  }

  render() {
    const { activeDropdown, categories } = this.state;

    return (
      <nav>
        <div className="navbar">
          <div className="link-group">
            {categories.map((category) => (
              <NavLink
                key={category}
                className="link"
                to={`/store/${category}`}
              >
                <span>{category}</span>
              </NavLink>
            ))}
          </div>
          <img className="brand" src={logo} alt="Site logo" />
          <div className="actions">
            <CurrencySelector
              showDropdown={activeDropdown === "Currency"}
              onToggleDropdown={() => this.toggleDropdown("Currency")}
            />
            <MiniCart
              showDropdown={activeDropdown === "MiniCart"}
              onToggleDropdown={() => this.toggleDropdown("MiniCart")}
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
