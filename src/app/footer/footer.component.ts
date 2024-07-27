import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
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
