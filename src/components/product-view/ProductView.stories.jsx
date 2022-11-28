import ProductView from "./ProductView";
import { withRouter } from "storybook-addon-react-router-v6";
import { store } from "../../lib/store";

import placeholder from "../../res/img/placeholder.png";
import { Provider } from "react-redux";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
import { graphql } from "msw";

export default {
  component: ProductView,
  title: "ProductView",
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>,
    withRouter,
  ],
  parameters: {
    reactRouter: {
      routePath: "/product/:productId",
      routeParams: { productId: "apolo1" },
    },
  },
};

const Template = () => <ProductView />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      graphql.operation(async (req, res, ctx) => {
        return res(
          ctx.data({
            product: { 
              id: "product-id",
              brand: "Productia",
              name: "product",
              gallery: placeholder,
              description: "short description",
              prices: [{
                currency: {symbol: "$"},
                amount: 100,
              }],
              attributes: [{
                id: "Size",
                type: "text",
                name: "Size",
                items: {
                  id: "xl",
                  value: "xl",
                  displayValue: "xl",
                }
              }]
            },
          })
        );
      }),
    ],
  },
};
