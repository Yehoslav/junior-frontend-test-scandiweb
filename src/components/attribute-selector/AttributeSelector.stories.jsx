import AttributeSelector from "./AttributeSelector";

export default {
  component: AttributeSelector,
  title: "AttributeSelector",
  decorators: [(story) => <div style={{padding: "2rem"}}>{story()}</div>]
}

const Template = (args) => <AttributeSelector {...args} />

export const Default = Template.bind({});
Default.args = {
  selected: "XL",
  title: "Size",
  color: false,
  attributes: ["XL", "XXL", "S"],
  inMiniCart: false,
}

export const InMiniCart = Template.bind({});
InMiniCart.args = {
  ...Default.args,
  inMiniCart: true,
}

export const ColorAttributes = Template.bind({});
ColorAttributes.args = {
  title: "Color",
  selected: "red",
  color: true,
  attributes: ["yellow", "red", "green"],
  inMiniCart: false,
}

