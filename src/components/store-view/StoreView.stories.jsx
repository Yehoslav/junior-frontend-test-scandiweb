import StoreView from "./StoreView";
import { withRouter } from "storybook-addon-react-router-v6";
import placeholder from "../../res/img/placeholder.png";
import { store } from "../../lib/store";

import * as ProductStories from "../product-card/ProductCard.stories";
import { Provider } from "react-redux";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
import { graphql } from "msw";

export default {
  component: StoreView,
  title: "StoreView",
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>,
    withRouter,
  ],
  parameters: {
    reactRouter: {
      routePath: "/store/:category",
      routeParams: { category: "tech" },
    },
  },
};

const Template = () => <StoreView />;

// const github = graphql.link('http://localhost:4000')

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      graphql.operation(async (req, res, ctx) => {
        return res(
          ctx.data({
            category: {
              products: [
                { ...ProductStories.Default.args, id: "appolo1", name: "appolo1", },
                { ...ProductStories.Default.args, id: "appolo2", name: "appolo2", },
                { ...ProductStories.Default.args, id: "appolo3", name: "appolo3", },
                { ...ProductStories.Default.args, id: "appolo6", name: "appolo6", },
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
      graphql.operation((req, res, ctx) => {
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
