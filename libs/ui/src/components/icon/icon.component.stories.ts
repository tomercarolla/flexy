import { HttpClientModule } from '@angular/common/http';
import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {ComponentSizes} from "../../shared/component-sizes";
import {IconComponent} from "./icon.component";
import {IconModule} from "./icon.module";

export default {
  title: 'Icon',
  component: IconComponent,
  argTypes: {
    size: {
      name: 'size',
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
    icon: {
      name: 'icon',
      type: {name: 'string'},
      defaultValue: 'delete',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'delete' },
      },
      control: {
        type: 'text',
      },
    },
    disabledIcon: {
      name: 'disabledIcon',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    isClickable: {
      name: 'is clickable',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [IconModule],
    }),
  ],
} as Meta;

export const Template: Story = (args) => ({
    template: `<flexy-icon [icon]="icon" [size]="size" [disabledIcon]="disabledIcon" [isClickable]="isClickable"></flexy-icon>`,
    component: IconComponent,
    props: args,
});

