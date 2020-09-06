import {Directive, HostListener, HostBinding, ElementRef, Renderer2} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
 
  constructor (private el: ElementRef, private renderer: Renderer2) {}
 
  @HostBinding('class.show') isOpen = false;
 
  @HostListener('mouseenter') toggleOpen() {
      this.isOpen = true;
      let part = this.el.nativeElement.querySelector('.dropdown-menu');
      this.renderer.addClass(part, 'show');
  }
  @HostListener('mouseleave') toggleClose(){
    this.isOpen = false;
    let part = this.el.nativeElement.querySelector('.dropdown-menu');
    this.renderer.removeClass(part, 'show');
  }
}
