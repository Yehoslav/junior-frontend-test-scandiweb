import CartItem from './CartItem';
import { store } from "../../lib/store";
import { Provider } from "react-redux";
import { withRouter } from "storybook-addon-react-router-v6";

import placeholder from "../../res/img/placeholder.png";

export default {
  component: CartItem,
  title: "CartItem",
  decorators: [
    (story) => <Provider store={store}><div style={{padding: "2rem"}}>{story()}</div></Provider>,
    withRouter,
  ],
}

const Template = (args) => <CartItem {...args} />

export const Default = Template.bind({})
Default.args = {
  id: "papuci",
  name: "Papuci",
  brand: "Moldoveneshti",
  inMinicart: true,
  amount: 2,
  gallery: [placeholder],
  attributes: [
    {
    name: "Size",
    selectedAttr: "black",
    type: "swatch",
    items: [{value: "black"},{value: "brown"},{value: "white"}],
  },{
    name: "Color",
    selectedAttr: "black",
    type: "swatch",
    items: [{value: "black"},{value: "brown"},{value: "white"}],
  }],
  price: {
    currency: {symbol: "$"},
    amount: 50
  }
}
