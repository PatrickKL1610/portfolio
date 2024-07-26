import { Component } from '@angular/core';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((lang) => {
      if (lang in translations) {
        this.currentLanguage = lang as TranslationKey;
        this.texts = translations[this.currentLanguage];
      }
    });
  }
}
