import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  imports: [ProjectComponent, RouterLink],
})
export class PortfolioComponent {
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
