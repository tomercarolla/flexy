import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ConfirmationDialogExampleComponent} from "./confirmation-dialog-example.module";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {ButtonModule} from "../button/button.module";

export default {
  title: 'Confirmation Dialog',
  component: ConfirmationDialogExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [ConfirmationDialogExampleComponent],
      imports: [MatDialogModule, ButtonModule, MatIconModule, BrowserAnimationsModule],
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

