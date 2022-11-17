import { Component } from "react";
import { connect } from "react-redux";

import "./store-view.scss";
import withRouter from "../../utils/withRouter";
import { fetchProducts } from "../../lib/storeSlice";

import ProductCard from "../product-card";

class StoreView extends Component {

  componentDidMount() {
    const {
      router: {params: { category }},
      getProducts
    } = this.props;

    getProducts(category);
  }

  componentDidUpdate(prevProps) {
    const {
      router: {params: { category }},
      getProducts
    } = this.props;
    const prevCategory = prevProps.router.params.category;

    if (category !== prevCategory) {
      getProducts(category)
    }
  }

  render() {
    const {
      router: {params: { category }},
      products,
    } = this.props;

    const productCards = products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ));

    return (
      <>
        <h1>{category}</h1>
        {/* FIXME: Make the component responsive */}
        <div className="row-g12 wrap">{productCards}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.store.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (category) => dispatch(fetchProducts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreView));
