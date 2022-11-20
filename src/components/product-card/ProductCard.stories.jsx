import ProductCard from "./ProductCard";
import placeholder from "../../res/img/placeholder.png";

export default {
  component: ProductCard,
  title: 'ProductCard',
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
