import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appItemAddedToCart]'
})
export class ItemAddedToCartDirective {

  constructor(el: ElementRef) {
    console.log(el.nativeElement);
    el.nativeElement.style.backgroundColor = 'yellow';
 }

}
