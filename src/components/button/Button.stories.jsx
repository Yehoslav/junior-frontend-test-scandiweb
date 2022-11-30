import Button from "./Button";

export default {
  component: Button, 
  title: "Button",
  decorators: [(story) => <div style={{padding: "2rem"}}>{story()}</div> ]
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  type: "primary",
  value: "Click me",
  classes: "t__upper",
  size: {minWidth: "100px", minHeight: "40px"},
  selected: true,
}
