import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isBurgerMenuVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleBurgerMenu(event: Event) {
    this.isBurgerMenuVisible = !this.isBurgerMenuVisible;
    event.stopPropagation();
  }

  closeBurgerMenu(event: Event) {
    if (this.isBurgerMenuVisible) {
      this.isBurgerMenuVisible = false;
    }
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (this.isBurgerMenuVisible && !this.el.nativeElement.contains(target)) {
      this.isBurgerMenuVisible = false;
    }
  }
}
