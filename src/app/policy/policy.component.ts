import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PolicyComponent implements OnInit {
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

  get privacyPolicyHtml() {
    return this.texts.PRIVACY_POLICY;
  }
}
