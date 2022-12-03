import { Component } from "react";
import { connect } from "react-redux";

import "./store-view.scss";
import withRouter from "../../utils/withRouter";
import { fetchProducts } from "../../lib/storeSlice";
import { 
  fetchAndAddToCart, 
  removeFromCart, 
  checkProductSelector 
} from "../../lib/cartSlice";

import ProductCard, { ProductCardLoading } from "../product-card";

class StoreView extends Component {
  componentDidMount() {
    const {
      router: {
        params: { category },
      },
      getProducts,
    } = this.props;

    getProducts(category);
  }

  componentDidUpdate(prevProps) {
    const {
      router: { params: { category }, },
      getProducts,
    } = this.props;
    const prevCategory = prevProps.router.params.category;

    if (category !== prevCategory) getProducts(category);
  }

  buildProductList = (products, globalCurrency, status, error) => {
    const {inCart, removeFromCart, addToCart} = this.props

    const getAction = (productId, inStock) => {
      if (!inStock) return {
        onCartClick: () => console.log("Out of stock notification!"),
        btnAction: "OUT OF STOCK",
      }
      if (inCart(productId)) return {
        onCartClick: () => removeFromCart(productId),
        btnAction: "REMOVE",
      }
      return {
        onCartClick: () => addToCart(productId),
        btnAction: "ADD",
      }
    }

    switch (status) {
      case "loading":
        return (
          <>
            <ProductCardLoading />
            <ProductCardLoading />
            <ProductCardLoading />
          </>
        );

      case "succeeded":
        return products.map(({id, prices, inStock, name, brand, gallery}) => { 
          return (<ProductCard 
              key={id} 
              name={name}
              linkPath={`/product/${id}`}
              brand={brand}
              gallery={gallery}
              price={prices.find((item) => item.currency.symbol === globalCurrency.symbol)}
              {...getAction(id, inStock)}
            />)
        });

      case "failed":
        console.error(error)
        return <h3>An error occured when fetching data.</h3>

      default:
        return <h3>{status}</h3>;

    }
  };

  render() {
    const {
      router: { params: { category }, },
      status,
      error,
      products,
      globalCurrency,
    } = this.props;

    const productCards = this.buildProductList(products, globalCurrency, status, error);

    return (
      <div>
        <p className="mt80 mb80 fp f-42 t__cap">{category}</p>
        <div className="row-g12 cards-wraper">{productCards}</div>
      </div>
    );
  }
}

const mapStateToProps = ({
  store: { products, status, error }, 
  cart, 
  currency: {globalCurrency} 
}) => ({
  products,
  status,
  error,
  globalCurrency,
  inCart: (productId) => checkProductSelector(cart, productId),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (category) => dispatch(fetchProducts(category)),
    addToCart: (productId) => dispatch(fetchAndAddToCart({ productId })),
    removeFromCart: (productId) => dispatch(removeFromCart({ productId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StoreView));
