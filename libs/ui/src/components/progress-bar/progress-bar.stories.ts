import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {ProgressBarComponent} from "./progress-bar.component";

export default {
  title: 'Progress Bar',
  component: ProgressBarComponent,
  argTypes: {
    progress: {
      control: {type: 'number', min: 0, max: 100},
      defaultValue: 0
    }
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta;

export const Template: Story = (args) => ({
  template: `<flexy-progress-bar [total]="30" [progress]="progress"></flexy-progress-bar>`,
  component: ProgressBarComponent,
  props: args
});

