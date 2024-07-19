import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'legal', component: ImprintComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
