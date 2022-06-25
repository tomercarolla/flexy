import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {ButtonComponent} from './button.component';
import {ButtonModule} from "./button.module";
import {CommonModule} from "@angular/common";

export default {
  title: 'Button',
  component: ButtonComponent,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success', 'info', 'danger', 'sky', 'critical', 'navy', 'wood', 'lemon', 'ocean'],
      control: {type: 'select'},
      defaultValue: 'primary'
    },
    size: {
      options: ['xsmall', 'small', 'medium', 'large'],
      control: {type: 'select'},
      defaultValue: 'small'
    }
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonModule, CommonModule],
    }),
  ],
} as Meta;

export const Template: Story = (args) => ({
  template: `<button flexyButton [color]="color" [size]="size">{{color}}</button>`,
  component: ButtonComponent,
  props: args
});

