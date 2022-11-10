import {Component} from 'react';

import './product-view.scss';
import placeholder from "../../res/img/placeholder.png";

import AttributeSelector from '../attribute-selector/AttributeSelector';

class ProductView extends Component {
  render() {
    return (
      <div className="row-g8 wrap pt-80">
        <div className="col-g8 preview">
          <div className="prd-thumb">
            <img src={placeholder} alt="Product image" />
          </div>

          <div className="prd-thumb">
            <img src={placeholder} alt="Product image" />
          </div>
  
          <div className="prd-thumb">
            <img src={placeholder} alt="Product image" />
          </div>

        </div>
        <div className="img">
          <div className="prod-img">
            <img src={placeholder} alt="Product image" />
          </div>
        </div>
        <div className="col-g4 info">
          {/** FIXME: Add roboto and roboto condensed as fonts */}
          <div className="fp-b f-xl">Apollo</div>
          <div className="f-xl">Something more</div>
          {/** HACK: Move styles to the css (unless its dynamic) */}
          <AttributeSelector 
            title="title:"
            attributes={["XL", "L", "M", "S"]}/>
          <AttributeSelector 
            title="color:"
            color={true}
            attributes={["red", "yellow", "green", "gray"]}/>
          {/** INFO: make attributes a sepparate component */}
          <div className="fp-b"
            style={{paddingTop: 20}}>PRICE:</div>
          <div className="fp-b f-lg">$50.00</div>
          <button className="btn__pri f-sm"
            style={{marginTop: 30, padding: 16}}>ADD TO CART</button>
          <div className="f-sm"
            style={{paddingTop: 30}}>
            Elit nostrum ab nam rem recusandae. Impedit tempora et voluptas quidem perspiciatis? Reiciendis impedit quia ea nostrum accusamus? Adipisci voluptatum accusantium et nemo nostrum In quia dolore eius sequi deleniti
          </div>
        </div>
      </div>
    );
  }
}

export default ProductView;
