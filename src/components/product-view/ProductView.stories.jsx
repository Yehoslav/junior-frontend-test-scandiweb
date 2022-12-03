import ProductView from "./ProductView";
import { withRouter } from "storybook-addon-react-router-v6";
import { store } from "../../lib/store";

import placeholder from "../../res/img/placeholder.png";
import { Provider } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { graphql } from "msw";


export default {
  component: ProductView,
  title: "ProductView",
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>,
    withRouter,
  ],
  excludeStories: /.*MockedState$/,
  parameters: {
    reactRouter: {
      routePath: "/product/:productId",
      routeParams: { productId: "apolo1" },
    },
  msw: {
    handlers: [
      graphql.operation(async (req, res, ctx) => {
        return res(
          ctx.data({
            product: { 
              id: "apolo1",
              brand: "Apollo",
              name: "Product 1",
              gallery: [placeholder],
              description: "short description",
              prices: [{
                currency: {symbol: "$"},
                amount: 100,
              }],
              attributes: [{
                id: "Size",
                type: "text",
                name: "Size",
                items: [ {
                  id: "xl",
                  value: "xl",
                  displayValue: "xl",
                },{
                  id: "xxl",
                  value: "xxl",
                  displayValue: "xxl",
                } ]
              }]
            },
          })
        );
      }),
    ],
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
              id: "apolo1",
              brand: "Apollo",
              name: "Product 1",
              gallery: [placeholder],
              description: "short description",
              prices: [{
                currency: {symbol: "$"},
                amount: 100,
              }],
              attributes: [{
                id: "Size",
                type: "text",
                name: "Size",
                items: [ {
                  id: "xl",
                  value: "xl",
                  displayValue: "xl",
                },{
                  id: "xxl",
                  value: "xxl",
                  displayValue: "xxl",
                } ]
              }]
            },
          })
        );
      }),
    ],
  },
};

export const MockedState = {
  cart: {
    productViewData: {
      status: "loading"
    },
    products: []
  },
  currency: {
    globalCurrency: "$",
  }
}

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        cart: createSlice({
          name: 'cart',
          initialState: taskboxState.cart,
        }).reducer,
        currency: createSlice({
          name: 'currency',
          initialState: taskboxState.currency,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
];

