import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { LanguageService } from '../language.service';
import { translations, TranslationKey } from '../translations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  http = inject(HttpClient);
  router = inject(Router);
  currentLanguage: TranslationKey = 'en';
  texts = translations[this.currentLanguage];
  buttonText: string = this.texts.SEND;

  arrowImageSrc: string = '../../assets/img/up-arrow.png';
  arrowDefaultSrc: string = '../../assets/img/up-arrow.png';
  arrowHoverSrc: string = '../../assets/img/up-arrow-hover.png';

  buttonChanged: boolean = false;

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe((lang) => {
      if (lang in translations) {
        this.currentLanguage = lang as TranslationKey;
        this.texts = translations[this.currentLanguage];
        this.buttonText = this.texts.SEND;
      }
    });
  }

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  };

  privacyTouched = false;
  isPrivacyHovered = false;

  mailTest = false;

  post = {
    endPoint: 'https://klein-patrick.ch/sendmail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(
          this.post.endPoint,
          this.post.body(this.contactData),
          this.post.options
        )
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.contactData.privacy = false;
            this.privacyTouched = false;
            this.changeButtonText();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }

  changeButtonText() {
    this.buttonText = this.texts.SENT;
    this.buttonChanged = true;
    setTimeout(() => {
      this.buttonText = this.texts.SEND;
      this.buttonChanged = false;
    }, 5000);
  }

  validateField(field: any) {
    if (field.invalid && field.touched) {
      field.control.markAsDirty();
    }
  }

  togglePrivacy(event: Event) {
    if (event.target instanceof HTMLAnchorElement) {
      return;
    }
    this.contactData.privacy = !this.contactData.privacy;
    this.privacyTouched = true;
  }

  onPrivacyHover(isHovered: boolean) {
    this.isPrivacyHovered = isHovered;
  }

  getCheckboxImage(): string {
    if (this.isPrivacyHovered) {
      return this.contactData.privacy
        ? '../../assets/img/checkbox_checked_hovered.png'
        : '../../assets/img/checkbox_unchecked_hovered.png';
    } else {
      return this.contactData.privacy
        ? '../../assets/img/checkbox_checked.png'
        : '../../assets/img/checkbox_unchecked.png';
    }
  }

  navigatePolicy(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/policy'], {
      queryParams: { lang: this.currentLanguage },
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onArrowHover(isHovered: boolean) {
    this.arrowImageSrc = isHovered ? this.arrowHoverSrc : this.arrowDefaultSrc;
  }
}
