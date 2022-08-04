import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {ComponentSizes} from "../../shared/component-sizes";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'flexy-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input() size: ComponentSizes = ComponentSizes.Small;

  @Input() disabledIcon = false;

  @Input() toggleIcon = false;

  @Input()
  set icon(icon: string) {
    this._icon = icon;

    this.matIconRegistry.addSvgIcon(
      `${this.icon}`,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `shared-assets/icons/${this.icon}.svg`
      )
    );
  }

  get icon(): string {
    return this._icon;
  }

  @Input()
  @HostBinding('class.pointer')
  set isClickable(isClickable: boolean) {
    this._isClickable = isClickable;
  }

  get isClickable(): boolean {
    return this._isClickable;
  }

  @HostBinding('class.active')
  get active(): boolean {
    return this.toggleIcon;
  }

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.disabledIcon;
  }

  @HostBinding('class.size--xsmall')
  get xsmall(): boolean {
    return this.size === 'xsmall';
  }

  @HostBinding('class.size--small')
  get small(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.size--medium')
  get medium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.size--large')
  get large(): boolean {
    return this.size === 'large';
  }

  private _icon = '';

  private _isClickable = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}
}
