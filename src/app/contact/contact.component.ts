import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

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

  togglePrivacy(event: Event) {
    // Verhindere, dass das Click-Event auf das Eltern-Element ausgedehnt wird, falls es vom Link stammt
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
    // Stelle sicher, dass das Click-Event des Links nicht von anderen Click-Events beeinflusst wird
    event.stopPropagation();
    this.router.navigate(['/policy']);
  }
}
