import { Component } from "react";

import "./product-view.scss";
import placeholder from "../../res/img/placeholder.png";

import AttributeSelector from "../attribute-selector/AttributeSelector";
import  withRouter  from "../../utils/withRouter";
import { fetchProduct, selectAttribute } from "../../lib/productSlice";
import { fetchProduct as fetchAndAddToCart, removeFromCart } from "../../lib/cartSlice";
import { connect } from "react-redux";

class ProductView extends Component {
  state = {
    focusImg: placeholder,
  }

  selectImage = (src) => {
    this.setState({focusImg: src})
  }

  componentDidMount = () => {
    const { getProductData, router: { params: {productId}} } = this.props;
    getProductData(productId)
  }

  buildContent = ({ gallery, id, brand, name, description, attributes, prices, }, removeProduct, onAddToCart, currency, selectAttr, inCart) => {
    let { focusImg } = this.state;

    // HACK: There should be a better method to set a default focused image
    if (focusImg === placeholder || gallery.filter((item) => item === focusImg).length === 0) {
      // this.selectImage(gallery[0])
      focusImg = gallery[0]
    }

    console.dir(prices)
   return (
      <div className="row-g8 wrap pt80">
        <div className="row">
          <div className="col-g8 preview">
            {
              gallery.map(img => (
                <div 
                  key={img}
                  onClick={() => this.selectImage(img)}
                  className="prd-thumb">
                  <img src={img} alt={img} />
                </div>
              ))
            }
          </div>
          <div className="img">
            <div className="prod-img">
              <img src={focusImg} alt="Placeholder" />
            </div>
          </div>
        </div>
        <div className="col-g4 info">
          <div className="fp-b f-30 pb5">{brand}</div>
          <div className="fp f-30 pb10">{name}</div>
          {attributes.map(attr => (
          <AttributeSelector 
            key={attr.name}
            title={attr.name}
            selected={attr.selectedAttr}
            color={attr.type === "swatch"}
            onAttributeSelect={(value) => {
                const payload = {attrId: attr.name,  value}
                console.log("Select attribute payload")
                console.dir(payload)
                selectAttr(payload)
              }}
            attributes={attr.items.map((item) => item.value)}
          />
          ))}
          <div className="fp-b mt20" >
            PRICE:
          </div>
          <div className="fp-b f-24">
            {currency.symbol}
            {prices.find((item) => item.currency.symbol === currency.symbol).amount}
          </div>
          <button 
            onClick={inCart? () => removeProduct(id) : () => onAddToCart(id)}
            className={`btn ${inCart? "btn__sec":"btn__pri"} f-16 p16 mt25`} 
            style={{ height: 50 }}>
            {inCart? "remove from cart" : "add to cart"}
          </button>
          <div className="f-16 mt30" dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
      </div>
    )
  }

  render() {
    console.log("ProductView")
    console.dir(this.props)
    
    const {product, status, addToCart, currency, removeProduct, selectAttr, products} = this.props
    const inCart = (product !== undefined) && products.find((item) => item.id === product.id) !== undefined;

    return (status === "succeeded") ? this.buildContent(product, removeProduct, addToCart, currency, selectAttr, inCart) : <h1>loading</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.productData,
    status: state.product.status,
    currency: state.currency.globalCurrency,
    // HACK: Maybe create a function inside the slice to check for presence in cart?
    products: state.cart.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectAttr: (attrId, value) => dispatch(selectAttribute(attrId, value)),
    getProductData: (productId) => dispatch(fetchProduct(productId)),
    addToCart: (productId) => dispatch(fetchAndAddToCart(productId)),
    removeProduct: (productId) => dispatch(removeFromCart({id: productId})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductView));
