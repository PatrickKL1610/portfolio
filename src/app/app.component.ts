import { Component, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { StartComponent } from './start/start.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import AOS from 'aos';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    StartComponent,
    AboutmeComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'Partick Klein';
  isLandscapeOnMobile: boolean = false;

  constructor(private router: Router, private renderer: Renderer2) {
    AOS.init();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
    this.checkOrientation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkOrientation();
  }

  checkOrientation() {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobile =
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );
    this.isLandscapeOnMobile =
      isMobile && window.innerWidth > window.innerHeight;

    if (this.isLandscapeOnMobile) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
}
