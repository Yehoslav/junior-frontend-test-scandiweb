import { withRouter } from "storybook-addon-react-router-v6";

import placeholder from "../../res/img/placeholder.png";
import ProductCard from "./ProductCard";

export default {
  component: ProductCard,
  title: "ProductCard",
  decorators: [ withRouter, ],
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "apollo-something-there",
  brand: "Apollo",
  name: "Something There",
  gallery: [placeholder],
  price: {
    amount: 600,
    currency: {
      symbol: "€",
    },
  },
  btnAction: "ADD",
};
