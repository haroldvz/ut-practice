import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedblack]'
})
export class RedblackDirective {

  constructor(private _el:ElementRef) { 
    console.log(_el);
    _el.nativeElement.style.color = 'red';
  }

}
