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
  children: "Click me",
  classes: "fc",
  size: {minWidth: "200px", minHeight: "40px"},
  selected: true,
}
