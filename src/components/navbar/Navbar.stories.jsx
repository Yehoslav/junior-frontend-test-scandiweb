import { withRouter } from "storybook-addon-react-router-v6";
import Navbar from ".";

export default {
  component: Navbar,
  title: 'Navbar',
  decorators: [withRouter],
}

const Template = args => <Navbar {...args} />;

export const Default = Template.bind({})
Default.args = {
  rotated: false,
}

export const ActiveCurrency = Template.bind({})
ActiveCurrency.args = {
  rotated: true,
}
