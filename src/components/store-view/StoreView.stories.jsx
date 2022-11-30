import StoreView from "./StoreView";
import { withRouter } from "storybook-addon-react-router-v6";
import { store } from "../../lib/store";

import * as ProductStories from "../product-card/ProductCard.stories";
import { Provider } from "react-redux";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
import { graphql } from "msw";
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
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo1", name: "Appolo 1", },
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo2", name: "Appolo 2", },
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo3", name: "Appolo 3", },
                { ...ProductStories.Default.args, prices: [ProductStories.Default.args.price], id: "appolo6", name: "Appolo 6", },
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
              message: "Not found",
            },
          ])
        );
      }),
    ],
  },
};
