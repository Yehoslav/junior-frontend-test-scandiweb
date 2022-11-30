import { Component } from "react";

import "./product-view.scss";
import placeholder from "../../res/img/placeholder.png";

import AttributeSelector from "../attribute-selector/AttributeSelector";
import withRouter from "../../utils/withRouter";
// import { fetchProduct, selectAttribute } from "../../lib/productSlice";
import {
  selectAttribute,
  removeFromCart,
  checkProductSelector,
  fetchProductData as getPD,
  addToCart as addTC,
} from "../../lib/cartSlice";
import { connect } from "react-redux";
import Button, { ImageButton } from "../button";

class ProductView extends Component {
  state = {
    focusImg: placeholder,
  };

  selectImage = (src) => {
    this.setState({ focusImg: src });
  };

  componentDidMount = () => {
    const {
      getProductData,
      router: {
        params: { productId },
      },
    } = this.props;

    getProductData(productId);
  };

  createView = () => {
    let { focusImg } = this.state;
    const {
      product,
      inCart,
      addToCart,
      currency,
      removeProduct,
      selectAttr,
      products,
    } = this.props;

    const { brand, name, prices, attributes, gallery, id } = inCart(product.id)
      ? products.find((item) => item.id === product.id)
      : product;

    // HACK: There should be a better method to set a default focused image
    if (
      focusImg === placeholder ||
      gallery.filter((item) => item === focusImg).length === 0
    )
      focusImg = gallery[0];

    const attributeItems = attributes.map((attr) => (
      <AttributeSelector
        key={attr.name}
        title={attr.name}
        selected={attr.selectedAttr}
        color={attr.type === "swatch"}
        onAttributeSelect={(value) =>
          selectAttr({ productId: id, attrId: attr.name, value })
        }
        attributes={attr.items}
      />
    ));

    const btnProps = inCart(product.id)
      ? {
          type: "secondary",
          onClick: () => removeProduct(product.id),
          value: "remove from cart",
        }
      : {
          type: "primary",
          onClick: addToCart,
          value: "add to cart",
        };

    const button = (
      <Button {...btnProps} size="big" classes="mt42 f-16 p16 t__upper">
        {btnProps.value}
      </Button>
    );

    const images = (
      <div className="row">
        <div className="col-g8 preview">
          {gallery.map((img, count) => (
            <ImageButton
              key={id + `-${count}`}
              onClick={() => this.selectImage(img)}
              selected={focusImg === img}
              className="prd-thumb"
              size="small"
              value={img}
              alt={brand + name + ` preview ${count}`}
            />
          ))}
        </div>
        <div className="pl25">
          <div className="prod-img">
            <img src={focusImg} alt={brand + name + " preview"} />
          </div>
        </div>
      </div>
    );

    return (
      <View
        brand={brand}
        name={name}
        images={images}
        currency={currency.symbol}
        price={
          prices.find((item) => item.currency.symbol === currency.symbol).amount
        }
        attributes={attributeItems}
        button={button}
        description={product.description}
      />
    );
  };

  render() {
    const {
      product: { status },
    } = this.props;

    switch (status) {
      case "succeeded":
        return this.createView();

      case "loading":
        return <LoadingView />;

      case "error":
        return <h1>An error occured.</h1>;

      default:
        return <h1>Unknown a status.</h1>;
    }
  }
}

class View extends Component {
  render() {
    const {
      brand,
      name,
      currency,
      images,
      price,
      attributes,
      button,
      description,
    } = this.props;

    return (
      <div className="row-g8 wrap pt80">
        {images}
        <div className="col-g4 info">
          <div className="fp-b f-30 pb5">{brand}</div>
          <div className="fp f-30 pb10">{name}</div>
          {attributes}
          <div className="fp-b mt20">PRICE:</div>
          <div className="fp-b f-24">
            {currency}
            {price}
          </div>
          <div
            className="f-16 mt30"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          {button}
        </div>
      </div>
    );
  }
}

class LoadingView extends Component {
  render() {
    return (
      <div className="row-g8 wrap pt80">
        <div className="row">
          <div className="col-g8 preview">
            <div className="prd-thumb loading"> </div>
            <div className="prd-thumb loading"> </div>
            <div className="prd-thumb loading"> </div>
          </div>
          <div className="img">
            <div className="prod-img loading"> </div>
          </div>
        </div>
        <div className="col-g4 info">
          <div className="pb35 mb5 loading" style={{ minWidth: 300 }}></div>
          <div className="pb35 mb5 loading" style={{ minWidth: 300 }}></div>
          <div style={{ width: 100 }} className="pb30 mt10 loading"></div>
          <div className="row-g8">
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
          </div>
          <div style={{ width: 100 }} className="pb30 mt10 loading"></div>
          <div className="row-g8">
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
            <div style={{ minWidth: 65 }} className="pb45 loading"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, currency }) => {
  return {
    product: cart.productViewData,
    currency: currency.globalCurrency,
    products: cart.products,
    inCart: (productId) => checkProductSelector(cart, productId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectAttr: (attrId, value) => dispatch(selectAttribute(attrId, value)),
    getProductData: (productId) => dispatch(getPD(productId)),
    addToCart: () => dispatch(addTC()),
    removeProduct: (productId) => dispatch(removeFromCart({ productId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductView));
