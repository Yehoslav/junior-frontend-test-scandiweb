import { Component } from "react";

import "./store-view.scss";
import withRouter from "../../lib/withRouter";

import ProductCard from "../product-card";

import { 
  client, 
  // CombinedField, 
  Field, 
  Query 
} from "@tilework/opus";

client.setEndpoint("http://localhost:4000");

const productFields = ["id", "name", "gallery"];

const createQuery = (category) => {
  return new Query("category", false)
    .addArgument("input", "CategoryInput", { title: category })
    .addField(
      new Field("products", true)
        .addFieldList(productFields)
        .addField(
          new Field("prices", true)
            .addField(new Field("currency").addField("symbol"))
            .addField("amount")
        )
    );
};

class StoreView extends Component {
  state = {
    products: [],
    loading: true,
  };

  getData = (category) => {
    client
      .post(createQuery(category))
      .then((res) => this.setState({ products: res.category.products }));
  };

  componentDidMount() {
    const { category } = this.props.router.params;
    this.getData(category);
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.router.params;
    const prevCategory = prevProps.router.params.category;
    // const {loading} = this.state

    if (category !== prevCategory) {
      client
        .post(createQuery(category))
        .then((res) => this.setState({ products: res.category.products }));
    }
  }

  render() {
    console.log("Render store view");
    const {
      params: { category },
    } = this.props.router;

    const productCards = this.state.products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ));

    return (
      <>
        <h1>{category}</h1>
        <div className="row-g12 wrap">{productCards}</div>
      </>
    );
  }
}

export default withRouter(StoreView);
