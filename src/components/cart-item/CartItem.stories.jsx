import CartItem from "./CartItem";
import { store } from "../../lib/store";
import { Provider } from "react-redux";
import { withRouter } from "storybook-addon-react-router-v6";

import placeholder from "../../res/img/placeholder.png";

export default {
  component: CartItem,
  title: "CartItem",
  decorators: [
    (story) => (
      <Provider store={store}>
        <div style={{ padding: "2rem" }}>{story()}</div>
      </Provider>
    ),
    withRouter,
  ],
};

const Template = (args) => <CartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "papuci",
  name: "Papuci",
  brand: "Moldoveneshti",
  inMinicart: true,
  amount: 2,
  gallery: [placeholder],
  attributes: [
    {
      selectedAttr: "XL",
      name: "Size",
      type: "text",
      items: [
        { displayValue: "extra large", id: "XL", value: "XL" },
        { displayValue: "extra extra large", id: "XXL", value: "XXL" },
        { displayValue: "small", id: "S", value: "S" },
      ],
    },
    {
      name: "Color",
      selectedAttr: "red",
      type: "swatch",
      items: [
        { displayValue: "#000", id: "black", value: "black" },
        { displayValue: "#f00", id: "red", value: "red" },
        { displayValue: "#fff", id: "white", value: "white" },
      ],
    },
  ],
  price: {
    currency: { symbol: "$" },
    amount: 50,
  },
};
