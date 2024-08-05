import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  AfterViewInit,
  NgZone,
  AfterViewChecked,
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
export class NavbarComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  isBurgerMenuVisible = false;
  activeSection = 'start';
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];
  private currentUrl: string = '';
  private sections: { id: string; offset: number }[] = [];
  private offsetsCalculated = false;

  constructor(
    private el: ElementRef,
    private router: Router,
    private languageService: LanguageService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.isBurgerMenuVisible = false;
        document.body.classList.remove('no-scroll');
        this.updateActiveSection();
      }
    });
    this.languageService.language$.subscribe((lang) => {
      this.ngZone.run(() => {
        if (lang in translations) {
          this.currentLanguage = lang as TranslationKey;
          this.texts = translations[this.currentLanguage];
          this.cdRef.markForCheck();
        }
      });
    });
  }

  ngOnInit() {
    this.updateActiveSection();
  }

  ngAfterViewInit() {
    this.initializeSections();
    window.addEventListener('resize', this.initializeSections.bind(this));
  }

  ngAfterViewChecked() {
    if (!this.offsetsCalculated) {
      this.initializeSections();
    }
  }

  initializeSections() {
    setTimeout(() => {
      this.sections = [
        { id: 'start', offset: this.getElementOffset('start') },
        { id: 'aboutme', offset: this.getElementOffset('aboutme') },
        { id: 'myskills', offset: this.getElementOffset('myskills') },
        { id: 'myportfolio', offset: this.getElementOffset('myportfolio') },
        { id: 'mycontact', offset: this.getElementOffset('mycontact') },
      ];
      this.offsetsCalculated = true;
      this.updateActiveSection();
    }, 100);
  }

  getElementOffset(id: string): number {
    const element = document.getElementById(id);
    // Check for the element and ensure it is not null
    if (!element) {
      console.warn(`Element with ID '${id}' not found.`);
      return 0;
    }

    // Get the offsetTop of the element relative to the document
    const offset = element.getBoundingClientRect().top + window.scrollY;
    return offset;
  }

  toggleBurgerMenu(event: Event) {
    this.isBurgerMenuVisible = !this.isBurgerMenuVisible;
    if (this.isBurgerMenuVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    event.stopPropagation();
  }

  closeBurgerMenu(event: Event) {
    if (this.isBurgerMenuVisible) {
      this.isBurgerMenuVisible = false;
      document.body.classList.remove('no-scroll');
    }
    event.stopPropagation();
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.router.navigate(['/']).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          this.updateActiveSection();
        }, 600);
      }
    });
  }

  switchLanguage(event: any) {
    const selectedLanguage = event.target.value;
    this.languageService.setLanguage(selectedLanguage);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.requiresScrollCheck()) {
      this.updateActiveSection();
    }
  }

  updateActiveSection() {
    if (!this.requiresScrollCheck()) {
      this.activeSection = '';
      return;
    }

    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition === 0) {
      this.activeSection = 'start';
      return;
    }

    for (let i = this.sections.length - 1; i >= 0; i--) {
      if (scrollPosition >= this.sections[i].offset - 100) {
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
      document.body.classList.remove('no-scroll');
    }
  }

  requiresScrollCheck(): boolean {
    return this.currentUrl === '/' || this.currentUrl.startsWith('/#');
  }
}
