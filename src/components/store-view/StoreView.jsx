import {Component} from 'react';

import './store-view.scss';
import withRouter from '../../lib/withRouter';

import ProductCard from '../product-card';

class StoreView extends Component {
  render() {
    const {params: {category}} = this.props.router
    return (
      <>
        <h1>{category}</h1>
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

export default withRouter(StoreView);
