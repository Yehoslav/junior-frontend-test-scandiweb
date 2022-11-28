import { withRouter } from "storybook-addon-react-router-v6";
import Navbar from ".";
import { store } from "../../lib/store";
import { Provider } from "react-redux";
import { graphql } from "msw";

export default {
  component: Navbar,
  title: "Navbar",
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>,
    withRouter,
  ],
  parameters: {
    reactRouter: {
      routePath: "/store/:category",
      routeParams: { category: "all" },
    },
  },
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      graphql.operation(async (req, res, ctx) => {
        return res(
          ctx.data({
            currencies: [
              { symbol: "$", label: "USD" },
              { symbol: "€", label: "EUR" },
            ],
          })
        );
      }),
    ],
  },
};
