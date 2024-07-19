import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
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
  @Input() testlink!: string;
  @Input() gitlink!: string;

  navigateTo(link: string) {
    window.open(link, '_blank');

    //window.location.href = link;
  }

  private imageElement!: ElementRef<HTMLImageElement>;
  private divElement!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.imageElement = this.el.nativeElement.querySelector(`#${this.idimage}`);
    this.divElement = this.el.nativeElement.querySelector(`#${this.idproject}`);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.imageElement, 'projectHover');
    this.renderer.removeClass(this.divElement, 'd-none');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.imageElement, 'projectHover');
    this.renderer.addClass(this.divElement, 'd-none');
  }
}
