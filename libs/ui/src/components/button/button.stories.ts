import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {ButtonComponent} from './button.component';
import {ButtonModule} from "./button.module";
import {CommonModule} from "@angular/common";
import {ComponentSizes} from "../../shared/component-sizes";

export default {
  title: 'Button',
  component: ButtonComponent,
  argTypes: {
    label: {
      name: 'Label',
      type: { name: 'string', required: true },
      defaultValue: 'Click me',
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Click me' },
      },
      control: {
        type: 'text'
      }
    },
    icon: {
      name: 'icon',
      type: { name: 'string' },
      defaultValue: 'delete',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'delete' },
      },
      control: {
        type: 'text',
      },
    },
    color: {
      name: 'Color',
      type: { name: 'string', required: true },
      options: ['primary', 'secondary', 'success', 'info', 'danger', 'sky', 'critical', 'navy', 'wood', 'lemon', 'ocean'],
      defaultValue: 'primary',
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      control: {
        type: 'select',
      }
    },
    size: {
      name: 'Size',
      type: { name: 'string', required: true },
      options: ComponentSizes,
      defaultValue: 'small',
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
      control: {
        type: 'select',
      }
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
} as Meta;

export const Template: Story = (args) => ({
  template: `<button flexyButton [color]="color" [size]="size">{{label}}</button>`,
  props: args
});

export const OnlyIcon: Story = (args) => ({
    template: `<button flexyButton [color]="color" [size]="size" [icon]="icon"></button>`,
    props: args,
});

export const WithIcon: Story = (args) => ({
    template: `<button flexyButton [color]="color" [size]="size" [icon]="icon">{{label}}</button>`,
    props: args,
});

