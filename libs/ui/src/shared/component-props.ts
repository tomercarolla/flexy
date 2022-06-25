import { addons } from '@storybook/addon-essentials';
import {ComponentColors} from "./component-colors";


export function getComponentColors() {
  return ['primary', 'secondary', 'success', 'info', 'danger', 'sky', 'critical', 'navy', 'wood', 'lemon', 'ocean'];
}

// export const colorsSelectControl = (def: ComponentColors = 'primary') => addons('Color', getComponentColors(), def);


// export const statusSelectKnob = (def: SmpComponentStatus = 'default') => select('Status', getComponentStatuses(), def);

