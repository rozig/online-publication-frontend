import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output('clickOutside')
  clickOutside = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    this.clickOutside = new EventEmitter();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      console.log(this.elementRef.nativeElement);
      this.clickOutside.emit(null);
    }
  }
}
