import {Component} from 'react';

import ProductCard from '../product-card';

import './store-view.scss';

class StoreView extends Component {
  render() {
    return (
      <>
        <h1>All</h1>
      <div className="row-g12 wrap">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
      </div>
        </>
    );
  }
}

export default StoreView;
