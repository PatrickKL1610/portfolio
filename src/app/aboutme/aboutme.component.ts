import { Component } from '@angular/core';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent {
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

  switchLanguage(language: TranslationKey) {
    this.languageService.setLanguage(language);
  }
}
