import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';
import { FooterComponent } from '../footer/footer.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PolicyComponent implements OnInit {
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];
  safePrivacyPolicyHtml: SafeHtml = '';

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
        this.updatePrivacyPolicyHtml();
      }
    });

    this.route.queryParams.subscribe((params) => {
      const lang = params['lang'];
      if (lang && lang in translations) {
        this.languageService.setLanguage(lang);
      }
    });
  }

  updatePrivacyPolicyHtml() {
    this.safePrivacyPolicyHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.texts.PRIVACY_POLICY
    );
  }
}
