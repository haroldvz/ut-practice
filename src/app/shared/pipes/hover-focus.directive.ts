import {
  Directive,
  HostListener,
  HostBinding,
} from '@angular/core';


@Directive({
  selector: '[appHoverFocus]'
})
export class HoverFocusDirective {

  constructor() { }

  @HostBinding("style.background-color") backgroundColor: string;
  @HostBinding("style.color") textColor: string;

  @HostListener('mouseover') onHover() {
    this.backgroundColor = 'blue';
    this.textColor = 'green';
  }

  @HostListener('mouseout') onLeave() {
    this.backgroundColor = 'inherit';
    this.textColor = 'inherit';
  }
  

}
