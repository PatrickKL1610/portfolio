import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImprintComponent implements OnInit {
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];
  safeImprintHtml: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => {
      if (lang in translations) {
        this.currentLanguage = lang as TranslationKey;
        this.texts = translations[this.currentLanguage];
        this.updateImprintHtml();
      }
    });

    this.route.queryParams.subscribe((params) => {
      const lang = params['lang'];
      if (lang && lang in translations) {
        this.languageService.setLanguage(lang);
      }
    });
  }

  updateImprintHtml() {
    this.safeImprintHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.texts.IMPRINT_TEXT
    );
  }
}
