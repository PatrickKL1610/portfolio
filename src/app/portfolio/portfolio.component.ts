import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  imports: [ProjectComponent, RouterLink],
})
export class PortfolioComponent {}
