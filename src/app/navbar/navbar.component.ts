import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isBurgerMenuVisible = false;
  activeSection = 'start';
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];

  switchLanguage(event: any) {
    const selectedLanguage = event.target.value;
    this.languageService.setLanguage(selectedLanguage);
  }

  private sections: { id: string; offset: number }[] = [];

  constructor(
    private el: ElementRef,
    private router: Router,
    private languageService: LanguageService,
    private cdRef: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBurgerMenuVisible = false;
        this.updateActiveSection();
      }
    });
    this.languageService.language$.subscribe((lang) => {
      if (lang in translations) {
        this.currentLanguage = lang as TranslationKey;
        this.texts = translations[this.currentLanguage];
      }
    });
  }

  ngOnInit() {
    this.updateActiveSection();
  }

  ngAfterViewInit() {
    this.initializeSections();
    this.updateActiveSection();
    this.cdRef.detectChanges();
  }

  initializeSections() {
    this.sections = [
      { id: 'start', offset: 0 },
      {
        id: 'aboutme',
        offset: document.getElementById('aboutme')?.offsetTop || 0,
      },
      {
        id: 'myskills',
        offset: document.getElementById('myskills')?.offsetTop || 0,
      },
      {
        id: 'myportfolio',
        offset: document.getElementById('myportfolio')?.offsetTop || 0,
      },
      {
        id: 'mycontact',
        offset: document.getElementById('mycontact')?.offsetTop || 0,
      },
    ];
  }

  handleIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.activeSection = entry.target.id;
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition === 0) {
      this.activeSection = 'start';
      return;
    }

    for (let i = this.sections.length - 1; i >= 0; i--) {
      if (scrollPosition >= this.sections[i].offset - 50) {
        // Adjust the offset as needed
        this.activeSection = this.sections[i].id;
        break;
      }
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
