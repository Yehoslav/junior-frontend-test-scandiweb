import ProductCard from "./ProductCard";
import { withRouter } from 'storybook-addon-react-router-v6';
import placeholder from "../../res/img/placeholder.png";

export default {
  component: ProductCard,
  title: 'ProductCart',
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/product/:productId',
      routeParams: { productId: 'apollo-something-there' },
    }
  }
}

const Template = args => <ProductCard {...args} />

export const Default = Template.bind({});
Default.args = {
  id: 'apollo-something-there',
  name: 'Apollo Something THere',
  gallery: [placeholder],
  prices: [{
    amount: 500,
    currency: {
      symbol: "$"
    }
  }]
}
