import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ImprintComponent implements OnInit {
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const lang = params['lang'];
      if (lang && lang in translations) {
        this.currentLanguage = lang as TranslationKey;
        this.texts = translations[this.currentLanguage];
      } else {
        this.languageService.language$.subscribe((lang) => {
          if (lang in translations) {
            this.currentLanguage = lang as TranslationKey;
            this.texts = translations[this.currentLanguage];
          }
        });
      }
    });
  }

  get imprintHtml() {
    return this.texts.IMPRINT_TEXT;
  }
}
