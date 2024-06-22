import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  @Input() imagesrc!: string;
  @Input() projecttitle!: string;
  @Input() description!: string;
  @Input() tech!: string;
  @Input() idgit!: string;
  @Input() idtest!: string;
  @Input() idproject!: string;
  @Input() idbackground!: string;
  @Input() idimage!: string;
}
