import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isBurgerMenuVisible = false;

  constructor(private el: ElementRef, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBurgerMenuVisible = false;
      }
    });
  }

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

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (this.isBurgerMenuVisible && !this.el.nativeElement.contains(target)) {
      this.isBurgerMenuVisible = false;
    }
  }
}
