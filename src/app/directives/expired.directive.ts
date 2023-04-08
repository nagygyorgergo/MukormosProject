import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appExpired]'
})
export class ExpiredDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = '#ff4545';
 }

}
