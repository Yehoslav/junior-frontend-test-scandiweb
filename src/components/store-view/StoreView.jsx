import { Component } from "react";
import { connect } from "react-redux";

import "./store-view.scss";
import withRouter from "../../utils/withRouter";
import { fetchProducts } from "../../lib/storeSlice";

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

  buildProductList = (products, status, error) => {
    console.log(`Product list status: ${status}`);
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
        return products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ));
      case "failed":
        return <h3>{error}</h3>;
      default:
        return <h3>{status}</h3>;
    }
  };

  render() {
    const {
      router: {
        params: { category },
      },
      status,
      error,
      products,
    } = this.props;

    const productCards = this.buildProductList(products, status, error);

    return (
      <div>
        <p className="mt80 mb80 fp f-42 t__cap">{category}</p>
        {/* FIXME: Make the component responsive */}
        <div className="row-g12 wrap">{productCards}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ store: { products, status, error } }) => ({
  products,
  status,
  error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (category) => dispatch(fetchProducts(category)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StoreView));
