import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ConfirmationDialogExampleComponent} from "./confirmation-dialog-example.module";
import {ButtonModule} from "../button/button.module";
import {ConfirmationDialogModule} from "./confirmation-dialog.module";

export default {
  title: 'Confirmation Dialog',
  component: ConfirmationDialogExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [ConfirmationDialogExampleComponent],
      imports: [ConfirmationDialogModule, ButtonModule],
    }),
  ],
} as Meta;

const Template: Story<ConfirmationDialogExampleComponent> = (args: ConfirmationDialogExampleComponent) => ({
  props: args,
});

export const Dialog = Template.bind({});
Dialog.args = {
  title: 'Title',
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut ex et tortor auctor fermentum. Curabitur tristique mauris sed mauris feugiat vestibulum. Quisque felis ex, auctor nec lobortis quis',
};

