import { Component } from "react";

import "./product-view.scss";
import placeholder from "../../res/img/placeholder.png";

import AttributeSelector from "../attribute-selector/AttributeSelector";

class ProductView extends Component {
  render() {
    return (
      <div className="row-g8 wrap pt80">
        <div className="row">
          <div className="col-g8 preview">
            <div className="prd-thumb">
              <img src={placeholder} alt="Placeholder" />
            </div>

            <div className="prd-thumb">
              <img src={placeholder} alt="Placeholder" />
            </div>

            <div className="prd-thumb">
              <img src={placeholder} alt="Placeholder" />
            </div>
          </div>
          <div className="img">
            <div className="prod-img">
              <img src={placeholder} alt="Placeholder" />
            </div>
          </div>
        </div>
        <div className="col-g4 info">
          <div className="fp-b f-xl pb5">Apollo</div>
          <div className="fp f-xl pb10">Something more</div>
          <AttributeSelector
            title="title:"
            attributes={["XL", "L", "M", "S"]}
          />
          <AttributeSelector
            title="color:"
            color={true}
            attributes={["red", "yellow", "green", "gray"]}
          />
          <div className="fp-b mt20" >
            PRICE:
          </div>
          <div className="fp-b f-lg">$50.00</div>
          <button className="btn__pri f-sm p16 mt25" style={{ height: 50 }}>
            ADD TO CART
          </button>
          <div className="f-sm mt30">
            Elit nostrum ab nam rem recusandae. Impedit tempora et voluptas
            quidem perspiciatis? Reiciendis impedit quia ea nostrum accusamus?
            Adipisci voluptatum accusantium et nemo nostrum In quia dolore eius
            sequi deleniti
          </div>
        </div>
      </div>
    );
  }
}

export default ProductView;
