import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { ComponentSizes } from "../../shared/component-sizes";
import { ComponentColors } from "../../shared/component-colors";

@Component({
  selector: 'button[flexyButton],input[type="button"][flexyButton],input[type="submit"][flexyButton],a[flexyButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @Input() icon = '';
  @Input() size: ComponentSizes = ComponentSizes.Small;
  @Input() color: ComponentColors = 'primary';
  @Input() appearance: 'filled' | 'ghost' = 'filled';

  @HostBinding('class.filled')
  get filled() {
    return this.appearance === 'filled';
  }

  @HostBinding('class.ghost')
  get ghost() {
    return this.appearance === 'ghost';
  }

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

  @HostBinding('class.color--danger')
  get danger() {
    return this.color === 'danger';
  }

  @HostBinding('class.color--sky')
  get sky() {
    return this.color === 'sky';
  }

  @HostBinding('class.color--critical')
  get critical() {
    return this.color === 'critical';
  }

  @HostBinding('class.color--navy')
  get navy() {
    return this.color === 'navy';
  }

  @HostBinding('class.color--wood')
  get wood() {
    return this.color === 'wood';
  }

  @HostBinding('class.color--lemon')
  get lemon() {
    return this.color === 'lemon';
  }

  @HostBinding('class.color--egg')
  get egg() {
    return this.color === 'egg';
  }

  @HostBinding('class.color--ocean')
  get ocean() {
    return this.color === 'ocean';
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

  get hasIcon() {
    return Boolean(this.icon);
  }

  @HostBinding('class.with-icon')
  withIcon = false;

  @HostBinding('class.icon-btn')
  onlyIcon = false;

  constructor(
    private el: ElementRef<HTMLButtonElement>,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.setIconProps();
  }

  private setIconProps() {
    if (this.hasIcon && this.elementHasChildTextNode(this.el.nativeElement)) {
      this.withIcon = true;
    } else if (this.hasIcon) {
      this.onlyIcon = true;
    }

    this.cd.markForCheck();
  }

  protected elementHasChildTextNode(element: Element) {
    const { childNodes } = element;

    for (const childNode of childNodes as unknown as ChildNode[]) {
      const node = childNode as Node;

      if (
        node.nodeType === Node.TEXT_NODE &&
        node.nodeValue &&
        node.nodeValue.length > 0
      ) {
        return true;
      }
    }

    return false;
  }

}
