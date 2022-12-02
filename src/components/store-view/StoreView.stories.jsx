import StoreView from "./StoreView";
import { withRouter } from "storybook-addon-react-router-v6";
import { Provider } from "react-redux";
import { graphql } from "msw";

import { store } from "../../lib/store";
import * as ProductStories from "../product-card/ProductCard.stories";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
import ProductCard from "../product-card";

export default {
  component: StoreView,
  title: "StoreView",
  subcomponents: [ProductCard],
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>,
    withRouter,
  ],
  parameters: {
    reactRouter: {
      routePath: "/store/:category",
      routeParams: { category: "test" },
    },
  },
};

const Template = () => <StoreView />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      graphql.operation(async (_, res, ctx) => {
        return res(
          ctx.data({
            category: {
              products: [
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo1", name: "Appolo 1", inStock: true },
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo2", name: "Appolo 2", inStock: true },
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo3", name: "Appolo 3", inStock: false },
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo6", name: "Appolo 6", inStock: true },
              ],
            },
          })
        );
      }),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      graphql.operation((_, res, ctx) => {
        return res(
          ctx.errors([
            {
              message: "Category not found",
            },
          ])
        );
      }),
    ],
  },
};
