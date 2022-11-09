import {Component} from 'react';

import './product-view.scss';
import placeholder from "../../res/img/placeholder.png";

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
          <div className="font-b font-xl">Apollo</div>
          <div className="font-xl">Something more</div>
          {/** HACK: Move styles to the css (unless its dynamic) */}
          <div className="font-b"
            style={{paddingTop: 38}}>SIZE:</div>
          <div className="row-g4">
            <button className="sel btn__sec btn-sm">S</button>
            <button className="btn__sec btn-sm">M</button>
            <button className="btn__sec btn-sm">L</button>
            <button className="btn__sec btn-sm">XL</button>
          </div>
          {/** INFO: make attributes a sepparate component */}
          <div className="font-b"
            style={{paddingTop: 20}}>PRICE:</div>
          <div className="font-b font-lg">$50.00</div>
          <button className="btn__pri font-sm btn-lg"
            style={{marginTop: 30}}>ADD TO CART</button>
          <div className="font-sm"
            style={{paddingTop: 30}}>
            Elit nostrum ab nam rem recusandae. Impedit tempora et voluptas quidem perspiciatis? Reiciendis impedit quia ea nostrum accusamus? Adipisci voluptatum accusantium et nemo nostrum In quia dolore eius sequi deleniti
          </div>
        </div>
      </div>
    );
  }
}

export default ProductView;
