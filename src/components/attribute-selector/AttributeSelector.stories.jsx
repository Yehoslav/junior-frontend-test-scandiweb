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
  attributes: [{displayValue: "extra large", id: "XL", value: "XL"}, {displayValue: "extra extra large", id: "XXL", value: "XXL"},{displayValue: "small", id: "S", value: "S"}],
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
  attributes: [{displayValue: "#000", id: "black", value: "black"}, {displayValue: "#f00", id: "red", value: "red"},{displayValue: "#fff", id: "white", value: "white"}],
  inMiniCart: false,
}

