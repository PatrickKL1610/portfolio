import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  };

  privacyTouched = false;
  isPrivacyHovered = false;

  mailTest = false; // Setze mailTest auf false, um POST-Anfrage zu aktivieren

  post = {
    endPoint: 'https://klein-patrick.ch/sendmail.php', //muss noch geändert werden
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
            this.contactData.privacy = false; // Reset privacy checkbox
            this.privacyTouched = false; // Reset privacyTouched
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }

  validateField(field: any) {
    if (field.invalid && field.touched) {
      field.control.markAsDirty();
    }
  }

  togglePrivacy() {
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
}
