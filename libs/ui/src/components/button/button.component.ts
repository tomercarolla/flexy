import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { ComponentSizes } from "../../shared/component-sizes";
import { ComponentColors } from "../../shared/component-colors";

@Component({
  selector: 'button[flexyButton],input[type="button"][flexyButton],input[type="submit"][flexyButton],a[flexyButton]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() size: ComponentSizes = ComponentSizes.Small;
  @Input() color: ComponentColors = 'primary';

  @HostBinding('class.color--primary')
  get primary() {
    return this.color === 'primary';
  }

  @HostBinding('class.color--secondary')
  get secondary() {
    return this.color === 'secondary';
  }

  @HostBinding('class.color--success')
  get success() {
    return this.color === 'success';
  }

  @HostBinding('class.color--info')
  get info() {
    return this.color === 'info';
  }

  @HostBinding('class.color--warning')
  get warning() {
    return this.color === 'warning';
  }

  @HostBinding('class.color--danger')
  get danger() {
    return this.color === 'danger';
  }

  @HostBinding('class.size--xsmall')
  get xsmall() {
    return this.size === ComponentSizes.Xsmall;
  }

  @HostBinding('class.size--small')
  get small() {
    return this.size === ComponentSizes.Small;
  }

  @HostBinding('class.size--medium')
  get medium() {
    return this.size === ComponentSizes.Medium;
  }

  @HostBinding('class.size--large')
  get large() {
    return this.size === ComponentSizes.Large;
  }

}
