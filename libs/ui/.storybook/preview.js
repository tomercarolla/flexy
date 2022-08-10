import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { addDecorator, moduleMetadata } from '@storybook/angular';

addDecorator(
  moduleMetadata({ imports: [HttpClientModule, BrowserAnimationsModule] })
);

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
