import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  imports: [ProjectComponent],
})
export class PortfolioComponent {}
