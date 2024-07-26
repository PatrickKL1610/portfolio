import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language = new BehaviorSubject<string>('en');
  language$ = this.language.asObservable();

  setLanguage(lang: string) {
    this.language.next(lang);
  }
}
